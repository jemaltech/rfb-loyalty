import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RfbLocation } from 'app/shared/model/rfb-location.model';
import { RfbLocationService } from './rfb-location.service';
import { RfbLocationComponent } from './rfb-location.component';
import { RfbLocationDetailComponent } from './rfb-location-detail.component';
import { RfbLocationUpdateComponent } from './rfb-location-update.component';
import { RfbLocationDeletePopupComponent } from './rfb-location-delete-dialog.component';
import { IRfbLocation } from 'app/shared/model/rfb-location.model';

@Injectable({ providedIn: 'root' })
export class RfbLocationResolve implements Resolve<IRfbLocation> {
  constructor(private service: RfbLocationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRfbLocation> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<RfbLocation>) => response.ok),
        map((rfbLocation: HttpResponse<RfbLocation>) => rfbLocation.body)
      );
    }
    return of(new RfbLocation());
  }
}

export const rfbLocationRoute: Routes = [
  {
    path: '',
    component: RfbLocationComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'RfbLocations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RfbLocationDetailComponent,
    resolve: {
      rfbLocation: RfbLocationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfbLocations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RfbLocationUpdateComponent,
    resolve: {
      rfbLocation: RfbLocationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfbLocations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RfbLocationUpdateComponent,
    resolve: {
      rfbLocation: RfbLocationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfbLocations'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const rfbLocationPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RfbLocationDeletePopupComponent,
    resolve: {
      rfbLocation: RfbLocationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfbLocations'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
