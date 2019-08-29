/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { RfbloyaltyTestModule } from '../../../test.module';
import { RfbLocationDeleteDialogComponent } from 'app/entities/rfb-location/rfb-location-delete-dialog.component';
import { RfbLocationService } from 'app/entities/rfb-location/rfb-location.service';

describe('Component Tests', () => {
  describe('RfbLocation Management Delete Component', () => {
    let comp: RfbLocationDeleteDialogComponent;
    let fixture: ComponentFixture<RfbLocationDeleteDialogComponent>;
    let service: RfbLocationService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RfbloyaltyTestModule],
        declarations: [RfbLocationDeleteDialogComponent]
      })
        .overrideTemplate(RfbLocationDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RfbLocationDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RfbLocationService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
