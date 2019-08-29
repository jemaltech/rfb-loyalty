import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'rfb-location',
        loadChildren: () => import('./rfb-location/rfb-location.module').then(m => m.RfbloyaltyRfbLocationModule)
      },
      {
        path: 'rfb-event',
        loadChildren: () => import('./rfb-event/rfb-event.module').then(m => m.RfbloyaltyRfbEventModule)
      },
      {
        path: 'rfb-event-attendance',
        loadChildren: () => import('./rfb-event-attendance/rfb-event-attendance.module').then(m => m.RfbloyaltyRfbEventAttendanceModule)
      },
      {
        path: 'rfb-user',
        loadChildren: () => import('./rfb-user/rfb-user.module').then(m => m.RfbloyaltyRfbUserModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RfbloyaltyEntityModule {}
