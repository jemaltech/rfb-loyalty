import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RfbloyaltySharedModule } from 'app/shared';
import {
  RfbEventAttendanceComponent,
  RfbEventAttendanceDetailComponent,
  RfbEventAttendanceUpdateComponent,
  RfbEventAttendanceDeletePopupComponent,
  RfbEventAttendanceDeleteDialogComponent,
  rfbEventAttendanceRoute,
  rfbEventAttendancePopupRoute
} from './';

const ENTITY_STATES = [...rfbEventAttendanceRoute, ...rfbEventAttendancePopupRoute];

@NgModule({
  imports: [RfbloyaltySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    RfbEventAttendanceComponent,
    RfbEventAttendanceDetailComponent,
    RfbEventAttendanceUpdateComponent,
    RfbEventAttendanceDeleteDialogComponent,
    RfbEventAttendanceDeletePopupComponent
  ],
  entryComponents: [
    RfbEventAttendanceComponent,
    RfbEventAttendanceUpdateComponent,
    RfbEventAttendanceDeleteDialogComponent,
    RfbEventAttendanceDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RfbloyaltyRfbEventAttendanceModule {}
