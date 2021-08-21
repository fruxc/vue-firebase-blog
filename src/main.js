import {
    createApp
} from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/store'
import firebase from 'firebase';
import 'vuetify/dist/vuetify.min.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App)


const firebaseConfig = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGE_SENDER_ID,
    appId: process.env.VUE_APP_APP_ID,
};
firebase.initializeApp(firebaseConfig)

app.use(router)
app.use(vuetify)
app.use(store)

app.mount('#app')