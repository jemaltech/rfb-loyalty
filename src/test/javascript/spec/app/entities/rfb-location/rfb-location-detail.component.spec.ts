/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RfbloyaltyTestModule } from '../../../test.module';
import { RfbLocationDetailComponent } from 'app/entities/rfb-location/rfb-location-detail.component';
import { RfbLocation } from 'app/shared/model/rfb-location.model';

describe('Component Tests', () => {
  describe('RfbLocation Management Detail Component', () => {
    let comp: RfbLocationDetailComponent;
    let fixture: ComponentFixture<RfbLocationDetailComponent>;
    const route = ({ data: of({ rfbLocation: new RfbLocation(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RfbloyaltyTestModule],
        declarations: [RfbLocationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RfbLocationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RfbLocationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.rfbLocation).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
