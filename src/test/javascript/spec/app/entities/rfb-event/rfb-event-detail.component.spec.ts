/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RfbloyaltyTestModule } from '../../../test.module';
import { RfbEventDetailComponent } from 'app/entities/rfb-event/rfb-event-detail.component';
import { RfbEvent } from 'app/shared/model/rfb-event.model';

describe('Component Tests', () => {
  describe('RfbEvent Management Detail Component', () => {
    let comp: RfbEventDetailComponent;
    let fixture: ComponentFixture<RfbEventDetailComponent>;
    const route = ({ data: of({ rfbEvent: new RfbEvent(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RfbloyaltyTestModule],
        declarations: [RfbEventDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RfbEventDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RfbEventDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.rfbEvent).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
