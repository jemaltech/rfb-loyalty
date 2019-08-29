import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RfbEventAttendance } from 'app/shared/model/rfb-event-attendance.model';
import { RfbEventAttendanceService } from './rfb-event-attendance.service';
import { RfbEventAttendanceComponent } from './rfb-event-attendance.component';
import { RfbEventAttendanceDetailComponent } from './rfb-event-attendance-detail.component';
import { RfbEventAttendanceUpdateComponent } from './rfb-event-attendance-update.component';
import { RfbEventAttendanceDeletePopupComponent } from './rfb-event-attendance-delete-dialog.component';
import { IRfbEventAttendance } from 'app/shared/model/rfb-event-attendance.model';

@Injectable({ providedIn: 'root' })
export class RfbEventAttendanceResolve implements Resolve<IRfbEventAttendance> {
  constructor(private service: RfbEventAttendanceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRfbEventAttendance> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<RfbEventAttendance>) => response.ok),
        map((rfbEventAttendance: HttpResponse<RfbEventAttendance>) => rfbEventAttendance.body)
      );
    }
    return of(new RfbEventAttendance());
  }
}

export const rfbEventAttendanceRoute: Routes = [
  {
    path: '',
    component: RfbEventAttendanceComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfbEventAttendances'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RfbEventAttendanceDetailComponent,
    resolve: {
      rfbEventAttendance: RfbEventAttendanceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfbEventAttendances'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RfbEventAttendanceUpdateComponent,
    resolve: {
      rfbEventAttendance: RfbEventAttendanceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfbEventAttendances'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RfbEventAttendanceUpdateComponent,
    resolve: {
      rfbEventAttendance: RfbEventAttendanceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfbEventAttendances'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const rfbEventAttendancePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RfbEventAttendanceDeletePopupComponent,
    resolve: {
      rfbEventAttendance: RfbEventAttendanceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfbEventAttendances'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
