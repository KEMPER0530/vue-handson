<template>
  <div class="container">
    <div class="login-container">
      <section v-if="errored">
        <p>
          <span class="text-danger">{{ this.emessage }}</span>
        </p>
      </section>
      <div id="output" />
      <h2>
        <span class="mgr-3">
          <font-awesome-icon icon="address-card" />
        </span>アカウント登録
      </h2>
      <br />
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-container fluid>
          <b-row>
            <b-col lg="12">
              <b-form-group id="input-group-0" label-for="input-0" description>
                <b-input-group prepend="氏名">
                  <b-form-input
                    id="input-0"
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="テスト　太郎"
                    :state="nameState"
                    aria-describedby="input-live-help-email"
                    class="form-create-account"
                  ></b-form-input>
                </b-input-group>
                <!-- This will only be shown if the preceding input has an invalid state -->
                <b-form-invalid-feedback id="input-live-feedback-name">Enter your name</b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="12">
              <b-form-group id="input-group-1" label-for="input-1" description>
                <b-input-group prepend="📧">
                  <b-form-input
                    id="input-1"
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="test_taro@gmail.com"
                    :state="emailState"
                    aria-describedby="input-live-help-email"
                    class="form-create-account"
                  ></b-form-input>
                </b-input-group>
                <!-- This will only be shown if the preceding input has an invalid state -->
                <b-form-invalid-feedback id="input-live-feedback-email">Enter your email</b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="12">
              <b-form-group id="input-group-2" label-for="input-2">
                <b-input-group prepend="🔑">
                  <b-form-input
                    id="input-2"
                    v-model="form.password"
                    :state="passwordState"
                    aria-describedby="input-live-help-password"
                    required
                    :type="inputType"
                    class="form-create-account"
                  ></b-form-input>
                </b-input-group>
                <b-form-checkbox v-model="passStatus">パスワードを表示する</b-form-checkbox>
                <!-- This is a form text block (formerly known as help block) -->
                <b-form-text id="input-live-help-password">８文字以上16文字以下で入力ください。</b-form-text>
                <b-form-text id="input-live-help-password">英数字を含める必要があります。</b-form-text>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
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
      <!-- Regist modal -->
      <b-modal ref="regist-modal" centered hide-footer>
        <div class="d-block text-center">
          <h4>
            アカウントを登録します。
            <br />パスワードを再度入力してください。
            <br />
          </h4>
          <b-input-group size="lg" prepend="🔑">
            <b-form-input
              id="input-live"
              :state="activateSubmit2"
              v-model="repassword"
              :type="inputType"
              class="form-create-account"
            ></b-form-input>
          </b-input-group>
          <b-form-checkbox v-model="passStatus">パスワードを表示する</b-form-checkbox>
        </div>
        <b-row>
          <b-col>
            <b-button pill class="mt-3" variant="outline-danger" block @click="cancelAcount">Cancel</b-button>
          </b-col>
          <b-col>
            <b-button
              :disabled="!activateSubmit2"
              pill
              class="mt-3"
              variant="outline-primary"
              block
              @click="registAcount"
            >OK</b-button>
          </b-col>
        </b-row>
      </b-modal>
      <!-- 登録成功 -->
      <b-modal ref="success-modal" centered hide-footer>
        <div class="d-block text-center">
          <h4>
            {{ this.form.name }}様
            <br />アカウントを仮登録いたしました。
            <br />送信したメールより本登録をお願いいたします。
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
import constMixin from "@/mixins/ConstMixin";
import firebase from "firebase";

export default {
  mixins: [constMixin],
  computed: {
    nameState() {
      return this.form.name.length > this.zero ? true : false;
    },
    emailState() {
      return this.form.email.length > this.five && this.form.email.includes("@")
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
        this.form.name &&
        this.form.email &&
        this.form.password &&
        this.emailState &&
        this.passwordState
      ) {
        return true;
      } else {
        return false;
      }
    },
    activateSubmit2() {
      if (this.form.password === this.repassword) {
        return true;
      } else {
        return false;
      }
    },
    inputType() {
      return this.passStatus ? "text" : "password";
    }
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
        name: ""
      },
      show: true,
      errored: false,
      registAcountUrl: process.env.VUE_APP_REGIST_ACCOUNT,
      mailUrl: process.env.VUE_APP_REGIST_ACCOUNT_MAIL,
      getMailAdrUrl: process.env.VUE_APP_GET_MAIL_ADR,
      from_email: process.env.VUE_APP_FROM_EMAIL,
      personal_name: process.env.VUE_APP_PERSONAL_NAME,
      emessage: this.errorMsg,
      repassword: "",
      passStatus: false
    };
  },
  methods: {
    onSubmit(evt) {
      this.repassword = "";
      evt.preventDefault();
      this.$refs["regist-modal"].show();
      this.passStatus = false;
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.password = "";
      this.form.name = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    registAcount() {
      this.$refs["regist-modal"].hide();
      this.getJwtIdToken();
      // メール情報を登録する
      const AcsUrl = `${this.registAcountUrl}`;
      const params = new URLSearchParams();
      params.append("email", this.form.email);
      params.append("password", this.form.password);
      params.append("name", this.form.name);
      // アカウントの登録を行う
      axios
        .post(AcsUrl, params, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`
          }
        })
        .then(response => {
          this.regist = response.data;
          if (
            this.regist.Result === this.one &&
            this.regist.Responce === this.http_ok
          ) {
            this.errored = false;
            // アカウント作成のサンキューメール送信
            this.registAccountMail();
          } else if (
            this.regist.Result === this.zero &&
            this.regist.Responce === this.http_ok
          ) {
            this.emessage = "既にアカウントが登録されています。";
            this.$refs["failed-modal"].show();
          } else {
            this.emessage = "アカウントの登録に失敗しました。";
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
          this.$store.dispatch("changeSmsLogoff");
          return;
        });
      return;
    },
    registAccountMail() {
      // 登録されたアカウントにメールを送付する
      // メール情報を登録する
      const MailUrl = `${this.mailUrl}`;
      const paramsMail = new URLSearchParams();
      paramsMail.append("to_email", this.form.email);
      paramsMail.append("from_email", this.from_email);
      paramsMail.append("personal_name", this.personal_name);
      paramsMail.append("name", this.form.name);
      // メールの送信を行う
      axios
        .post(MailUrl, paramsMail, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`
          }
        })
        .then(response => {
          this.regist = response.data;
          if (
            this.regist.Result === this.one &&
            this.regist.Responce === this.http_ok
          ) {
            this.errored = false;
            this.$refs["success-modal"].show();
          } else {
            this.emessage = "送信に失敗しました";
            this.$refs["failed-modal"].show();
          }
        })
        .catch(error => {
          this.errored = true;
          console.error(error);
          this.emessage = "送信に失敗しました";
          this.$refs["failed-modal"].show();
        })
        .finally(() => {
          return;
        });
      return;
    },
    cancelAcount() {
      this.passStatus = false;
      this.$refs["regist-modal"].hide();
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
