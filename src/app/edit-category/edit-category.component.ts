import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Guid } from 'guid-typescript';
import { Category } from '../app.component';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent {
  categoryName: FormControl;
  categoryIcon: FormControl;

  constructor(@Inject(MAT_DIALOG_DATA) public category: Category) {
    this.categoryName = new FormControl(category?.name);
    this.categoryIcon = new FormControl(category?.icon);
  }

  getValue() {
    return {
      name: this.categoryName.value,
      icon: this.categoryIcon.value,
      id: this.category?.id || Guid.raw(),
    };
  }
}
