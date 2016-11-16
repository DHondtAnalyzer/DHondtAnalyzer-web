import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import {AuthGuard} from "./shared/auth/auth.guard";

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', loadChildren: 'app/visual/landing/landing.module#LandingModule' },
            { path: 'app', loadChildren: 'app/visual/root/root.module#RootModule', canActivate: [AuthGuard]},
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
