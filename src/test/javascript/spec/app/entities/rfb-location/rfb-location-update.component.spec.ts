/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { RfbloyaltyTestModule } from '../../../test.module';
import { RfbLocationUpdateComponent } from 'app/entities/rfb-location/rfb-location-update.component';
import { RfbLocationService } from 'app/entities/rfb-location/rfb-location.service';
import { RfbLocation } from 'app/shared/model/rfb-location.model';

describe('Component Tests', () => {
  describe('RfbLocation Management Update Component', () => {
    let comp: RfbLocationUpdateComponent;
    let fixture: ComponentFixture<RfbLocationUpdateComponent>;
    let service: RfbLocationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RfbloyaltyTestModule],
        declarations: [RfbLocationUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RfbLocationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RfbLocationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RfbLocationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RfbLocation(123);
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
        const entity = new RfbLocation();
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
