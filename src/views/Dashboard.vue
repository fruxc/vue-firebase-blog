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
        alert('Successfully logged out');
        this.$router.push('/');
      })
      .catch(error => {
        alert(error.message);
        this.$router.push('/');
      });
  },
},
};
</script>