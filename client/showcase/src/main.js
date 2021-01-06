import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import MainView from './components/router-views/MainView'
import Login from './components/router-views/Login'
import Register from './components/router-views/Register'
import Art from './components/router-views/Art'

import { createWebHistory, createRouter } from "vue-router";
import ToastService from 'primevue/toastservice';

const routes = [
    {
			path: "/",
			name: "Main",
			component: MainView,
		},
		{
			path: "/login",
			name: "Login",
			component: Login,
		},
		{
			path: "/register",
			name: "Register",
			component: Register,
		},
				{
			path: "/art",
			name: "Art",
			component: Art,
    }
  ];

import 'primevue/resources/themes/saga-blue/theme.css'      //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                           //icons

const router = createRouter({
    history: createWebHistory(),
    routes,
  })

const app = createApp(App)
app.use(ToastService);
app.use(PrimeVue, {ripple: true})
app.use(router)
app.mount('#app')
