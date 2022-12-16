import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {GcSpreadSheets, GcWorksheet, GcColumn} from '@grapecity/spread-sheets-vue'

let app = createApp(App);
app.component('gc-spread-sheets', GcSpreadSheets);
app.component('gc-worksheet', GcWorksheet);
app.component('gc-column', GcColumn);
app.use(router);
app.mount("#app");