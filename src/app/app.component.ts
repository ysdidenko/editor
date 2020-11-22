import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Guid } from 'guid-typescript';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';

export interface Answer {
  text: string;
  correct: boolean;
}
export interface Question {
  id: string;
  question: string;
  answers: Answer[];
  points: number;
  description: string;
}
export interface Category {
  id: string;
  name: string;
  icon: string;
  questions: Question[];
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  categories: Category[];
  selectedFile: File;

  constructor(private dialog: MatDialog, private cd: ChangeDetectorRef) {}

  saveText(): void {
    const a = document.createElement('a');
    a.setAttribute(
      'href',
      'data:text/plain;charset=utf-u,' +
        encodeURIComponent(JSON.stringify(this.categories))
    );
    a.setAttribute('download', this.selectedFile.name);
    a.click();
  }

  uploadedFile(event): void {
    this.selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, 'UTF-8');
    fileReader.onload = () => {
      this.categories = JSON.parse(fileReader.result as string);
      this.cd.detectChanges();
    };
    fileReader.onerror = (error) => {
      console.log(error);
    };
  }

  editCategory(category?: Category): void {
    this.dialog
      .open(EditCategoryComponent, {
        data: category,
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          const target = this.categories.find((c) => c.id === data.id);
          if (target) {
            target.name = data.name;
            target.icon = data.icon;
          } else {
            this.categories.push({
              id: data.id,
              name: data.name,
              icon: data.icon,
              questions: [],
            });
          }
          this.cd.detectChanges();
        }
      });
  }

  editQuestion(category: Category, question?: Question): void {
    this.dialog
      .open(EditQuestionComponent, {
        data: question,
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          const target = category.questions.find((q) => q.id === data.id);
          if (target) {
            target.question = data.question;
            target.points = data.points;
            target.description = data.description;
            target.answers = [
              {
                text: data.answer1,
                correct: true,
              },
              {
                text: data.answer2,
                correct: false,
              },
              {
                text: data.answer3,
                correct: false,
              },
              {
                text: data.answer4,
                correct: false,
              },
            ];
          } else {
            category.questions = [
              ...category.questions,
              {
                id: data.id,
                question: data.question,
                points: data.points,
                description: data.description,
                answers: [
                  {
                    text: data.answer1,
                    correct: true,
                  },
                  {
                    text: data.answer2,
                    correct: false,
                  },
                  {
                    text: data.answer3,
                    correct: false,
                  },
                  {
                    text: data.answer4,
                    correct: false,
                  },
                ],
              },
            ];
          }
          this.cd.detectChanges();
        }
      });
  }

  deleteQuestion(category: Category, question: Question): void {
    category.questions = [...category.questions].filter(
      (q) => q.id !== question.id
    );
    this.cd.detectChanges();
  }
}
