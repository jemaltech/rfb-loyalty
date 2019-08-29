/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RfbloyaltyTestModule } from '../../../test.module';
import { RfbEventAttendanceDetailComponent } from 'app/entities/rfb-event-attendance/rfb-event-attendance-detail.component';
import { RfbEventAttendance } from 'app/shared/model/rfb-event-attendance.model';

describe('Component Tests', () => {
  describe('RfbEventAttendance Management Detail Component', () => {
    let comp: RfbEventAttendanceDetailComponent;
    let fixture: ComponentFixture<RfbEventAttendanceDetailComponent>;
    const route = ({ data: of({ rfbEventAttendance: new RfbEventAttendance(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RfbloyaltyTestModule],
        declarations: [RfbEventAttendanceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RfbEventAttendanceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RfbEventAttendanceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.rfbEventAttendance).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
