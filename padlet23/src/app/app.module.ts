import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PadletListComponent } from './padlet-list/padlet-list.component';
import { PadletListItemComponent } from './padlet-list-item/padlet-list-item.component';
import { PadletDetailsComponent } from './padlet-details/padlet-details.component';
import { EntrieActionsComponent } from './entrie-actions/entrie-actions.component';

import { BrowserModule } from '@angular/platform-browser';
import { PadletService } from "./shared/padlet.service";
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { PadletActionsComponent } from './padlet-actions/padlet-actions.component';
import { LoginComponent } from './login/login.component';
import {AuthenticationService} from "./shared/authentication.service";
import {EntrieService} from "./shared/entrie.service";
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import {JwtInterceptorService} from "./shared/jwt-interceptor.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { CommentsRatingsComponent } from './comments-ratings/comments-ratings.component';

@NgModule({
  declarations: [
    AppComponent,
    PadletListComponent,
    PadletListItemComponent,
    PadletDetailsComponent,
    HomeComponent,
    EntrieActionsComponent,
    PadletActionsComponent,
    LoginComponent,
    CommentsRatingsComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, ToastrModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [PadletService, EntrieService, AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
