<template>
  <div id="paycardmain" class="wrapper">
    <PaycardForm
      :form-data="formData"
      @input-card-number="updateCardNumber"
      @input-card-name="updateCardName"
      @input-card-month="updateCardMonth"
      @input-card-year="updateCardYear"
      @input-card-cvv="updateCardCvv"
    />
  </div>
</template>

<script>
import PaycardForm from "@/components/PaycardForm";

export default {
  name: "Paycardmain",
  components: {
    PaycardForm
  },
  data() {
    return {
      formData: {
        cardName: "",
        cardNumber: "",
        cardMonth: "",
        cardYear: "",
        cardCvv: ""
      }
    };
  },
  methods: {
    updateCardNumber() {},
    updateCardName() {},
    updateCardMonth() {},
    updateCardYear() {},
    updateCardCvv() {}
  }
};
</script>

<style lang="scss">
@import "@/static/scss/paycard.scss";
@import "@/static/scss/common.scss";
</style>
