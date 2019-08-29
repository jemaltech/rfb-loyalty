import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRfbUser } from 'app/shared/model/rfb-user.model';

@Component({
  selector: 'jhi-rfb-user-detail',
  templateUrl: './rfb-user-detail.component.html'
})
export class RfbUserDetailComponent implements OnInit {
  rfbUser: IRfbUser;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ rfbUser }) => {
      this.rfbUser = rfbUser;
    });
  }

  previousState() {
    window.history.back();
  }
}
