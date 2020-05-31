<template>
  <div class="container">
    <section v-if="errored">
      <p>
        <span class="text-danger">{{ errorMsg }}</span>
      </p>
    </section>
    <div id="output" />
    <h2>
      <span class="mgr-3">
        <font-awesome-icon icon="envelope" />
      </span>
      お問合せ
    </h2>
    <br />
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-container fluid>
        <b-row>
          <b-col lg="12">
            <b-form-group id="input-group-2" label-for="input-2" label="氏名" label-align="left">
              <b-input-group>
                <b-form-input
                  id="input-2"
                  v-model="form.name"
                  :state="nameState"
                  aria-describedby="input-live-help-name input-live-feedback-name"
                  required
                  placeholder="テスト　太郎"
                ></b-form-input>
                <!-- This will only be shown if the preceding input has an invalid state -->
                <b-form-invalid-feedback id="input-live-feedback-name">Enter your name</b-form-invalid-feedback>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="12">
            <b-form-group id="input-group-1" label-for="input-1" label="メールアドレス" label-align="left" description>
              <b-input-group>
                <b-form-input
                  id="input-1"
                  v-model="form.to_email"
                  type="email"
                  required
                  placeholder="test_taro@gmail.com"
                  :state="emailState"
                  aria-describedby="input-live-help-email input-live-feedback-email"
                ></b-form-input>
                <!-- This will only be shown if the preceding input has an invalid state -->
                <b-form-invalid-feedback id="input-live-feedback-email">Enter your email</b-form-invalid-feedback>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="12">
            <b-form-group id="input-group-3" label-for="input-3" label="お問合せ内容" label-align="left">
              <b-form-textarea
                id="input-3"
                v-model="form.text"
                placeholder="お問合せ内容をご入力ください・・・・"
                rows="4"
                :state="textState"
                aria-describedby="input-live-feedback-text"
              ></b-form-textarea>
              <!-- This will only be shown if the preceding input has an invalid state -->
              <b-form-invalid-feedback id="input-live-feedback-name">Please enter your inquiry</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="button-group1">
          <b-col>
            <b-button type="reset" pill block variant="outline-danger">クリア</b-button>
          </b-col>
          <b-col>
            <b-button
              :disabled="!activateSubmit"
              type="submit"
              pill
              block
              variant="outline-primary"
              v-b-modal.my-modal
            >送信</b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-form>
    <!-- <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
    </b-card>-->
    <!-- The modal -->
    <b-modal ref="regist-modal" centered hide-footer>
      <div class="d-block text-center">
        <h4>
          お問い合わせ内容を送信します。
          <br />よろしいですか？
        </h4>
      </div>
      <b-button pill class="mt-3" variant="outline-primary" block @click="sendMail">OK</b-button>
    </b-modal>
    <!-- 登録成功 -->
    <b-modal ref="success-modal" centered hide-footer>
      <div class="d-block text-center">
        <h4>
          送信しました。
          <br />TOPページへ遷移します。
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
</template>

<script>
import axios from "axios";
import constMixin from "@/mixins/ConstMixin";

export default {
  mixins: [constMixin],
  mounted() {
    this.getJwtIdToken();
    // メール情報を登録する
    const getMailAdrUrl = `${this.mailAdrInf}`;
    const paramsMailAdr = new URLSearchParams();
    paramsMailAdr.append("id", this.$store.getters.getLogin_id);
    // メールアドレス、氏名の取得を行う
    axios
      .post(getMailAdrUrl, paramsMailAdr, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("jwt")}` }
      })
      .then(response => {
        this.data = response.data;
        if (
          this.data.Result === this.one &&
          this.data.Responce === this.http_ok
        ) {
          this.errored = false;
          this.form.to_email = this.data.Email;
          this.form.name = this.data.Name;
        } else {
          this.errored = true;
        }
      })
      .catch(error => {})
      .finally(() => {});
    return;
  },
  computed: {
    emailState() {
      return this.form.to_email.length > this.five &&
        this.form.to_email.includes("@")
        ? true
        : false;
    },
    nameState() {
      return this.form.name.length > this.zero ? true : false;
    },
    textState() {
      return this.form.text.length > this.zero ? true : false;
    },
    activateSubmit() {
      if (
        this.form.to_email &&
        this.form.name &&
        this.form.text &&
        this.emailState &&
        this.nameState &&
        this.textState
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
        to_email: "",
        name: "",
        text: "",
        from_email: process.env.VUE_APP_FROM_EMAIL,
        personal_name: process.env.VUE_APP_PERSONAL_NAME
      },
      show: true,
      errored: false,
      mailUrl: process.env.VUE_APP_SEND_MAIL,
      mailAdrInf: process.env.VUE_APP_GET_MAIL_ADR,
      emessage: "",
      result: false,
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs["regist-modal"].show();
      // alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.to_email = "";
      this.form.name = "";
      this.form.text = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    sendMail() {
      this.$refs["regist-modal"].hide();
      this.result = false;
      // メール情報を登録する
      const AcsUrl = `${this.mailUrl}`;
      const params = new URLSearchParams();
      params.append("to_email", this.form.to_email);
      params.append("name", this.form.name);
      params.append(
        "text",
        "【登録されたアドレス】:" +
          this.form.to_email +
          "\n" +
          "【氏名】:" +
          this.form.name +
          "\n" +
          "【内容】:" +
          "\n" +
          this.form.text
      );
      params.append("from_email", this.form.from_email);
      params.append("personal_name", this.form.personal_name);
      // メールの送信を行う
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
            this.$refs["success-modal"].show();
            this.result = true;
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
    moveTop() {
      this.$router.push("/");
    }
  },
  watch: {
    result: function(val,oldVal){
      if ( this.result ){
        this.setAccessLog(this.$store.getters.getLogin_name, this.event_4);
      }
    }
  },
};
</script>
<style lang="scss">
//メールフォーム用のscss読込
@import "@/static/scss/contact.scss";
@import "@/static/scss/common.scss";
</style>
