import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Core from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { Schedule, ScheduleEvents } from 'src/app/models/schedule';

@Component({
  selector: 'cwl-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss'],
})
export class ScheduleCalendarComponent implements OnInit, OnChanges {
  @Input() events: ScheduleEvents = [];

  OPTIONS = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    defaultDate: this.parseDate(Date.now()),
    header: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    editable: false,
    locale: 'ru',
  };

  mappedEvents: ScheduleEvents;

  constructor() {
    const name = Core.Calendar.name;
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.mappedEvents = this.events.map((event: Schedule) => ({
      _id: event._id,
      title: event.title,
      daysOfWeek: event.daysOfWeek,
      startTime: this.parseTime(+event.startTime),
      endTime: this.parseTime(+event.endTime),
      startRecur: this.parseDate(+event.startRecur),
      endRecur: this.parseDate(+event.endRecur),
    }));
  }

  private parseTime(date: number): string {
    const [hours, minutes] = new Date(date).toTimeString().split(':');

    return `${hours}:${minutes}`;
  }

  private parseDate(date: number): string {
    const [day, month, year] = new Date(date).toLocaleDateString().split('.');

    return `${year}-${month}-${day}`;
  }
}
