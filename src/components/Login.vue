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
        <br />test1/test1でログインできます。
        <br />
        <span class="text-danger">「CardRegist」と「Contact」はログインが必要です</span>
        <form @submit.prevent="onSubmit">
          <input v-model="username" type="text" placeholder="e-mail" />
          <input v-model="password" type="password" placeholder="password" />
          <b-row class="button-group1">
            <b-col>
              <b-button
                block
                pill
                variant="outline-pink"
                class="btn btn-block login"
                @click="onTransition()"
              >CreateNewAccount</b-button>
            </b-col>
            <b-col>
              <b-button
                block
                pill
                variant="outline-primary"
                class="btn btn-block login"
                type="submit"
                :disabled="!activateSubmit"
              >Login</b-button>
            </b-col>
          </b-row>
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
  computed: {
    activateSubmit() {
      if (this.username && this.password) {
        return true;
      } else {
        return false;
      }
    }
  },
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
    onTransition() {
      this.$router.push("/createacount");
    },
    onSubmit() {
      let nextpage = this.$route.query.redirect;
      const AcsUrl = `${this.BaseUrl}`;
      const params = new URLSearchParams();
      params.append("username", this.username);
      params.append("password", this.password);

      axios
        .post(AcsUrl, params)
        .then(response => {
          this.users = response.data;
          if (this.users.Result === 1 && this.users.Responce === 200) {
            this.$store.dispatch("changeLogin");
            this.anmatched = false;
            this.errored = false;
            this.$router.push(nextpage);
          } else {
            this.$store.dispatch("changeLogoff");
            this.anmatched = true;
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
@import "@/static/scss/common.scss";
</style>
