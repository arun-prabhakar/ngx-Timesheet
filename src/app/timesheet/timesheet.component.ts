import { Component, OnInit } from '@angular/core';

import {FormControl, Validators, NgForm, NgModel} from '@angular/forms';

import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as _moment from 'moment';
/*import {default as _rollupMoment} from 'moment';
const moment = _rollupMoment || _moment;*/
const moment = _moment;

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css'],
  animations:[
    trigger('animateArea', [
      transition('* => *', [
        query(':enter', style({opacity:0}), {optional:true}),

        query(':enter', stagger('300ms',[
          animate('.6s ease-in', keyframes([
            style({opacity:0, transform:'translateY(-75%)', offset:0}),
            style({opacity:.5, transform:'translateY(35px)', offset:.3}),
            style({opacity:1, transform:'translateY(0)', offset:1}),
          ]))
        ]), {optional:true}),

        query(':leave', stagger('300ms',[
          animate('.6s ease-in', keyframes([
            style({opacity:1, transform:'translateY(0)', offset:0}),
            style({opacity:.5, transform:'translateY(35px)', offset:.3}),
            style({opacity:0, transform:'translateY(-75%)', offset:1}),
          ]))
        ]), {optional:true})
      ])

    ])

  ]
})
export class TimesheetComponent implements OnInit {
  
  activities:any[];
  project_activities:any[];

  //date = new FormControl(moment([2017, 0, 1]));
  date = new FormControl(new Date());
  taskDate = new FormControl(new Date());
  d: Date = new Date();
  hh = this.d.getHours();
  min = this.d.getMinutes();
  startTime = this.hh + ":" + this.min;
  endTime = this.hh + ":" + this.min;
  calcTime = this.startTime + ' - ' + this.endTime;

  isMeridian = false;

  constructor(private route:ActivatedRoute, private router: Router, private _data: DataService) {
    this.activities = [
      {value: '1', viewValue: 'Meeting'},
      {value: '2', viewValue: 'Demo'},
      {value: '3', viewValue: 'Development'},
      {value: '4', viewValue: 'Testing'},
      {value: '5', viewValue: 'Documentation'},
      {value: '6', viewValue: 'Functional Analysis'},
      {value: '7', viewValue: 'Technical Analysis'},
      {value: '8', viewValue: 'DB Design'},
      {value: '9', viewValue: 'Analysis'},
      {value: '10', viewValue: 'Training'},
      {value: '11', viewValue: 'Infra'},
      {value: '12', viewValue: 'Othes'}
    ];

    this.project_activities = [
      {value: '1', viewValue: 'CCM RE'},
      {value: '2', viewValue: 'EHR Interface'},
      {value: '3', viewValue: 'EHR Lite'},
      {value: '4', viewValue: 'AI'},
      {value: '5', viewValue: 'Others'}
    ];
   }

  
  menuNav = [
    {icon: 'timelapse', name: 'Time Sheet', link:'timesheet'},
    {icon: 'insert_chart', name: 'Reports', link:'reports'},
    {icon: 'face', name: 'Users', link:'users'},
    {icon: 'layers', name: 'Projects', link:'projects'}
  ];
  loginUsername : string = 'Arun Prabhakar';



  itemCount: number;
  //goalText: string = 'My First Projects Qunatify'; 
  goals = [];
  isOpen : boolean = false;
  
  selected_Activity = '';
  selected_project_activities = '';
  notes = this.notes;

  ngOnInit() {
    this._data.goal.subscribe(res => this.goals = res);
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }
  addTask() {
    //alert(this.selected_Activity + ' : ' + this.selected_project_activities + ' : ' + this.notes);
    this.goals.push(this.selected_Activity + ' : ' + this.selected_project_activities + ' : ' + this.notes);

    this.selected_Activity = '';
    this.selected_project_activities = '';
    this.notes = '';

    this.isOpen = false;
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }
  clearTask() {
    this.selected_Activity = '';
    this.selected_project_activities = '';
    this.notes = '';
    this.isOpen = false;
  }
  removeItem(i)
  {
    this.goals.splice(i,1); 
    this._data.changeGoal(this.goals);
  }

    
}
