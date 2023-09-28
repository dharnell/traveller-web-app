import './bootstrap';
import './main';

import "bootstrap/dist/css/bootstrap.css"
import "leaflet/dist/leaflet.css"
import "vue-multiselect/dist/vue-multiselect.css"

import {createApp} from 'vue'
import Index from "./components/index.vue"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Multiselect from 'vue-multiselect'

const app = createApp()
    .component('Index', Index)
    .component('fa-icon', FontAwesomeIcon)
    .component("Multiselect", Multiselect);

app.mount("#app")

export default { app }

import "bootstrap/dist/js/bootstrap.js"