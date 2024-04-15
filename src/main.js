import { createApp } from 'vue'; // Sử dụng createApp thay vì Vue để tạo ứng dụng
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/css/main.css';

// Sử dụng createApp để tạo ứng dụng Vue
const app = createApp(App);

// Sử dụng router đã được cấu hình
app.use(router);

// Mount ứng dụng vào phần tử #app trong DOM
app.mount('#app');
