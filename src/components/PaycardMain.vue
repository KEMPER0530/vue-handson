<template>
  <div class="wrapper" id="paycardmain">
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
import PaycardForm from '@/components/PaycardForm';
export default {
  name: 'paycardmain',
  components: {
    PaycardForm
  },
  data() {
    return {
      formData: {
        cardName: '',
        cardNumber: '',
        cardMonth: '',
        cardYear: '',
        cardCvv: ''
      }
    };
  },
  methods: {
    updateCardNumber(val) {},
    updateCardName(val) {},
    updateCardMonth(val) {},
    updateCardYear(val) {},
    updateCardCvv(val) {}
  }
};
</script>

<style lang="scss">
@import '@/static/scss/paycard.scss';
</style>
