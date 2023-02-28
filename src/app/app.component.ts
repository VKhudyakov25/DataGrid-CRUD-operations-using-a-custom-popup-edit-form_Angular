import {
  Component,
  QueryList,
  ViewChild,
  ViewChildren,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Employee, AppService } from './app.service';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { DxPopupComponent, DxTextBoxComponent } from 'devextreme-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService],
})
export class AppComponent {
  @ViewChild(DxPopupComponent) popup: DxPopupComponent;
  @ViewChildren(DxTextBoxComponent)
  textboxElements!: QueryList<DxTextBoxComponent>;
  store: ArrayStore;
  dataSource: DataSource;
  event: any;
  content: any;

  constructor(service: AppService) {
    this.editEvent = this.editEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.store = new ArrayStore({
      key: 'ID',
      data: service.getEmployees(),
    });
    this.dataSource = new DataSource({
      store: this.store,
    });
  }

  editEvent(e: any) {
    this.event = e;
    this.content = e.row.data;
    this.popup.instance.show();
  }

  deleteEvent(e: any) {
    this.store.remove(e.row.key);
    this.dataSource.reload();
  }

  addEvent(e: any) {
    this.event = e;
    this.content = new Employee();
    this.popup.instance.show();
  }

  saveEvent(e: any) {
    let nextId;
    !!this.dataSource.items().length
      ? (nextId =
          Math.max.apply(
            Math,
            this.dataSource.items().map(function (c) {
              return c.ID;
            }) || 1
          ) + 1)
      : (nextId = 1);
    let diffs: any = {};
    this.textboxElements.map((item) => {
      diffs[item.name] = item.value;
      item.value = '';
    });
    this.event.row
      ? this.store.update(this.event.row.key, diffs)
      : this.store.insert({ ID: nextId, ...diffs });
    this.dataSource.reload();
    this.popup.instance.hide();
  }

  cancelEvent(e: any) {
    this.popup.instance.hide();
  }
}
