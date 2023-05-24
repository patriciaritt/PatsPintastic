import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { PadletListComponent } from './padlet-list/padlet-list.component';
import {PadletDetailsComponent} from "./padlet-details/padlet-details.component";
import {EntrieActionsComponent} from "./entrie-actions/entrie-actions.component";
import {PadletActionsComponent} from "./padlet-actions/padlet-actions.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch:'full'},
  {path:'home', component: HomeComponent},
  {path:'padlets', component: PadletListComponent},
  {path:'padlets/:id', component: PadletDetailsComponent},
  {path:'padlets/:id/entry/:entrie_id', component: EntrieActionsComponent},
  {path:'padlets/padlet/:id', component: PadletActionsComponent},
  {path:'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
