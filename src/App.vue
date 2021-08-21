<template>
  <v-app>
    <v-main>
      <div class="navbar navbar-dark bg-primary">
        <a class="navbar-brand" href="#">Vue Firebase Blog</a>
        <ul class="nav">
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/dashboard"
              >Dashboard</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/login"
              >Login</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/signup"
              >Sign Up</router-link
            >
          </li>
        </ul>
      </div>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",

  computed: {
    ...mapGetters(["getUser", "isUserAuth"]),
  },

  data: () => ({
    //
  }),
};
</script>
