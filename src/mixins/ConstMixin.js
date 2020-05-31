import firebase from "firebase";
import axios from "axios";

const _zero = 0;
const _one = 1;
const _two = 2;
const _three = 3;
const _four = 4;
const _five = 5;
const _http_ok = 200;
const _errorMsg = "We're sorry, we're not able to retrieve this information at the moment, please try back later";
const _title = "Akazawa portfolio";
const _scrollYlenge = 700;
const _pmsg = "エンハンス内容";
const _event_1 = "ID.PASSログイン";
const _event_2 = "SMSログイン";
const _event_3 = "アカウント作成";
const _event_4 = "メールの送信";
const _event_5 = "クレジットカード情報登録";
const _event_6 = "NEWSAPI検索";
const _event_7 = "GoogleMAP検索";

export default {
    data() {
        return {
            zero: _zero,
            one: _one,
            two: _two,
            three: _three,
            four: _four,
            five: _five,
            http_ok: _http_ok,
            errorMsg: _errorMsg,
            title: _title,
            scrollYlenge: _scrollYlenge,
            pmsg: _pmsg,
            event_1: _event_1,
            event_2: _event_2,
            event_3: _event_3,
            event_4: _event_4,
            event_5: _event_5,
            event_6: _event_6,
            event_7: _event_7,
        }
    },
    methods: {
        /**
         * FirebaseからJWT用のトークンを取得する
         */
        getJwtIdToken() {
            firebase
                .auth()
                .signInWithEmailAndPassword(
                    process.env.VUE_APP_FIREBASE_EMAIL,
                    process.env.VUE_APP_FIREBASE_PASS
                )
                .then(
                    res => {
                        res.user.getIdToken( /* forceRefresh */ true).then(idToken => {
                            sessionStorage.setItem("jwt", idToken.toString());
                        });
                    },
                    err => {
                        alert(err.message);
                    }
                );
        },
        /**
         * アクセスログを設定する
         */
        async setAccessLog(user_id = null, event_id = null) {
            // IPアドレス等の情報取得
            let obj = await this.getIPAddresses();
            const AcsUrl = process.env.VUE_APP_REGIST_ACCESS_LOG;
            // パラメータの設定
            const params = new URLSearchParams();
            params.append("user_id", user_id);
            params.append("event_id", event_id);
            params.append("access_ip", obj.access_ip);
            params.append("city", obj.city);
            params.append("region", obj.region);
            params.append("region_code", obj.region_code);
            params.append("country_name", obj.country_name);
            params.append("country_code", obj.country_code);
            params.append("continent_name", obj.continent_name);
            params.append("continent_code", obj.continent_code);
            params.append("latitude", obj.latitude);
            params.append("longitude", obj.longitude);
            params.append("postal", obj.postal);
            params.append("calling_code", obj.calling_code);
            // トークンの取得
            this.getJwtIdToken();
            // APIの実行
            axios
                .post(AcsUrl, params, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`
                    }
                })
                .then(responce => {})
                .catch(error => {})
                .finally(() => {});
        },
        async getIPAddresses() {
            // ipdata.coへの接続文字列
            const AcsUrl = process.env.VUE_APP_IPDATA;
            // 連想配列定義
            let obj = {};
            // APIの実施
            await axios.get(AcsUrl).then(responce => {
                obj.access_ip = responce.data.ip;
                obj.city = responce.data.city;
                obj.region = responce.data.region;
                obj.region_code = responce.data.region_code;
                obj.country_name = responce.data.country_name;
                obj.country_code = responce.data.country_code;
                obj.continent_name = responce.data.continent_name;
                obj.continent_code = responce.data.continent_code;
                obj.latitude = responce.data.latitude;
                obj.longitude = responce.data.longitude;
                obj.postal = responce.data.postal;
                obj.calling_code = responce.data.calling_code;
            }).catch(error => {
                console.error("Failed to get IP-DATA ");
            });
            return obj;
        },
    }
}