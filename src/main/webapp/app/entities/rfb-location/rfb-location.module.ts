import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RfbloyaltySharedModule } from '../../shared';
import {
    RfbLocationService,
    RfbLocationPopupService,
    RfbLocationComponent,
    RfbLocationDetailComponent,
    RfbLocationDialogComponent,
    RfbLocationPopupComponent,
    RfbLocationDeletePopupComponent,
    RfbLocationDeleteDialogComponent,
    rfbLocationRoute,
    rfbLocationPopupRoute,
    RfbLocationResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...rfbLocationRoute,
    ...rfbLocationPopupRoute,
];

@NgModule({
    imports: [
        RfbloyaltySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        RfbLocationComponent,
        RfbLocationDetailComponent,
        RfbLocationDialogComponent,
        RfbLocationDeleteDialogComponent,
        RfbLocationPopupComponent,
        RfbLocationDeletePopupComponent,
    ],
    entryComponents: [
        RfbLocationComponent,
        RfbLocationDialogComponent,
        RfbLocationPopupComponent,
        RfbLocationDeleteDialogComponent,
        RfbLocationDeletePopupComponent,
    ],
    providers: [
        RfbLocationService,
        RfbLocationPopupService,
        RfbLocationResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RfbloyaltyRfbLocationModule {}
