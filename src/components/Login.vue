<template>
  <div class="container">
    <div class="login-container">
      <section v-if="errored">
        <p>
          <span class="text-danger">
            We're sorry, we're not able to retrieve this information at the
            moment, please try back later
          </span>
        </p>
      </section>
      <section v-if="anmatched">
        <p>
          <span class="text-warning">User ID and password do not match</span>
        </p>
      </section>
      <div id="output" />ログイン画面
      <div class="avatar" />
      <div class="form-box">
        テスト用のため、test1/test1でログイン可能
        <form @submit.prevent="onSubmit">
          <input v-model="username" type="text" placeholder="username" />
          <input v-model="password" type="password" placeholder="password" />
          <button class="btn btn-info btn-block login" type="submit">Login</button>
        </form>
      </div>
    </div>
  </div>
  <!------ Include the above in your HEAD tag ---------->
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
// store
import Store from "@/store/index";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      BaseUrl: process.env.VUE_APP_LOGIN_JSON_URL,
      username: "",
      password: "",
      users: [],
      errored: false,
      anmatched: false
    };
  },
  /** ライフサイクルフック */
  created() {
    // DOM操作が伴わない場合
  },
  mounted() {
    // DOM操作が伴う場合
  },
  methods: {
    onSubmit() {
      const AcsUrl = `${this.BaseUrl}?` + `username=${this.username}`;
      //      console.log("_login");
      axios
        .get(AcsUrl)
        .then(response => {
          this.users = response.data;
          if (this.users.length === 0) {
            Store.logout();
            this.anmatched = true;
          } else {
            this.users.find(i_user => {
              if (
                i_user.username === this.username &&
                i_user.password === this.password
              ) {
                Store.login();
                this.anmatched = false;
                this.errored = false;
                this.$router.push({ name: "main" });
              } else {
                Store.logout();
                this.anmatched = true;
              }
              return;
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => {});
      return;
    }
  }
};
</script>

<style lang="scss">
// ログイン用のscss読込
@import "@/static/scss/login.scss";
</style>
