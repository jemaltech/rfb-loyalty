import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RfbUser } from 'app/shared/model/rfb-user.model';
import { RfbUserService } from './rfb-user.service';
import { RfbUserComponent } from './rfb-user.component';
import { RfbUserDetailComponent } from './rfb-user-detail.component';
import { RfbUserUpdateComponent } from './rfb-user-update.component';
import { RfbUserDeletePopupComponent } from './rfb-user-delete-dialog.component';
import { IRfbUser } from 'app/shared/model/rfb-user.model';

@Injectable({ providedIn: 'root' })
export class RfbUserResolve implements Resolve<IRfbUser> {
  constructor(private service: RfbUserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRfbUser> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<RfbUser>) => response.ok),
        map((rfbUser: HttpResponse<RfbUser>) => rfbUser.body)
      );
    }
    return of(new RfbUser());
  }
}

export const rfbUserRoute: Routes = [
  {
    path: '',
    component: RfbUserComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfbUsers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RfbUserDetailComponent,
    resolve: {
      rfbUser: RfbUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfbUsers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RfbUserUpdateComponent,
    resolve: {
      rfbUser: RfbUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfbUsers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RfbUserUpdateComponent,
    resolve: {
      rfbUser: RfbUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfbUsers'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const rfbUserPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RfbUserDeletePopupComponent,
    resolve: {
      rfbUser: RfbUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfbUsers'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
