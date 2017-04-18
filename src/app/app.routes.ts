import { Routes, RouterModule }   from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OverviewComponent } from './dashboard/overview/overview.component';
import { AuthGuard } from './auth.guard';
import { AddComponent } from "./dashboard/add/add.component";
import { CityComponent } from "./dashboard/details/city/city.component";
import { GraphComponent } from './dashboard/details/graph/graph.component';
import { DetailsComponent } from './dashboard/details/details.component';
import { DataResolver } from './app.resolver';

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
        resolve: {
            userdata: DataResolver
        },
        children: [
            {
                path: '',
                component: OverviewComponent,
                resolve: {
                    userdata: DataResolver
                },
            },
            {
                path: 'add',
                component: AddComponent,
                resolve: {
                    userdata: DataResolver
                },
            },
            {
                path: 'details/:location',
                component: DetailsComponent,
                resolve: {
                    userdata: DataResolver
                },
                children: [
                    {
                        path: '',
                        component: CityComponent
                    },
                    {
                        path: 'graph',
                        component: GraphComponent,
                    },
                ],
            },
        ],
    },
    {
        path: '**',
        component: PageNotFoundComponent,
    },
];

export const routing = RouterModule.forRoot(appRoutes);
export const routedComponents = [
    LoginComponent,
    PageNotFoundComponent,
    DashboardComponent,
    OverviewComponent,
    AddComponent,
    GraphComponent,
    CityComponent,
];