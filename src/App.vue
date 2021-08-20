<template v-if="user.loggedIn">
  <div class="navbar navbar-dark bg-primary">
    <a class="navbar-brand" href="#">Vue Firebase Blog</a>
    <ul class="nav">
      <li class="nav-item">
        <router-link class="nav-link text-white" to="/">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link text-white" to="/dashboard"
          >Dashboard</router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="nav-link text-white" to="/login">Login</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link text-white" to="/signup"
          >Sign Up</router-link
        >
      </li>
    </ul>
  </div>
  <div class="container py-4">
    <router-view />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
    }),
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "home",
          });
        });
    },
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>