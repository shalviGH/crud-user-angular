import { Routes } from '@angular/router';
import path from 'path';

export const routes: Routes = [
    {
        path: 'user-control',
        title: 'User Control',
        loadComponent: () => import('./pages/home/home.component'),

        children:[
            {
                path:'users',
                title: 'users',
                loadComponent: ()=> import('./pages/users/user-list/user-list.component'),
            },
            {
                path:'Add-User',
                title:'Add New User',
                loadComponent: () => import('./pages/users/user-add/user-add.component')
            },
            {
                path:'delete/:id',
                title:'About',
                loadComponent: () => import('./pages/about/about.component'),
            },
            {
                path:'edit/:id',
                title: 'Edit user',
                loadComponent: ()=> import('./pages/users/edit/edit.component'),
            },

            {
                path:'about',
                title:'About',
                loadComponent: () => import('./pages/about/about.component'),
            }
        ]
    },
    {
        path:'',
        redirectTo: '/user-control',
        pathMatch: 'full'
    }



];
