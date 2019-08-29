import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRfbUser } from 'app/shared/model/rfb-user.model';
import { RfbUserService } from './rfb-user.service';

@Component({
  selector: 'jhi-rfb-user-delete-dialog',
  templateUrl: './rfb-user-delete-dialog.component.html'
})
export class RfbUserDeleteDialogComponent {
  rfbUser: IRfbUser;

  constructor(protected rfbUserService: RfbUserService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.rfbUserService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'rfbUserListModification',
        content: 'Deleted an rfbUser'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-rfb-user-delete-popup',
  template: ''
})
export class RfbUserDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ rfbUser }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(RfbUserDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.rfbUser = rfbUser;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/rfb-user', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/rfb-user', { outlets: { popup: null } }]);
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
