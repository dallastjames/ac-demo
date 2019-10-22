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
    { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
