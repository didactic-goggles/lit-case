import {Router} from '@vaadin/router';
import '../pages/home/index.js';
import '../pages/employees/index.js';
import '../pages/employees/create/index.js';
import '../pages/employees/details/index.js';

const routes = [
  {
    path: '/',
    component: 'lit-home-page',
  },
  {
    path: '/employees',
    component: 'lit-employees-page',
  },
  {
    path: '/employees/create',
    component: 'lit-employee-create-page',
  },
  {
    path: '/employees/:id',
    component: 'lit-employee-details-page',
  },
];

export function initRouter(outlet) {
  const router = new Router(outlet);
  router.setRoutes(routes);
  return router;
}
