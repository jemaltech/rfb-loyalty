import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IRfbUser, RfbUser } from 'app/shared/model/rfb-user.model';
import { RfbUserService } from './rfb-user.service';
import { IRfbLocation } from 'app/shared/model/rfb-location.model';
import { RfbLocationService } from 'app/entities/rfb-location';

@Component({
  selector: 'jhi-rfb-user-update',
  templateUrl: './rfb-user-update.component.html'
})
export class RfbUserUpdateComponent implements OnInit {
  isSaving: boolean;

  homelocations: IRfbLocation[];

  editForm = this.fb.group({
    id: [],
    username: [],
    homeLocationId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected rfbUserService: RfbUserService,
    protected rfbLocationService: RfbLocationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ rfbUser }) => {
      this.updateForm(rfbUser);
    });
    this.rfbLocationService
      .query({ filter: 'rfbuser-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IRfbLocation[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRfbLocation[]>) => response.body)
      )
      .subscribe(
        (res: IRfbLocation[]) => {
          if (!this.editForm.get('homeLocationId').value) {
            this.homelocations = res;
          } else {
            this.rfbLocationService
              .find(this.editForm.get('homeLocationId').value)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IRfbLocation>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IRfbLocation>) => subResponse.body)
              )
              .subscribe(
                (subRes: IRfbLocation) => (this.homelocations = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(rfbUser: IRfbUser) {
    this.editForm.patchValue({
      id: rfbUser.id,
      username: rfbUser.username,
      homeLocationId: rfbUser.homeLocationId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const rfbUser = this.createFromForm();
    if (rfbUser.id !== undefined) {
      this.subscribeToSaveResponse(this.rfbUserService.update(rfbUser));
    } else {
      this.subscribeToSaveResponse(this.rfbUserService.create(rfbUser));
    }
  }

  private createFromForm(): IRfbUser {
    return {
      ...new RfbUser(),
      id: this.editForm.get(['id']).value,
      username: this.editForm.get(['username']).value,
      homeLocationId: this.editForm.get(['homeLocationId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRfbUser>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackRfbLocationById(index: number, item: IRfbLocation) {
    return item.id;
  }
}
