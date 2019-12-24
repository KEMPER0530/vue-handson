<template>
  <div class="about" align="center">
    <section v-if="errored">
      <p>
        <span class="text-danger">
          We're sorry, we're not able to retrieve this information at the
          moment, please try back later
        </span>
      </p>
    </section>
    <h2>
      Profile
      <a href="https://github.com/KEMPER0530/vue-handson" target="_blank">
        <img src="@/static/img/mark-github.svg" title="github" decoding="async" />
      </a>
    </h2>
    <img src="../static/img/mark-profile.svg" class="about" decoding="async" />
    <p v-if="this.profile[0]" class="writing">{{ this.profile[0].heading }}</p>
    <br />
    <h2>当アプリの実装履歴</h2>
    <p v-if="this.profile[0] && this.lastindex">{{ this.profile[0].lastdate }}時点</p>
    <b-list-group class="list-size">
      <b-list-group-item v-for="item in sortedList" :key="item.id">
        <span v-if="item.history">
          {{ item.history }}
          <b-badge variant="danger" v-if="item.id == lastindex" pill>NEW</b-badge>
        </span>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>
<script>
import axios from "axios";
import _sortBy from "lodash.sortby";

export default {
  computed: {
    sortedList() {
      return _sortBy(this.profile.filter(n => n.history), "id").reverse();
    }
  },
  data() {
    return {
      profile: [],
      lastindex: "",
      BaseUrl: process.env.VUE_APP_PROFILE_JSON,
      errored: false
    };
  },
  created() {
    const AcsUrl = `${this.BaseUrl}`;
    // profileの取得
    axios
      .get(AcsUrl)
      .then(responce => {
        this.profile = responce.data;
        this.lastindex = this.profile.slice(-1)[0].id;
      })
      .catch(error => {
        this.errored = true;
        console.error(error);
      });
  }
};
</script>
<style lang="scss">
// プロフィール用のscss読込
@import "@/static/scss/about.scss";
@import "@/static/scss/common.scss";
</style>
