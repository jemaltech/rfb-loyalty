import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RfbloyaltySharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [RfbloyaltySharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [RfbloyaltySharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RfbloyaltySharedModule {
  static forRoot() {
    return {
      ngModule: RfbloyaltySharedModule
    };
  }
}
