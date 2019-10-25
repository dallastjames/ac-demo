import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from '@ac/core/routes/guards';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        loadChildren: (): any =>
            import('./home/home.module').then(m => m.HomePageModule),
        canActivate: [LoggedInGuard]
    },
    {
        path: 'login',
        loadChildren: (): any =>
            import('./auth/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'callback',
        loadChildren: (): any =>
            import('./auth/callback/callback.module').then(
                m => m.CallbackPageModule
            )
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
