import {Router} from '@vaadin/router';
import '../pages/employees/index.js';
import '../pages/employees/create/index.js';
import '../pages/employees/update/index.js';

const routes = [
  {
    path: '/',
    component: 'lit-employees-page',
  },
  {
    path: '/employees/create',
    component: 'lit-employee-create-page',
  },
  {
    path: '/employees/update/:id',
    component: 'lit-employee-update-page',
  },
];

export function initRouter(outlet) {
  const router = new Router(outlet);
  router.setRoutes(routes);
  return router;
}
