import { DxTextBoxComponent, DxPopupComponent } from 'devextreme-angular';
import {
  Component,
  Input,
  QueryList,
  ViewChildren,
  ViewChild,
} from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';

@Component({
  selector: 'app-popup-content',
  templateUrl: './popup-content.component.html',
  styleUrls: ['./popup-content.component.css'],
})
export class PopupContentComponent {
  @Input() content!: any;
  @Input() dataSource: DataSource;
  @Input() event: any;
  @Input() store: ArrayStore;
  @ViewChildren(DxTextBoxComponent)
  textboxElements!: QueryList<DxTextBoxComponent>;
  @ViewChild(DxPopupComponent) popup: DxPopupComponent;

  saveEvent(e: any) {
    let nextId;
    !!this.dataSource.items().length
      ? (nextId =
          Math.max.apply(
            Math,
            this.dataSource.items().map(function (c: any) {
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
