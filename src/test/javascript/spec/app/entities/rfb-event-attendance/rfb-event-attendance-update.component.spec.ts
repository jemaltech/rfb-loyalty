/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { RfbloyaltyTestModule } from '../../../test.module';
import { RfbEventAttendanceUpdateComponent } from 'app/entities/rfb-event-attendance/rfb-event-attendance-update.component';
import { RfbEventAttendanceService } from 'app/entities/rfb-event-attendance/rfb-event-attendance.service';
import { RfbEventAttendance } from 'app/shared/model/rfb-event-attendance.model';

describe('Component Tests', () => {
  describe('RfbEventAttendance Management Update Component', () => {
    let comp: RfbEventAttendanceUpdateComponent;
    let fixture: ComponentFixture<RfbEventAttendanceUpdateComponent>;
    let service: RfbEventAttendanceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RfbloyaltyTestModule],
        declarations: [RfbEventAttendanceUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RfbEventAttendanceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RfbEventAttendanceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RfbEventAttendanceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RfbEventAttendance(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new RfbEventAttendance();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
