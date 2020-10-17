<template>
  <div class="container">
    <div class="login-container">
      <section v-if="errored">
        <p>
          <span class="text-danger">{{ errorMsg }}</span>
        </p>
      </section>
      <section v-if="anmatched">
        <p>
          <span class="text-warning">User ID and password do not match</span>
        </p>
      </section>
      <div id="output" />
      <h2>
        <span class="mgr-3"> <font-awesome-icon icon="door-closed" /> </span
        >ログイン
      </h2>
      <div class="avatar" />
      <div class="form-box">
        <span class="text-danger"
          >「CardRegist」と「Contact」はログインが必要です</span
        >
        <form @submit.prevent="onSubmit">
          <input v-model="username" type="text" placeholder="e-mail" />
          <input v-model="password" type="password" placeholder="password" />
          <b-row class="button-group1">
            <b-col md="6">
              <b-button
                block
                pill
                variant="outline-pink"
                class="btn btn-block login"
                @click="onSignUp()"
                >新規登録</b-button
              >
            </b-col>
            <b-col md="6">
              <b-button
                block
                pill
                variant="outline-primary"
                class="btn btn-block login"
                type="submit"
                :disabled="!activateSubmit"
                >ログイン</b-button
              >
            </b-col>
          </b-row>
          <!-- <b-row class="button-group1">
            <b-col cols="12">
              <b-button
                block
                pill
                variant="outline-success"
                class="btn btn-block login"
                @click="onGuestLogin()"
                >お試しログイン</b-button
              >
            </b-col>
          </b-row> -->
        </form>
      </div>
    </div>
  </div>
  <!------ Include the above in your HEAD tag ---------->
</template>
<script>
import axios from "axios";
import store from "@/store";
import constMixin from "@/mixins/ConstMixin";

export default {
  name: "Login",
  mixins: [constMixin],
  data() {
    return {
      BaseUrl: process.env.VUE_APP_LOGIN_JSON_URL,
      username: "",
      password: "",
      users: [],
      errored: false,
      anmatched: false,
      name: "",
      result: false
    };
  },
  computed: {
    activateSubmit() {
      if (this.username && this.password) {
        return true;
      }
      return false;
    }
  },
  watch: {
    result() {
      if (this.result) {
        this.setAccessLog(this.$store.getters.getLogin_name, this.event_1);
      }
    }
  },
  /** ライフサイクルフック */
  created() {
    // DOM操作が伴わない場合
  },
  mounted() {
    // DOM操作が伴う場合
  },
  methods: {
    onSignUp() {
      this.$router.push("/signup").catch(() => {});
    },
    onGuestLogin() {
      this.onSubmit(
        null,
        process.env.VUE_APP_GUESTUSER,
        process.env.VUE_APP_GUESTPASS
      );
    },
    // 引数１にはsubmitイベントが格納される
    onSubmit(event = null, user = null, pass = null) {
      const nextpage = this.$route.query.redirect;
      const AcsUrl = `${this.BaseUrl}`;
      const params = new URLSearchParams();
      if (user === null && pass === null) {
        params.append("username", this.username);
        params.append("password", this.password);
      } else {
        params.append("username", user);
        params.append("password", pass);
        this.$store.dispatch("changeSmsLogin");
      }

      this.getJwtIdToken();

      axios
        .post(AcsUrl, params, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`
          }
        })
        .then(response => {
          this.users = response.data;
          if (
            this.users.Result === this.one &&
            this.users.Responce === this.http_ok
          ) {
            this.anmatched = false;
            this.errored = false;
            this.$store.dispatch("changeLogin");
            this.$store.dispatch("changeSmsLogin");
            this.$store.dispatch("putLogin_name", this.users.Name);
            this.$store.dispatch("putLogin_id", this.users.Id);
            this.result = true;
            this.$router.push(nextpage).catch(() => {});
          } else {
            this.$store.dispatch("changeLogoff");
            this.$store.dispatch("changeSmsLogoff");
            this.anmatched = true;
          }
        })
        .catch(error => {
          this.errored = true;
          console.error(error);
          this.$store.dispatch("changeLogoff");
          this.$store.dispatch("changeSmsLogoff");
        })
        .finally(() => {});
    }
  }
};
</script>

<style lang="scss">
// ログイン用のscss読込
@import "@/static/scss/login.scss";
@import "@/static/scss/common.scss";
</style>
