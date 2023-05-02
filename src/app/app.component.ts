import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';

export interface fPairs {
  score: number;
  value: number;
  valueRel: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  myForm: FormGroup;

  fPairs: Array<fPairs> = [
    { score: 0, value: 0, valueRel: 0 },
    { score: 0, value: 0, valueRel: 0 },
    { score: 0, value: 0, valueRel: 0 },
    { score: 0, value: 0, valueRel: 0 },
  ];

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      date: ['', Validators.required],
      pairs: this.fb.array(
        this.fPairs.map((f) =>
          this.fb.group({
            score: [f.score],
            value: [f.value],
            valueRel: [f.valueRel],
          })
        )
      ),
    });
  }

  get pairs() {
    return this.myForm.get('pairs') as FormArray;
  }

  resetField(fieldName) {
    this.pairs.controls.forEach((group) => group.get(fieldName).reset());
  }

  resetPairs() {
    this.pairs.clear();
  }

  setData() {
    this.pairs.push(
      this.fb.group({
        score: 0,
        value: 0,
        valueRel: 0,
      })
    );
  }
}
