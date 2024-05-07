import { Component } from '@angular/core';

@Component({
  selector: 'app-inline-calender',
  templateUrl: './inline-calender.component.html',
  styleUrls: ['./inline-calender.component.css']
})
export class InlineCalenderComponent {
  selected: Date | null = new Date();


}
