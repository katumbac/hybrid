import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'login',
        loadComponent: () => import('../login/login.page').then( m => m.LoginPage)
      },
      {
        path: 'registro',
        loadComponent: () => import('../registro/registro.page').then( m => m.RegistroPage)
      },
      {
        path: 'compras',
        loadComponent: () => 
          import('../compras/compras.page').then( m => m.ComprasPage)
      },
      {
        path: 'tab1',
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab2/:product_id',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'tabs/login',
    pathMatch: 'full',
  },
];

