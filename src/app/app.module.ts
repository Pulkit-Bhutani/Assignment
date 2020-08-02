import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from 'src/services/storage.service';
import { DataService } from 'src/services/data.service';
import { ConfigurationService } from 'src/services/configuration.service';
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { NewsComponent } from './news/news.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [ StorageService, DataService, ConfigurationService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
