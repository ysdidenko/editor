import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Guid } from 'guid-typescript';
import { Question } from '../app.component';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss'],
})
export class EditQuestionComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public question: Question
  ) {
    this.form = this.fb.group({
      question: [question?.question],
      answer1: [question?.answers[0].text],
      answer2: [question?.answers[1].text],
      answer3: [question?.answers[2].text],
      answer4: [question?.answers[3].text],
      points: [question?.points],
      description: [question?.description],
      id: question?.id || Guid.raw(),
    });
  }

  getValue() {
    return this.form.value;
  }
}
