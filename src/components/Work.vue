<template>
  <div class="container">
    <section v-if="errored">
      <p>
        <span class="text-danger">
          We're sorry, we're not able to retrieve this information at the
          moment, please try back later
        </span>
      </p>
    </section>
    <div>
      <h2>
        <span class="mgr-3">
          <font-awesome-icon icon="wrench" />
        </span>
        WORK
      </h2>
      <b-form-text id="input-live-help">今後も追加予定</b-form-text>
    </div>
    <br />
    <b-card-group columns class="multicolwork">
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
          v-if="item.ref === '1'"
          block
          pill
          :href="item.url"
          variant="outline-primary"
          target="_blank"
          >Go</b-button
        >
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import axios from "axios";
import constMixin from "@/mixins/ConstMixin";

export default {
  mixins: [constMixin],
  data() {
    return {
      workList: [],
      BaseUrl: process.env.VUE_APP_WORK_JSON,
      errored: false
    };
  },
  created() {
    this.getJwtIdToken();
    const AcsUrl = `${this.BaseUrl}`;
    axios
      .get(AcsUrl, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`
        }
      })
      .then(responce => {
        this.workList = responce.data;
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
@import "@/static/scss/work.scss";
@import "@/static/scss/common.scss";
</style>
