<template>
  <div>
    <div
      class="d-flex flex-sm-row flex-column bd-highlight mb-3 justify-content-center align-items-center"
    >
      <div class="p-2 bd-highlight pt-3">
        <h4>サンプルカウントアプリ</h4>
      </div>
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
      <Member
        v-for="member in sortedMembers"
        :key="member.id"
        :data="member"
        @changeHeightApp="changeHeightApp"
      />
    </div>
  </div>
</template>

<script>
import _sortBy from "lodash.sortby";
import axios from "axios";
import Member from "@/components/Member";

export default {
  name: "Main",
  components: {
    Member
  },
  data() {
    return {
      BaseUrl: process.env.VUE_APP_MEMBER_JSON_URL,
      teamName: "JavaScript バスケットチーム",
      member: [],
      display: false
    };
  },
  computed: {
    sortedMembers() {
      const members = this.member;
      return _sortBy(members, "height").reverse();
    }
  },
  /** ライフサイクルフック */
  // DOM操作が伴わない場合
  created() {
    const self = this;
    // メンバーの属性データ
    console.log(this.BaseUrl);
    axios
      .get(this.BaseUrl)
      .then(response => {
        self.member = response.data;
      })
      .catch(error => {
        this.errored = true;
      })
      .finally(() => {});
    return;
  },
  methods: {
    changeHeightApp(id, value) {
      const self = this.member;
      self.forEach(index => {
        if (index.id === id) {
          if (self[index.id - 1]) {
            this.$set(self[index.id - 1], "height", value);
          }
        }
        return;
      });
    },
    showMember() {
      const self = this;
      self.$set(self, "display", true);
    },
    hideMember() {
      const self = this;
      self.$set(self, "display", false);
    }
  }
};
</script>
<style lang="scss">
// ログイン用のscss読込
@import "@/static/scss/main.scss";
</style>
