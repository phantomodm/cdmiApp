import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-sort-table',
  templateUrl: './sort-table.component.html',
  styleUrls: ['./sort-table.component.scss']
})
export class SortTableComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @Input() clientData: any;
  @Input('columns') displayedColumns: string[] = [];
  @Output()changedColumns: EventEmitter<any>;
  dataSource : MatTableDataSource<any>;
  initialSelection = [];
  allowMultipleSelection = true;
  selection: SelectionModel<any>;

  constructor(private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.clientData)
    this.selection = new SelectionModel<any>(this.allowMultipleSelection, this.initialSelection);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort){
    if(sortState.direction){
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  viewClientDetails(row){
    console.log(row)
  }

}
