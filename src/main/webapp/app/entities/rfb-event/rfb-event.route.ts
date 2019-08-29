import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RfbEvent } from 'app/shared/model/rfb-event.model';
import { RfbEventService } from './rfb-event.service';
import { RfbEventComponent } from './rfb-event.component';
import { RfbEventDetailComponent } from './rfb-event-detail.component';
import { RfbEventUpdateComponent } from './rfb-event-update.component';
import { RfbEventDeletePopupComponent } from './rfb-event-delete-dialog.component';
import { IRfbEvent } from 'app/shared/model/rfb-event.model';

@Injectable({ providedIn: 'root' })
export class RfbEventResolve implements Resolve<IRfbEvent> {
  constructor(private service: RfbEventService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRfbEvent> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<RfbEvent>) => response.ok),
        map((rfbEvent: HttpResponse<RfbEvent>) => rfbEvent.body)
      );
    }
    return of(new RfbEvent());
  }
}

export const rfbEventRoute: Routes = [
  {
    path: '',
    component: RfbEventComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'RfbEvents'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RfbEventDetailComponent,
    resolve: {
      rfbEvent: RfbEventResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfbEvents'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RfbEventUpdateComponent,
    resolve: {
      rfbEvent: RfbEventResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfbEvents'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RfbEventUpdateComponent,
    resolve: {
      rfbEvent: RfbEventResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfbEvents'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const rfbEventPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RfbEventDeletePopupComponent,
    resolve: {
      rfbEvent: RfbEventResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfbEvents'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
