import { createApp } from 'vue'
import App from './App.vue'
import Antd from "ant-design-vue";
import 'ant-design-vue/dist/antd.variable.min.css';
import JsonViewer from "vue3-json-viewer";
import "vue3-json-viewer/dist/index.css";
import VueHighlightJS from 'vue3-highlightjs'
import 'highlight.js/styles/solarized-dark.css'

const app = createApp(App);

app.use(Antd);
app.use(JsonViewer);
app.use(VueHighlightJS)
app.mount("#app");