// eslint-disable-next-line object-curly-spacing
import { createApp } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import App from './App.vue';

const app = createApp(App);

app.component('VueDatePicker', VueDatePicker);

app.mount('#app');
