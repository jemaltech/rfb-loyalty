/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { RfbloyaltyTestModule } from '../../../test.module';
import { RfbEventUpdateComponent } from 'app/entities/rfb-event/rfb-event-update.component';
import { RfbEventService } from 'app/entities/rfb-event/rfb-event.service';
import { RfbEvent } from 'app/shared/model/rfb-event.model';

describe('Component Tests', () => {
  describe('RfbEvent Management Update Component', () => {
    let comp: RfbEventUpdateComponent;
    let fixture: ComponentFixture<RfbEventUpdateComponent>;
    let service: RfbEventService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RfbloyaltyTestModule],
        declarations: [RfbEventUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RfbEventUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RfbEventUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RfbEventService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RfbEvent(123);
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
        const entity = new RfbEvent();
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
