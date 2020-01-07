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
      <div id="output" />
      <h2>
        アカウント登録
        <font-awesome-icon icon="address-card" />
      </h2>
      <br />
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-container fluid>
          <b-row>
            <b-col lg="2">
              <label for="textarea-auto-height">メールアドレス:</label>
            </b-col>
            <b-col lg="10">
              <b-form-group id="input-group-1" label-for="input-1" description>
                <b-form-input
                  id="input-1"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="例：test_taro@gmail.com"
                  :state="emailState"
                  aria-describedby="input-live-help-email"
                ></b-form-input>
                <!-- This will only be shown if the preceding input has an invalid state -->
                <b-form-invalid-feedback id="input-live-feedback-email">Enter your email</b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="2">
              <label for="textarea-auto-height">パスワード:</label>
            </b-col>
            <b-col lg="10">
              <b-form-group id="input-group-2" label-for="input-2">
                <b-form-input
                  id="input-2"
                  v-model="form.password"
                  :state="passwordState"
                  aria-describedby="input-live-help-password"
                  required
                  type="password"
                ></b-form-input>
                <!-- This is a form text block (formerly known as help block) -->
                <b-form-text id="input-live-help-password">８文字以上16文字以下で入力ください。</b-form-text>
                <b-form-text id="input-live-help-password">英数字を含める必要があります。</b-form-text>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="button-group1">
            <b-col>
              <b-button
                :disabled="!activateSubmit"
                type="submit"
                pill
                block
                variant="outline-primary"
                v-b-modal.my-modal
              >登録</b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-form>
      <!-- The modal -->
      <b-modal ref="regist-modal" centered hide-footer>
        <div class="d-block text-center">
          <h4>
            アカウントを登録します。
            <br />よろしいですか？
          </h4>
        </div>
        <b-button pill class="mt-3" variant="outline-primary" block @click="registAcount">OK</b-button>
      </b-modal>
      <!-- 登録成功 -->
      <b-modal ref="success-modal" centered hide-footer>
        <div class="d-block text-center">
          <h4>
            登録しました。
            <br />TOPページに遷移します。
            <br />登録アカウントでログインお願いします。
          </h4>
        </div>
        <b-button pill class="mt-3" variant="outline-primary" block @click="moveTop">OK</b-button>
      </b-modal>
      <!-- 登録失敗 -->
      <b-modal ref="failed-modal" centered hide-footer>
        <div class="d-block text-center">
          <h4>{{ emessage }}</h4>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  computed: {
    emailState() {
      return this.form.email.length > 5 && this.form.email.includes("@")
        ? true
        : false;
    },
    passwordState() {
      //正規表現パターン（8文字以上の半角英数字）
      let regex = new RegExp(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,16}$/i);
      return regex.test(this.form.password) ? true : false;
    },
    activateSubmit() {
      if (
        this.form.email &&
        this.form.password &&
        this.emailState &&
        this.passwordState
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      show: true,
      errored: false,
      registAcountUrl: process.env.VUE_APP_REGIST_ACCOUNT,
      emessage: ""
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs["regist-modal"].show();
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.password = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    registAcount() {
      this.$refs["regist-modal"].hide();
      // メール情報を登録する
      const AcsUrl = `${this.registAcountUrl}`;
      const params = new URLSearchParams();
      params.append("email", this.form.email);
      params.append("password", this.form.password);
      // アカウントの登録を行う
      axios
        .post(AcsUrl, params)
        .then(response => {
          this.regist = response.data;
          if (this.regist.Result === 1 && this.regist.Responce === 200) {
            this.errored = false;
            this.$refs["success-modal"].show();
          } else if (this.regist.Result === 0 && this.regist.Responce === 200) {
            this.emessage = "既にアカウントが登録されています。";
            this.$refs["failed-modal"].show();
          } else {
            this.emessage = "登録に失敗しました。";
            this.$refs["failed-modal"].show();
          }
        })
        .catch(error => {
          this.errored = true;
          console.error(error);
          this.emessage = "登録に失敗しました。";
          this.$refs["failed-modal"].show();
        })
        .finally(() => {
          return;
        });
      return;
    },
    moveTop() {
      this.$router.push("/");
    }
  }
};
</script>
<style lang="scss">
//メールフォーム用のscss読込
@import "@/static/scss/createaccount.scss";
@import "@/static/scss/common.scss";
</style>
