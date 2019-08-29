import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRfbEvent } from 'app/shared/model/rfb-event.model';
import { RfbEventService } from './rfb-event.service';

@Component({
  selector: 'jhi-rfb-event-delete-dialog',
  templateUrl: './rfb-event-delete-dialog.component.html'
})
export class RfbEventDeleteDialogComponent {
  rfbEvent: IRfbEvent;

  constructor(protected rfbEventService: RfbEventService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.rfbEventService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'rfbEventListModification',
        content: 'Deleted an rfbEvent'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-rfb-event-delete-popup',
  template: ''
})
export class RfbEventDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ rfbEvent }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(RfbEventDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.rfbEvent = rfbEvent;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/rfb-event', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/rfb-event', { outlets: { popup: null } }]);
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
