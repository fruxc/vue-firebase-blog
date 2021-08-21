<template>
  <div class="row">
    <div class="col-12 text-center mb-4">
      <h1>Log In</h1>
    </div>
    <div class="col-sm-5 m-auto">
      <div v-if="errorMessage !== ''" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
      <div
        v-if="successMessage !== ''"
        class="alert alert-success"
        role="alert"
      >
        {{ successMessage }}
      </div>
      <form @submit.prevent="loginRequest" id="login-form">
        <div class="row text-left">
          <div class="col-sm-8 form-group m-auto mt-3">
            <label for="email">Email Address</label>
            <input
              type="email"
              v-model="email"
              id="email"
              class="form-control form-control-lg"
            />
          </div>
          <div class="col-sm-8 form-group m-auto mt-3">
            <label for="password">Password</label>
            <input
              type="password"
              v-model="password"
              id="password"
              class="form-control form-control-lg"
            />
          </div>
          <div class="col-sm-8 form-group m-auto text-center mt-3">
            <button
              v-bind:disabled="xhrRequest"
              v-bind:class="{ disabled: xhrRequest }"
              class="btn btn-lg btn-primary px-4"
            >
              <span v-if="!xhrRequest">Login</span>
              <span v-if="xhrRequest">Please Wait...</span>
            </button>
            <div
              v-if="xhrRequest"
              class="spinner-border text-secondary loader"
              role="status"
            >
              <span class="sr-only"></span>
            </div>
          </div>
          <div class="col-sm-8 form-group m-auto text-center mt-3">
            <button
              v-bind:disabled="xhrRequestr"
              v-bind:class="{ disabled: xhrRequestr }"
              @click="signInWithGoogle"
              class="btn btn-lg btn-primary px-4"
            >
              <span v-if="!xhrRequestr">Sign In with Google</span>
              <span v-if="xhrRequestr">Please Wait...</span>
            </button>
            <div
              v-if="xhrRequestr"
              class="spinner-border text-secondary loader"
              role="status"
            >
              <span class="sr-only"></span>
            </div>
          </div>
          <div class="col-sm-12 text-center form-group mt-5">
            <p>
              Don't have an account?
              <router-link to="/signup">Sign Up</router-link>
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      xhrRequestr: false,
      xhrRequest: false,
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    ...mapActions(["signInAction"]),
    ...mapActions(["signInWithPopUp"]),
    loginRequest() {
      let v = this;
      v.xhrRequest = true;
      v.errorMessage = "";
      v.successMessage = "";

      this.signInAction({ email: v.email, password: v.password }).then(
        () => {
          this.$router.replace("dashboard");
          v.xhrRequest = false;
        },
        (error) => {
          v.errorMessage = error.message;
          v.xhrRequest = false;
        }
      );
    },
    signInWithGoogle() {
      let v = this;
      v.xhrRequestr = true;
      v.errorMessage = "";
      v.successMessage = "";
      this.signInWithPopUp().then(
        () => {
          this.$router.replace("dashboard");
          v.xhrRequestr = false;
        },
        (error) => {
          v.errorMessage = error.message;
          v.xhrRequestr = false;
        }
      );
    },
  },
};
</script>
<style scoped>
.loader {
  position: relative;
  top: 6px;
  left: 10px;
}
</style>