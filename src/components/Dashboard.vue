<template>
  <div class="row">
    <div class="col-12 text-center">
      <h1>Dashboard</h1>
    </div>
    <div class="d-flex flex-row bd-highlight justify-content-around">
      <button type="button" class="btn btn-primary btn-lg" v-on:click="myBlogs">
        Show My Blogs
      </button>
      <button
        type="button"
        class="btn btn-primary btn-lg"
        v-on:click="showAllBlogs"
      >
        Show All Blogs
      </button>
      <button type="button" class="btn btn-primary btn-lg" v-on:click="logout">
        Logout
      </button>
    </div>
  </div>
  <v-container>
    <v-layout row>
      <v-flex class="text-center font-weight-black">
        <h2>Create a Blog</h2>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex md6 offset-sm3>
        <div>
          <div>
            <v-btn @click="click1">choose photo</v-btn>
            <input
              type="file"
              ref="input1"
              style="display: none"
              @change="previewImage"
              accept="image/*"
            />
          </div>

          <div v-if="imageData != null">
            <img class="preview" height="268" width="356" :src="img1" />
            <br />
          </div>
        </div>
      </v-flex>
    </v-layout>

    <v-layout row mt-3>
      <v-flex md6 offset-sm3 class="text-center">
        <input
          type="text"
          id="title"
          v-model="title"
          class="form-control form-control-lg"
          placeholder="Title goes here"
          label="Title goes here"
        />
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex class="text-center">
        <v-btn color="pink" @click="create">upload</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
  <v-container fluid ma-0 pa-0>
    <v-row align="stretch" class="ma-2">
      <v-col md="4" class="pa-3" v-for="blog in blogs" :key="blog.title">
        <v-card>
          <v-img :src="blog.image" height="300px" width="300px"></v-img>
          <v-divider></v-divider>
          <v-card-title style="overflow-y: auto; height: 100px"
            >{{ blog.title }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
  data() {
    return {
      blogs: [],
      title: "",
      img1: "",
      imageData: null,
    };
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
    async showAllBlogs() {
      firebase.database().ref("/blog").on("value", this.onDataChange);
    },
    async myBlogs() {
      firebase
        .database()
        .ref("/blog")
        .orderByChild("email")
        .equalTo(firebase.auth().currentUser.email)
        .on("value", this.onDataChange);
    },
    async onDataChange(items) {
      let _blogs = [];
      items.forEach((item) => {
        let data = item.val();
        _blogs.push({
          title: data.title,
          image: data.photo,
          email: data.email,
        });
      });

      this.blogs = _blogs;
      console.log(this.blogs);
    },
    create() {
      const blog = {
        photo: this.img1,
        title: this.title,
        email: firebase.auth().currentUser.email,
      };
      firebase
        .database()
        .ref("/blog")
        .push(blog)
        .then((response) => {
          console.log(response);
          console.log("Blog created successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    click1() {
      this.$refs.input1.click();
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.img1 = null;
      this.imageData = event.target.files[0];
      this.onUpload();
    },
    onUpload() {
      this.img1 = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.img1 = url;
            console.log(this.img1);
          });
        }
      );
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("Successfully logged out");
          this.$router.push("/");
        })
        .catch((error) => {
          alert(error.message);
          this.$router.push("/");
        });
    },
  },
  mounted() {
    firebase.database().ref("/blog").on("value", this.onDataChange);
  },
  beforeUnmounted() {
    firebase.database().ref("/blog").off("value", this.onDataChange);
  },
};
</script>