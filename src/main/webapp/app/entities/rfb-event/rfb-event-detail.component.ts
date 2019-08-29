import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRfbEvent } from 'app/shared/model/rfb-event.model';

@Component({
  selector: 'jhi-rfb-event-detail',
  templateUrl: './rfb-event-detail.component.html'
})
export class RfbEventDetailComponent implements OnInit {
  rfbEvent: IRfbEvent;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ rfbEvent }) => {
      this.rfbEvent = rfbEvent;
    });
  }

  previousState() {
    window.history.back();
  }
}
