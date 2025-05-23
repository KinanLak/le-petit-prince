import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // ajout de l'import

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        loadChildren: () =>
            import('./login/login.module').then((m) => m.LoginPageModule),
    },
    {
        path: 'tabs',
        loadChildren: () =>
            import('./tabs/tabs.module').then((m) => m.TabsPageModule),
        canActivate: [AuthGuard], // ajout du garde sur la route protégée
    },
    /*{
        path: 'tuto',
        loadChildren: () =>
            import('./tuto/tuto.module').then((m) => m.TutoPageModule),
    },*/
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
