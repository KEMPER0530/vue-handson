<template>
  <div class="card-form">
    <h2 v-b-tooltip.hover title="カード情報を登録する機能です">
      <span class="mgr-3">
        <font-awesome-icon icon="credit-card" />
      </span>
      カード情報の入力
    </h2>
    <section v-if="errored">
      <p>
        <span class="text-danger">{{ errorMsg }}</span>
      </p>
    </section>
    <div class="card-list" v-b-tooltip.hover title="セキュリティコードは暗号化して登録します">
      <Paycard
        :fields="fields"
        :labels="formData"
        :isCardNumberMasked="isCardNumberMasked"
        :randomBackgrounds="randomBackgrounds"
        :backgroundImage="backgroundImage"
      />
    </div>
    <div class="card-form__inner">
      <div class="card-input">
        <label for="cardNumber" class="card-input__label">カード番号</label>
        <input
          type="tel"
          :id="fields.cardNumber"
          @input="changeNumber"
          @focus="focusCardNumber"
          @blur="blurCardNumber"
          class="card-input__input"
          :value="formData.cardNumber"
          :maxlength="cardNumberMaxLength"
          data-card-field
          autocomplete="off"
        />
        <button
          class="card-input__eye"
          :class="{ '-active': !isCardNumberMasked }"
          title="Show/Hide card number"
          tabindex="-1"
          :disabled="formData.cardNumber === ''"
          @click="toggleMask"
        ></button>
      </div>
      <div class="card-input">
        <label for="cardName" class="card-input__label">カード名義人</label>
        <input
          type="text"
          :id="fields.cardName"
          v-letter-only
          @input="changeName"
          class="card-input__input"
          :value="formData.cardName"
          data-card-field
          autocomplete="off"
        />
      </div>
      <div class="card-form__row">
        <div class="card-form__col">
          <div class="card-form__group">
            <label for="cardMonth" class="card-input__label">有効期限</label>
            <select
              class="card-input__input -select"
              :id="fields.cardMonth"
              v-model="formData.cardMonth"
              @change="changeMonth"
              data-card-field
            >
              <option value disabled selected>月</option>
              <option
                v-bind:value="n < 10 ? '0' + n : n"
                v-for="n in 12"
                v-bind:disabled="n < minCardMonth"
                v-bind:key="n"
              >{{ generateMonthValue(n) }}</option>
            </select>
            <select
              class="card-input__input -select"
              :id="fields.cardYear"
              v-model="formData.cardYear"
              @change="changeYear"
              data-card-field
            >
              <option value disabled selected>年</option>
              <option
                v-bind:value="$index + minCardYear"
                v-for="(n, $index) in 12"
                v-bind:key="n"
              >{{ $index + minCardYear }}</option>
            </select>
          </div>
        </div>
        <div class="card-form__col -cvv">
          <div class="card-input">
            <label for="cardCvv" class="card-input__label">セキュリティコード</label>
            <input
              type="tel"
              class="card-input__input"
              v-number-only
              :id="fields.cardCvv"
              maxlength="4"
              :value="formData.cardCvv"
              @input="changeCvv"
              data-card-field
              autocomplete="off"
            />
          </div>
        </div>
      </div>
      <b-button
        :disabled="!activateSubmit"
        v-b-modal.my-modal
        block
        pill
        variant="outline-primary"
        size="lg"
        @click="showModal"
      >登録</b-button>
      <!-- The modal -->
      <b-modal ref="regist-modal" centered hide-footer>
        <div class="d-block text-center">
          <h4>
            クレジットカード情報を登録します。
            <br />よろしいですか？
          </h4>
        </div>
        <b-button class="mt-3" pill variant="outline-primary" block @click="invaildCard">OK</b-button>
      </b-modal>
      <!-- 登録成功 -->
      <b-modal ref="success-modal" centered hide-footer>
        <div class="d-block text-center">
          <h4>
            登録に成功しました。
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
  </div>
</template>

<script>
import Paycard from "@/components/Paycard";
import axios from "axios";
import constMixin from "@/mixins/ConstMixin";

export default {
  mixins: [constMixin],
  name: "paycardform",
  directives: {
    "number-only": {
      bind(el) {
        function checkValue(event) {
          event.target.value = event.target.value.replace(/[^0-9]/g, "");
          if (event.charCode >= 48 && event.charCode <= 57) {
            return true;
          }
          event.preventDefault();
        }
        el.addEventListener("keypress", checkValue);
      }
    },
    "letter-only": {
      bind(el) {
        function checkValue(event) {
          if (event.charCode >= 48 && event.charCode <= 57) {
            event.preventDefault();
          }
          return true;
        }
        el.addEventListener("keypress", checkValue);
      }
    }
  },
  props: {
    formData: {
      type: Object,
      default: () => {
        return {
          cardName: "",
          cardNumber: "",
          cardMonth: "",
          cardYear: "",
          cardCvv: ""
        };
      }
    },
    backgroundImage: [String, Object],
    randomBackgrounds: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Paycard
  },
  data() {
    return {
      fields: {
        cardNumber: "v-card-number",
        cardName: "v-card-name",
        cardMonth: "v-card-month",
        cardYear: "v-card-year",
        cardCvv: "v-card-cvv"
      },
      minCardYear: new Date().getFullYear(),
      isCardNumberMasked: true,
      mainCardNumber: this.cardNumber,
      cardNumberMaxLength: 19,
      RegistUrl: process.env.VUE_APP_CREDIT_REGIST_URL,
      errored: false,
      emessage: ""
    };
  },
  computed: {
    minCardMonth() {
      if (this.formData.cardYear === this.minCardYear)
        return new Date().getMonth() + 1;
      return 1;
    },
    activateSubmit() {
      if (
        this.mainCardNumber &&
        this.formData.cardName &&
        this.formData.cardMonth &&
        this.formData.cardYear &&
        this.formData.cardCvv
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    cardYear() {
      if (this.formData.cardMonth < this.minCardMonth) {
        this.formData.cardMonth = "";
      }
    }
  },
  mounted() {
    this.maskCardNumber();
  },
  methods: {
    showModal() {
      this.$refs["regist-modal"].show();
    },
    moveTop() {
      this.$router.push("/");
    },
    generateMonthValue(n) {
      return n < 10 ? `0${n}` : n;
    },
    changeName(e) {
      this.formData.cardName = e.target.value;
      this.$emit("input-card-name", this.formData.cardName);
    },
    changeNumber(e) {
      this.formData.cardNumber = e.target.value;
      let value = this.formData.cardNumber.replace(/\D/g, "");
      // american express, 15 digits
      if (/^3[47]\d{0,13}$/.test(value)) {
        this.formData.cardNumber = value
          .replace(/(\d{4})/, "$1 ")
          .replace(/(\d{4}) (\d{6})/, "$1 $2 ");
        this.cardNumberMaxLength = 17;
      } else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) {
        // diner's club, 14 digits
        this.formData.cardNumber = value
          .replace(/(\d{4})/, "$1 ")
          .replace(/(\d{4}) (\d{6})/, "$1 $2 ");
        this.cardNumberMaxLength = 16;
      } else if (/^\d{0,16}$/.test(value)) {
        // regular cc number, 16 digits
        this.formData.cardNumber = value
          .replace(/(\d{4})/, "$1 ")
          .replace(/(\d{4}) (\d{4})/, "$1 $2 ")
          .replace(/(\d{4}) (\d{4}) (\d{4})/, "$1 $2 $3 ");
        this.cardNumberMaxLength = 19;
      }
      this.$emit("input-card-number", this.formData.cardNumber);
    },
    changeMonth() {
      this.$emit("input-card-month", this.formData.cardMonth);
    },
    changeYear() {
      this.$emit("input-card-year", this.formData.cardYear);
    },
    changeCvv(e) {
      this.formData.cardCvv = e.target.value;
      this.$emit("input-card-cvv", this.formData.cardCvv);
    },
    invaildCard() {
      this.$refs["regist-modal"].hide();
      let number = this.formData.cardNumber;
      let sum = 0;
      let isOdd = true;
      for (let i = number.length - 1; i >= 0; i--) {
        let num = number.charAt(i);
        if (isOdd) {
          sum += num;
        } else {
          num = num * 2;
          if (num > 9) {
            num = num
              .toString()
              .split("")
              .join("+");
          }
          sum += num;
        }
        isOdd = !isOdd;
      }
      // カード番号の整合性確認
      if (
        isNaN(this.mainCardNumber.replace(/\s+/g, "")) &&
        number.length !== 19
      ) {
        alert("invaild card number");
        // カード名義人の整合性確認
      } else if (!this.isHanEi(this.formData.cardName)) {
        alert("invaild card name");
      } else {
        this.getJwtIdToken();
        // カード情報を登録する
        const AcsUrl = `${this.RegistUrl}`;
        const params = new URLSearchParams();
        params.append("cardnumber", this.mainCardNumber);
        params.append("cardname", this.formData.cardName.toUpperCase());
        params.append("cardmonth", this.formData.cardMonth);
        params.append("cardyear", this.formData.cardYear);
        params.append("cardcvv", this.formData.cardCvv);
        // クレジットカードデータの登録を行う
        axios
          .post(AcsUrl, params, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("jwt")}`
            }
          })
          .then(response => {
            this.regist = response.data;
            if (this.regist.Result === 1 && this.regist.Responce === 200) {
              this.errored = false;
              this.$refs["success-modal"].show();
            } else if (
              this.regist.Result === 2 &&
              this.regist.Responce === 200
            ) {
              this.emessage = "入力されたカード番号は既に登録されています";
              this.$refs["failed-modal"].show();
            } else {
              this.emessage = "登録に失敗しました";
              this.$refs["failed-modal"].show();
            }
          })
          .catch(error => {
            this.errored = true;
            console.error(error);
            this.emessage = "登録に失敗しました";
            this.$refs["failed-modal"].show();
          })
          .finally(() => {
            return;
          });
        return;
      }
    },
    blurCardNumber() {
      if (this.isCardNumberMasked) {
        this.maskCardNumber();
      }
    },
    maskCardNumber() {
      this.mainCardNumber = this.formData.cardNumber;
      let arr = this.formData.cardNumber.split("");
      arr.forEach((element, index) => {
        if (index > 4 && index < 14 && element.trim() !== "") {
          arr[index] = "*";
        }
      });
      this.formData.cardNumber = arr.join("");
    },
    unMaskCardNumber() {
      this.formData.cardNumber = this.mainCardNumber;
    },
    focusCardNumber() {
      this.unMaskCardNumber();
    },
    toggleMask() {
      this.isCardNumberMasked = !this.isCardNumberMasked;
      if (this.isCardNumberMasked) {
        this.maskCardNumber();
      } else {
        this.unMaskCardNumber();
      }
    },
    isHanEi(str) {
      let _str = str.replace(/\s+/g, "");
      _str = _str == null ? "" : _str;
      if (_str.match(/^[A-Za-z]*$/)) {
        return true;
      } else {
        return false;
      }
    },
    toFullWidth(elm) {
      let _elm = elm;
      return _elm.value.replace(/[A-Za-z0-9!-~]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) + 0xfee0);
      });
    }
  }
};
</script>
