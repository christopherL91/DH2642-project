import {Routes, RouterModule }   from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { OverviewComponent } from './dashboard/overview/overview.component';
import { ConfigComponent } from './dashboard/config/config.component';

// Guards
import {AuthGuard} from './auth.guard';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: OverviewComponent,
            },
            {
                path: 'new',
                component: ConfigComponent,
            },
        ]
    },
    {
        path: '**',
        component: PageNotFoundComponent
    },
];

export const routing = RouterModule.forRoot(appRoutes);
export const routedComponents = [
    LoginComponent,
    PageNotFoundComponent,
    DashboardComponent,
    OverviewComponent,
    ConfigComponent,
];
