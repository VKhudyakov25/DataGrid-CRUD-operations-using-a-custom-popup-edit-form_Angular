import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppService } from './app.service';

import {
  DxButtonModule,
  DxDataGridModule,
  DxPopupModule,
  DxTextBoxModule,
} from 'devextreme-angular';
import { PopupContentComponent } from './popup-content/popup-content.component';

@NgModule({
  declarations: [AppComponent, PopupContentComponent],
  imports: [
    BrowserModule,
    DxDataGridModule,
    DxPopupModule,
    DxButtonModule,
    DxTextBoxModule,
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
