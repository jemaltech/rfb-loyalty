import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRfbEventAttendance } from 'app/shared/model/rfb-event-attendance.model';

@Component({
  selector: 'jhi-rfb-event-attendance-detail',
  templateUrl: './rfb-event-attendance-detail.component.html'
})
export class RfbEventAttendanceDetailComponent implements OnInit {
  rfbEventAttendance: IRfbEventAttendance;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ rfbEventAttendance }) => {
      this.rfbEventAttendance = rfbEventAttendance;
    });
  }

  previousState() {
    window.history.back();
  }
}
