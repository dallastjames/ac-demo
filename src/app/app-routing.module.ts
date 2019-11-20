import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from '@ac/core/routes/guards';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'home',
        loadChildren: (): any =>
            import('./home/home.module').then(m => m.HomePageModule),
        canActivate: [LoggedInGuard]
    },
    { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
    { path: 'logout', loadChildren: './logout/logout.module#LogoutPageModule' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
