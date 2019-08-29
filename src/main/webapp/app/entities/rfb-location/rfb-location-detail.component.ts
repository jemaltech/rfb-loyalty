import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRfbLocation } from 'app/shared/model/rfb-location.model';

@Component({
  selector: 'jhi-rfb-location-detail',
  templateUrl: './rfb-location-detail.component.html'
})
export class RfbLocationDetailComponent implements OnInit {
  rfbLocation: IRfbLocation;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ rfbLocation }) => {
      this.rfbLocation = rfbLocation;
    });
  }

  previousState() {
    window.history.back();
  }
}
