import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Question } from '../app.component';

@Component({
  selector: 'app-questions-table',
  templateUrl: './questions-table.component.html',
  styleUrls: ['./questions-table.component.scss'],
})
export class QuestionsTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() set questions(val: Question[]) {
    this.dataSource.data = val;
  }
  @Output() editQuestion = new EventEmitter<Question>();
  @Output() deleteQuestion = new EventEmitter<Question>();
  dataSource: MatTableDataSource<Question> = new MatTableDataSource();

  constructor(private _snackBar: MatSnackBar) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  showToast() {
    this._snackBar.open('Copied to clipboard', 'OK', {
      duration: 1000,
    });
  }
}
