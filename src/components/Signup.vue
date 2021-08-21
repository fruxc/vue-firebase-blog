<template>
  <div class="row">
    <div class="col-12 text-center mb-4">
      <h1>Sign Up</h1>
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
      <form @submit.prevent="signupRequest" id="signup-form">
        <div class="row text-left">
          <div class="col-sm-8 form-group m-auto mt-3">
            <label for="name">Name</label>
            <input
              type="text"
              id="name"
              v-model="name"
              class="form-control form-control-lg"
            />
          </div>
          <div class="col-sm-8 form-group m-auto mt-3">
            <label for="email">Email Address</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="form-control form-control-lg"
            />
          </div>
          <div class="col-sm-8 form-group m-auto mt-3">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="form-control form-control-lg"
            />
          </div>
          <div class="col-sm-6 m-auto text-center form-group mt-3">
            <button
              v-bind:disabled="xhrRequest"
              v-bind:class="{ disabled: xhrRequest }"
              class="btn btn-lg btn-primary px-4"
            >
              <span v-if="!xhrRequest">Sign Up</span>
              <span v-if="xhrRequest">Please Wait...</span>
            </button>
            <div
              v-if="xhrRequest"
              class="spinner-border text-secondary _loader"
              role="status"
            >
              <span class="sr-only"></span>
            </div>
          </div>
          <div class="col-sm-12 text-center form-group mt-5">
            <p>
              Already have an account?
              <router-link to="/login">Login</router-link>
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
  name: "Signup",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      xhrRequest: false,
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    ...mapActions(["signUpAction"]),
    signupRequest() {
      let v = this;
      v.errorMessage = "";
      v.successMessage = "";
      if (v.email != "" && v.password != "" && v.name != "") {
        v.xhrRequest = true;
        this.signUpAction({ email: this.email, password: this.password })
          .then(() => {
            v.successMessage = "Register Successfully.";
            v.xhrRequest = false;
          })
          .catch((err) => {
            let errorResponse = JSON.parse(err.message);
            v.errorMessage = errorResponse.error.message;
            v.xhrRequest = false;
          });
      } else {
        v.errorMessage = "Enter email address, name and password correctly!";
      }
    },
  },
};
</script>
<style scoped>
._loader {
  position: relative;
  top: 6px;
  left: 10px;
}
</style>