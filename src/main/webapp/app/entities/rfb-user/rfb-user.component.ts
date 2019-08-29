import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRfbUser } from 'app/shared/model/rfb-user.model';
import { AccountService } from 'app/core';
import { RfbUserService } from './rfb-user.service';

@Component({
  selector: 'jhi-rfb-user',
  templateUrl: './rfb-user.component.html'
})
export class RfbUserComponent implements OnInit, OnDestroy {
  rfbUsers: IRfbUser[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected rfbUserService: RfbUserService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.rfbUserService
      .query()
      .pipe(
        filter((res: HttpResponse<IRfbUser[]>) => res.ok),
        map((res: HttpResponse<IRfbUser[]>) => res.body)
      )
      .subscribe(
        (res: IRfbUser[]) => {
          this.rfbUsers = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInRfbUsers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRfbUser) {
    return item.id;
  }

  registerChangeInRfbUsers() {
    this.eventSubscriber = this.eventManager.subscribe('rfbUserListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
