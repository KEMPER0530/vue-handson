<template>
  <div role="group">
    <section v-if="errored">
      <p>
        <span class="text-danger">
          We're sorry, we're not able to retrieve this information at the
          moment, please try back later
        </span>
      </p>
    </section>
    <label for="input-live">フリーワード検索</label>
    <b-input-group size="lg" prepend="🔍">
      <b-form-input
        id="input-live"
        v-model="name"
        :state="nameState"
        icon="search"
        aria-describedby="input-live-help input-live-feedback"
        placeholder="ラーメン"
        trim
      ></b-form-input>
      <!-- This will only be shown if the preceding input has an invalid state -->
      <b-form-invalid-feedback id="input-live-feedback">検索フォームに入力してください</b-form-invalid-feedback>
    </b-input-group>
    <br />
    <div v-if="nameState">
      <b-button pill block variant="outline-primary" @click="showList">検索</b-button>
    </div>
    <div v-else>
      <b-button disabled pill block variant="outline-primary">検索</b-button>
    </div>
    <br />
    <!-- This is a form text block (formerly known as help block) -->
    <b-form-text id="input-live-help">出力店舗は東京エリア限定となります</b-form-text>
    <!-- イメージを出力する -->
    <b-card-group columns>
      <b-card
        v-for="item in sortedList"
        :key="item.id"
        :title="item.name"
        :img-src="item.image_url.shop_image1"
        img-alt="Image"
        img-top
        align="center"
        decoding="async"
      >
        <b-card-text>{{ item.address }} / {{item.tel}}</b-card-text>
        <br />
        <b-card-text>{{ item.pr.pr_short }}</b-card-text>
        <b-button :href="item.url" variant="primary" target="_blank">Go HP</b-button>
        <template v-slot:footer>
          <small class="text-muted">平均予算:{{ item.budget }}円</small>
        </template>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import axios from "axios";
import _sortBy from "lodash.sortby";

export default {
  computed: {
    nameState() {
      return this.name && this.name.length > 0 ? true : false;
    },
    sortedList() {
      return _sortBy(this.list, "id");
    }
  },
  data() {
    return {
      name: "",
      list: "",
      BaseUrl: process.env.VUE_APP_GNAVI_URL,
      APIKEY: process.env.VUE_APP_GNAVI_API_KEY,
      PAGE: process.env.VUE_APP_GNAVI_PAGE,
      PREF: "PREF13",
      errored: false
    };
  },
  methods: {
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
          this.$store.dispatch("putGlist", responce.data.rest);
          this.$store.dispatch("putName", this.name);
        })
        .catch(error => {
          this.errored = true;
          console.error(error);
        });
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.name = this.$store.getters.getName;
      this.name = this.$store.getters.getGlist;
      this.errored = false;
    });
  }
};
</script>

<style></style>
