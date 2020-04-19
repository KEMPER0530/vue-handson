import firebase from "firebase";

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
            pmsg: _pmsg
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
                        res.user.getIdToken( /* forceRefresh */ false).then(idToken => {
                            sessionStorage.setItem("jwt", idToken.toString());
                        });
                    },
                    err => {
                        alert(err.message);
                    }
                );
        }
    }
}