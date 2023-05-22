import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pinpoint-form',
  templateUrl: './pinpoint-form.component.html',
  styleUrls: ['./pinpoint-form.component.scss']
})
export class PinpointFormComponent {
  @Input() pinpoint_input_data: any;
  pinpointForm: FormGroup;
  pinpointRequest: any={};

  constructor(private formBuilder: FormBuilder, private http: HttpClient ) {
    this.pinpointForm = this.formBuilder.group({
      pinpoint_name: ['', Validators.required] // Add the pinpoint_name form control
    });
  }

  onSubmit(): void {

    
    this.pinpointRequest ={
      "name": this.pinpointForm.value.pinpoint_name,
      "time_start": this.pinpoint_input_data.time_start,
      "time_end": this.pinpoint_input_data.time_end,
      "timeframe": this.pinpoint_input_data.timeframe,
      "days": this.pinpoint_input_data.days
    }
      
    
    console.log('Form submitted');
    console.log(this.pinpointRequest);
   
    this.http.post<any>('http://127.0.0.1:8000/pinpoint', this.pinpointRequest)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
