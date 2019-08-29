import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRfbLocation } from 'app/shared/model/rfb-location.model';
import { RfbLocationService } from './rfb-location.service';

@Component({
  selector: 'jhi-rfb-location-delete-dialog',
  templateUrl: './rfb-location-delete-dialog.component.html'
})
export class RfbLocationDeleteDialogComponent {
  rfbLocation: IRfbLocation;

  constructor(
    protected rfbLocationService: RfbLocationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.rfbLocationService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'rfbLocationListModification',
        content: 'Deleted an rfbLocation'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-rfb-location-delete-popup',
  template: ''
})
export class RfbLocationDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ rfbLocation }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(RfbLocationDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.rfbLocation = rfbLocation;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/rfb-location', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/rfb-location', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
