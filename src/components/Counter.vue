<template>
  <div>
    <div
      class="d-flex flex-sm-row flex-column bd-highlight mb-3 justify-content-center align-items-center"
    >
      <div class="p-2 bd-highlight pt-3">
        <h4>サンプルカウントアプリ</h4>
      </div>
      <br />
      <b-form-text id="input-live-help">よくある数字のカウント機能です</b-form-text>
      <br />
      <div class="p-2 bd-highlight">
        <b-button
          v-if="display === false"
          size="lg"
          variant="outline-primary"
          @click="showMember"
        >表示</b-button>
        <b-button v-if="display" size="lg" variant="outline-danger" @click="hideMember">非表示</b-button>
      </div>
    </div>
    <div v-if="display">
      <div class="name-row text-center">{{ teamName }}</div>
      <div class="name-row text-center">
        <a href="https://www.udemy.com/course/vuejs-vuex/" target="_blank">{{ info }}</a>
      </div>
      <Member
        v-for="member in sortedMembers"
        :key="member.id"
        :data="member"
        @sortHeight="sortHeight"
      />
    </div>
  </div>
</template>

<script>
import _sortBy from "lodash.sortby";
import axios from "axios";
import Member from "@/components/Member";

export default {
  name: "Counter",
  components: {
    Member
  },
  data() {
    return {
      BaseUrl: process.env.VUE_APP_MEMBER_JSON_URL,
      teamName: "JavaScript バスケットチーム",
      info:
        "参考:「Vue.js + Vuex で実践的な SPA (シングルページアプリケーション) を作成しよう」",
      display: false,
      errored: false,
      member_list: []
    };
  },
  computed: {
    sortedMembers() {
      return _sortBy(this.member_list, "height").reverse();
    }
  },
  /** ライフサイクルフック */
  // DOM操作が伴う場合
  mounted() {
    // メンバーの属性データ
    axios
      .get(this.BaseUrl)
      .then(response => {
        this.$store.dispatch("putmember", response.data);
      })
      .catch(error => {
        this.errored = true;
        console.error(error);
      })
      .finally(() => {
        if (!this.errored) {
          this.sortHeight();
        }
      });
    return;
  },
  methods: {
    showMember() {
      const self = this;
      self.$set(self, "display", true);
    },
    hideMember() {
      const self = this;
      self.$set(self, "display", false);
    },
    sortHeight() {
      this.member_list = this.$store.getters.getMember;
    }
  }
};
</script>
<style lang="scss">
// ログイン用のscss読込
@import "@/static/scss/counter.scss";
</style>
