<template>
  <div class="container-fluid">
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
            <font-awesome-icon icon="newspaper" />
          </span>
          Japan News API
        </label>
      </h2>
      <!-- カテゴリ選択 -->
      <div class="radio">
        <b-form-radio-group
          v-model="PREF"
          :options="options"
          :state="areaoptionState"
          name="radio-validation"
        >
          <b-form-invalid-feedback :state="areaoptionState">カテゴリを選択してください</b-form-invalid-feedback>
        </b-form-radio-group>
      </div>
      <b-button block pill variant="outline-primary" @click="showList" :disabled="!submitState">検索</b-button>
      <br />
      <!-- loading画面 -->
      <div class="vld-parent">
        <loading
          :active.sync="isLoading"
          :can-cancel="true"
          :loader="loader"
          :is-full-page="fullPage"></loading>
        <!-- イメージを出力する -->
        <b-card-group columns class="multicol">
          <b-card
            v-for="item in sortedList"
            :key="item.source.id"
            :title="item.Title"
            :img-src="item.UrlToImage"
            img-alt="Image"
            img-top
            border-variant="primary"
            align="center"
            decoding="async"
          >
            <br />
            <b-card-text>{{ item.Description }}</b-card-text>
            <b-row class="button-group1">
              <b-col>
                <b-button :href="item.Url" variant="outline-primary" target="_blank" block pill>Link</b-button>
              </b-col>
            </b-row>
            <template v-slot:footer>
              <small class="text-muted">更新日:{{ item.PublishedAt }}</small>
            </template>
          </b-card>
        </b-card-group>
      </div>
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
import Loading from 'vue-loading-overlay';

export default {
  mixins: [constMixin],
  computed: {
    submitState() {
      return this.PREF ? true : false;
    },
    sortedList() {
      let news = _sortBy(this.list, "PublishedAt").reverse();
      for (let i in news) {
        news[i].source.id = i;
      }
      return news;
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
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      loader: "bars",
      name: "",
      list: "",
      BaseUrl: process.env.VUE_APP_GET_NEWS_API,
      PREF: "",
      options: [
        { text: "ビジネス", value: "business" },
        { text: "エンターテイメント", value: "entertainment" },
        { text: "健康", value: "health" },
        { text: "科学", value: "science" },
        { text: "スポーツ", value: "sports" },
        { text: "テクノロジー", value: "technology" }
      ],
      errored: false,
      emessage: "",
      scrollY: this.zero,
      result: false,
    };
  },
  methods: {
    showList() {
      // loadingの表示
      this.isLoading = true;
      setTimeout(function(){
      }, 1500);

      // NEWSAPIの取得
      this.result = false;
      const AcsUrl = `${this.BaseUrl}`;
      const params = new URLSearchParams();
      params.append("category", this.PREF);
      this.getJwtIdToken();
      axios
        .post(AcsUrl, params, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`
          }
        })
        .then(responce => {
          this.list = responce.data.articles;
          this.$store.dispatch("putG_list", this.list);
          this.$store.dispatch("putPref", this.PREF);
          this.errored = false;
          this.result = true;
        })
        .catch(error => {
          this.errored = true;
          this.emessage = error.message;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    handleScroll() {
      this.scrollY = window.scrollY;
    },
  },
  watch: {
    result: function(val,oldVal){
      if ( this.result ){
        this.setAccessLog(this.$store.getters.getLogin_name, this.event_6);
      }
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
