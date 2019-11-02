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
        テスト用のため
        <br />test1/test1でログイン可能です
        <br />
        <span class="text-danger">
          ログイン後にSAMPLEに遷移します。
          <br />
        </span>
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
import store from "@/store";

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
      axios
        .get(AcsUrl)
        .then(response => {
          this.users = response.data;
          if (this.users.length === 0) {
            this.$store.dispatch("changeLogoff");
            this.anmatched = true;
          } else {
            this.users.find(i_user => {
              if (
                i_user.username === this.username &&
                i_user.password === this.password
              ) {
                this.$store.dispatch("changeLogin");
                this.anmatched = false;
                this.errored = false;
                this.$router.push({ name: "counter" });
              } else {
                this.$store.dispatch("changeLogoff");
                this.anmatched = true;
              }
            });
          }
        })
        .catch(error => {
          this.errored = true;
          console.error(error);
        })
        .finally(() => {
          return;
        });
      return;
    }
  }
};
</script>

<style lang="scss">
// ログイン用のscss読込
@import "@/static/scss/login.scss";
</style>
