import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/mfe', pathMatch: 'full' },
  { path: 'mfe', loadChildren: () => import("./mfegatewaymodule/mfegatewaymodule.module").then((m) => m.MfegatewaymoduleModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
