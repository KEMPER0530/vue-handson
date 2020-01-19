<template>
  <div class="profile container" align="center">
    <section v-if="errored">
      <p>
        <span class="text-danger">{{ errorMsg }}</span>
      </p>
    </section>
    <b-card no-body class="overflow-hidden">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-body title="Profile">
            <img src="../static/img/mark-profile.svg" class="profile" decoding="async" />
            <b-card-text>
              <p v-if="this.profile[0]" class="writing">{{ this.profile[0].heading }}</p>
            </b-card-text>
            <div>
              <b-badge pill variant="danger" class="badge_profile">Java</b-badge>
              <b-badge pill variant="warning" class="badge_profile">HTML</b-badge>
              <b-badge pill variant="primary" class="badge_profile">JavaScript</b-badge>
              <b-badge pill variant="info" class="badge_profile">Struts2</b-badge>
              <b-badge pill variant="danger" class="badge_profile">Oracle</b-badge>
              <b-badge pill variant="info" class="badge_profile">Seasor2</b-badge>
            </div>
            <div>
              <b-badge pill variant="success" class="badge_profile">SpringBoot</b-badge>
              <b-badge pill variant="primary" class="badge_profile">Go</b-badge>
              <b-badge pill variant="secondary" class="badge_profile">DB2</b-badge>
              <b-badge pill variant="dark" class="badge_profile">Mysql</b-badge>
              <b-badge pill variant="success" class="badge_profile">VueJS</b-badge>
              <b-badge pill variant="warning" class="badge_profile">AWS</b-badge>
              <b-badge pill variant="dark" class="badge_profile">postfix</b-badge>
            </div>
          </b-card-body>
        </b-col>
        <b-col md="6">
          <b-card-img src="https://picsum.photos/400/400/?image=20" class="rounded-0"></b-card-img>
        </b-col>
      </b-row>
    </b-card>
    <br />
    <h2>
      当アプリの実装履歴
      <br />
      <font-awesome-icon icon="clipboard-list" />
    </h2>
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
import constMixin from "@/mixins/ConstMixin";

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
@import "@/static/scss/profile.scss";
@import "@/static/scss/common.scss";
</style>
