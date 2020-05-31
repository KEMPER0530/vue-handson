<template>
  <div>
    <div>
      <div>IP Geolocationによって現在地の大体の位置を表示しています。<br>
      下記フォームに住所や場所を入力し、検索を押下するとマーカーがセットされます。
      </div>
      <div>
        <b-container fluid>
          <b-row class="mb-3">
            <b-col sm="10" class="mb-3">
              <b-form-input id="input-large" size="lg" placeholder="例:横浜市神奈川区新浦島町１丁目" v-model="address">
              </b-form-input>
            </b-col>
            <b-col sm="2">
              <b-button
                block
                pill
                variant="outline-primary"
                @click="getInfo()"
              >検索</b-button>
            </b-col>
          </b-row>
        </b-container>
      </div>
      <div id="map">
        <b-container fluid>
          <GmapMap
            :center="center"
            :zoom="zoom"
            ref="map"
            style="width: 100%; height: 768px;">
              <GmapMarker v-for="(m,id) in marker_items"
                :position="m.position"
                :title="m.title"
                :clickable="true"
                :draggable="false"
                :key="id">
              </GmapMarker>
          </GmapMap>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store";
import constMixin from "@/mixins/ConstMixin";

export default {
  mixins: [constMixin],
  data() {
    return {
      geocoder: {},
      address: "",
      center: {lat: 0, lng: 0},
      zoom: 14,
      result: false,
      marker_items: [
        {
          position: {
            lat: 0,
            lng: 0
          },
          title: 'Present location'
        },
      ],
      infos: [],
    }
  },
  methods: {
    getInfo() {
      this.result = false;
      // Geocoderオブジェクト生成
      this.geocoder = new google.maps.Geocoder();
      // 住所検索実行
      this.geocoder.geocode({
        'address': this.address
      }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          // 緯度経度の取得
          this.center.lat = results[0].geometry.location.lat();
          this.center.lng = results[0].geometry.location.lng();
          this.marker_items[0].position.lat = this.center.lat;
          this.marker_items[0].position.lng = this.center.lng;
        } else {
          // 失敗の場合
          alert('住所検索に失敗しました。住所が正しいか確認してください');
        }
      });
      this.result = true;
    }
  },
  created() {
    // ipdata.coへの接続文字列
    const AcsUrl = process.env.VUE_APP_IPDATA;
    // APIの実施
    axios.get(AcsUrl).then(responce => {
        // IPアドレスから位置を取得
        let lat = parseFloat(responce.data.latitude);
        let lng = parseFloat(responce.data.longitude);
        this.center = new google.maps.LatLng(lat, lng);
        this.marker_items[0].position.lat = lat;
        this.marker_items[0].position.lng = lng;
      }).catch(error => {
        console.error("Failed to get IP-DATA ");
      });
  },
  watch: {
    result: function(val,oldVal){
      if ( this.result ){
        this.setAccessLog(this.$store.getters.getLogin_name, this.event_7);
      }
    }
  },
}
</script>
