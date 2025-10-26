import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// Registrar service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
            console.log('SW registered: ', registration)
        })
        .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError)
        })
    })
}

const app = createApp(App);
app.use(createPinia());

app.mount('#app')
