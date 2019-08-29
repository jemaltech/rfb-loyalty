import { NgModule } from '@angular/core';

import { RfbloyaltySharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [RfbloyaltySharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [RfbloyaltySharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class RfbloyaltySharedCommonModule {}
