import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import store from './store/index.js'

loadFonts();
const app = createApp(App);

app.use(vuetify);
app.use(store)
app.mount("#app");
