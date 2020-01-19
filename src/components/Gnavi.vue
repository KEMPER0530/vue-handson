<template>
  <div class="container">
    <div role="group">
      <section v-if="errored">
        <p>
          <span class="text-danger">{{ emessage }}</span>
        </p>
      </section>
      <!-- 検索 -->
      <h2>
        <label for="input-live">
          <span class="mgr-3">
            <font-awesome-icon icon="utensils" />
          </span>
          フリーワード検索
        </label>
      </h2>
      <b-input-group size="lg" prepend="🔍">
        <b-form-input
          id="input-live"
          v-model="name"
          :state="searchState"
          icon="search"
          aria-describedby="input-live-help input-live-feedback"
          placeholder="渋谷　肉"
          trim
        ></b-form-input>
        <!-- This will only be shown if the preceding input has an invalid state -->
        <b-form-invalid-feedback :state="searchState">検索フォームに入力してください</b-form-invalid-feedback>
      </b-input-group>
      <!-- エリア選択 -->
      <div class="radio">
        <b-form-radio-group
          v-model="PREF"
          :options="options"
          :state="areaoptionState"
          name="radio-validation"
        >
          <b-form-invalid-feedback :state="areaoptionState">エリアを選択してください</b-form-invalid-feedback>
        </b-form-radio-group>
      </div>
      <b-button block pill variant="outline-primary" @click="showList" :disabled="!submitState">検索</b-button>
      <br />
      <!-- This is a form text block (formerly known as help block) -->
      <b-form-text id="input-live-help">出力店舗は東京、神奈川エリア限定となります</b-form-text>
      <!-- イメージを出力する -->
      <b-card-group columns class="multicol">
        <b-card
          v-for="item in sortedList"
          :key="item.id"
          :title="item.name"
          :img-src="item.image_url.shop_image1"
          img-alt="Image"
          img-top
          border-variant="primary"
          align="center"
          decoding="async"
        >
          <b-card-text>{{ item.address }} / {{ item.tel }}</b-card-text>
          <br />
          <b-card-text>{{ item.pr.pr_short }}</b-card-text>
          <b-row class="button-group1">
            <b-col>
              <b-button :href="item.url" variant="outline-primary" target="_blank" block pill>ぐるなびHP</b-button>
            </b-col>
          </b-row>
          <template v-slot:footer>
            <small class="text-muted">平均予算:{{ item.budget }}円</small>
          </template>
        </b-card>
      </b-card-group>
    </div>
    <!--ページトップ-->
    <b-link href="#" class="return-top" v-scroll-to="'body'" v-if="scrollState">
      <font-awesome-icon icon="angle-double-up" />
    </b-link>
  </div>
</template>

<script>
import axios from "axios";
import _sortBy from "lodash.sortby";
import constMixin from "@/mixins/ConstMixin";

export default {
  mixins: [constMixin],
  computed: {
    searchState() {
      return this.name && this.name.length > this.zero ? true : false;
    },
    submitState() {
      return this.name && this.name.length > this.zero && this.PREF
        ? true
        : false;
    },
    sortedList() {
      return _sortBy(this.list, "id");
    },
    areaoptionState() {
      return Boolean(this.PREF);
    },
    scrollState() {
      if (this.scrollY > this.scrollYlenge) {
        return true;
      } else {
        return false;
      }
    }
  },
  data() {
    return {
      name: "",
      list: "",
      BaseUrl: process.env.VUE_APP_GNAVI_URL,
      APIKEY: process.env.VUE_APP_GNAVI_API_KEY,
      PAGE: process.env.VUE_APP_GNAVI_PAGE,
      PREF: "",
      options: [
        { text: "東京", value: "PREF13" },
        { text: "神奈川", value: "PREF14" }
      ],
      errored: false,
      emessage: "",
      scrollY: this.zero
    };
  },
  methods: {
    window: (onload = function() {}),
    showList() {
      const AcsUrl =
        `${this.BaseUrl}?` +
        `keyid=${this.APIKEY}&` +
        `freeword=${this.name}&` +
        `hit_per_page=${this.PAGE}&` +
        `pref=${this.PREF}`;
      axios
        .get(AcsUrl)
        .then(responce => {
          this.list = responce.data.rest;
          this.$store.dispatch("putG_list", responce.data.rest);
          this.$store.dispatch("putName", this.name);
          this.$store.dispatch("putPref", this.PREF);
          this.errored = false;
        })
        .catch(error => {
          this.errored = true;
          this.emessage = error.message;
        });
    },
    handleScroll() {
      this.scrollY = window.scrollY;
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("scroll", this.handleScroll);
      this.name = this.$store.getters.getName;
      this.list = this.$store.getters.getG_list;
      this.PREF = this.$store.getters.getPref;
      this.errored = false;
    });
  }
};
</script>

<style lang="scss">
// ログイン用のscss読込
@import "@/static/scss/gnavi.scss";
@import "@/static/scss/common.scss";
</style>
