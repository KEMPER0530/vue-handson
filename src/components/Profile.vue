<template>
  <div class="profile container" align="center">
    <section v-if="errored">
      <p>
        <span class="text-danger">{{ this.emessage }}</span>
      </p>
    </section>
    <b-card no-body class="overflow-hidden">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-body title="Profile">
            <img :src="profileImage" class="profile" decoding="async" />
            <b-card-text>
              <p v-if="this.profile[0]" class="writing">{{ this.profile[0].heading }}</p>
            </b-card-text>
          </b-card-body>
        </b-col>
        <b-col md="6">
          <b-card-body title="Architecture Diagram">
            <b-card-img :src="diagramImage" class="rounded-0"></b-card-img>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
    <br />
    <h2>
      当アプリの実装履歴
      <br />
      <font-awesome-icon icon="clipboard-list" />
    </h2>
    <p
      v-if="this.profile[0] && this.lastindex"
    >{{ this.profile[0].lastdate | moment('YYYY/MM/DD') }}時点</p>
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
import moment from "moment";

export default {
  mixins: [constMixin],
  computed: {
    sortedList() {
      return _sortBy(this.profile.filter(n => n.history), "id").reverse();
    }
  },
  filters: {
    /**
     * @param {Date} value    - Date オブジェクト
     * @param {string} format - 変換したいフォーマット
     */
    moment(value, format) {
      return moment(value).format(format);
    }
  },
  data() {
    return {
      profile: [],
      lastindex: "",
      BaseUrl: process.env.VUE_APP_PROFILE_JSON,
      errored: false,
      emessage: this.errorMsg,
      profileImage: process.env.VUE_APP_IMAGE_PATH_PROFILE,
      diagramImage: process.env.VUE_APP_IMAGE_PATH_DIAGRAM
    };
  },
  created() {
    this.getJwtIdToken();
    const AcsUrl = `${this.BaseUrl}`;
    // profileの取得
    axios
      .get(AcsUrl, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`
        }
      })
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
