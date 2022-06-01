// CSS.
import 'solana-wallets-vue/styles.css';
import './main.css';

// Routing.
import router from './router';

// Create the app.
import { createApp } from 'vue';
import App from './App.vue';
createApp(App).use(router).mount('#app');
