<template>
  <div>
    <section v-if="errored">
      <p>
        <span class="text-danger">
          We're sorry, we're not able to retrieve this information at the
          moment, please try back later
        </span>
      </p>
    </section>
    <label for="input-live">
      <h3>work</h3>
    </label>
    <b-form-text id="input-live-help">今後は業務内容も追加予定</b-form-text>
    <br />
    <b-card-group deck>
      <b-card
        v-for="item in workList"
        :key="item.work_id"
        border-variant="primary"
        :header="item.title"
        header-bg-variant="primary"
        header-text-variant="white"
        align="center"
      >
        <b-card-text>{{ item.comment }}</b-card-text>
        <b-button
          :href="item.url"
          variant="primary"
          target="_blank"
          v-if="item.ref === 1"
          >Go HP</b-button
        >
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      workList: []
      BaseUrl: process.env.VUE_APP_WORK_JSON,
      errored: false
    };
  },
  created() {
    const AcsUrl = `${this.BaseUrl}`;
    axios
      .get(AcsUrl)
      .then(responce => {
        this.workList = responce.data;
        console.table(this.workList);
      })
      .catch(error => {
        this.errored = true;
        console.error(error);
      });
  }
};
</script>

<style lang="scss">
// ヘッダー用のscss読込
@import '@/static/scss/work.scss';
</style>
