import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

interface Post {
  date_range_start: Date;
  date_range_end: Date;
}

@Component({
  selector: 'app-chart-form',
  templateUrl: './chart-form.component.html',
  styleUrls: ['./chart-form.component.scss']
})
export class ChartFormComponent {
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  requestForm: FormGroup;
  post: Post = {
    date_range_start: new Date(Date.now()),
    date_range_end: new Date(Date.now())
  }

  constructor(private formBuilder: FormBuilder) {
    this.requestForm = this.formBuilder.group({
      date_range_start: [formatDate(this.post.date_range_start,'dd-MM-yyyy' , 'en'), Validators.required],
      date_range_end: [formatDate(this.post.date_range_end,'dd-MM-yyyy' , 'en'), Validators.required],
      time_start: [null, Validators.required],
      time_end: [null, Validators.required],
      week_day: [null, Validators.required],
      timeframe : [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.requestForm.valid) {
      if (this.requestForm.valid) {
        const formData = {
          ...this.requestForm.value,
          date_range_start: formatDate(this.requestForm.value.date_range_start,'dd-MM-yyyy' , 'en'),
          date_range_end: formatDate(this.requestForm.value.date_range_end,'dd-MM-yyyy' , 'en'),
          week_day: parseInt(this.requestForm.value.week_day, 10)
        };
        this.submitForm.emit(formData);
      }
    }
  }
}
