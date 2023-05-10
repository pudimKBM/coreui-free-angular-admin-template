import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chart-form',
  templateUrl: './chart-form.component.html',
  styleUrls: ['./chart-form.component.scss']
})
export class ChartFormComponent {
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  requestForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.requestForm = this.formBuilder.group({
      date_range_start: [null, Validators.required],
      date_range_end: [null, Validators.required],
      time_start: [null, Validators.required],
      time_end: [null, Validators.required],
      week_day: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.requestForm.valid) {
      if (this.requestForm.valid) {
        const formData = {
          ...this.requestForm.value,
          week_day: parseInt(this.requestForm.value.week_day, 10)
        };
        this.submitForm.emit(formData);
      }
    }
  }
}
