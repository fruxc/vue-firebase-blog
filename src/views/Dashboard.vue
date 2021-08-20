<template>
  <div class="row">
    <div class="col-12">
      <h1>Dashboard</h1>
    </div>
    <div id="logout" class="col-sm-8 m-auto">
      <button type="button" class="btn btn-primary btn-lg" v-on:click="logout">
        Logout
      </button>
    </div>
  </div>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <div v-if="user" class="alert alert-success" role="alert">
              You are logged in!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
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
};
</script>