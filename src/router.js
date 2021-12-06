import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/inicio',
            alias: '/',
            name: 'Inicio',
            component: () => import("./components/Inicio")
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import("./components/Login")
        },
        {
            path: '/atenciones-agendadas',
            name: 'AtencionesAgendadas',
            component: () => import("./components/AtencionesAgendadas")
        },
        {
            path: '/atencion-detalle/:citaId',
            name: 'AtencionDetalle',
            component: () => import("./components/AtencionDetalle")
        },
        {
            path: '/registro-atenciones',
            name: 'RegistroAtenciones',
            component: () => import("./components/RegistroAtenciones")
        },
        {
            path: '/registro-detalle/:citaId',
            name: 'RegistroDetalle',
            component: () => import("./components/RegistroDetalle")
        },
        {
            path: '/registro-medico',
            name: 'RegistroMedico',
            component: () => import("./components/RegistroMedico")
        }
    ]
});

const routesAllowed = ["Login", "RegistroMedico"];
import TokenService from './services/TokenService';

router.beforeEach((to, from, next) => {
    if (!routesAllowed.includes(to.name) && !TokenService.isAuthenticate) {
        next({ name: 'Login' });
    } else {
        next();
    }
});


export default router;