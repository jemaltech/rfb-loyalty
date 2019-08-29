import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IRfbLocation, RfbLocation } from 'app/shared/model/rfb-location.model';
import { RfbLocationService } from './rfb-location.service';

@Component({
  selector: 'jhi-rfb-location-update',
  templateUrl: './rfb-location-update.component.html'
})
export class RfbLocationUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    locationName: [],
    runDayOfWeek: []
  });

  constructor(protected rfbLocationService: RfbLocationService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ rfbLocation }) => {
      this.updateForm(rfbLocation);
    });
  }

  updateForm(rfbLocation: IRfbLocation) {
    this.editForm.patchValue({
      id: rfbLocation.id,
      locationName: rfbLocation.locationName,
      runDayOfWeek: rfbLocation.runDayOfWeek
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const rfbLocation = this.createFromForm();
    if (rfbLocation.id !== undefined) {
      this.subscribeToSaveResponse(this.rfbLocationService.update(rfbLocation));
    } else {
      this.subscribeToSaveResponse(this.rfbLocationService.create(rfbLocation));
    }
  }

  private createFromForm(): IRfbLocation {
    return {
      ...new RfbLocation(),
      id: this.editForm.get(['id']).value,
      locationName: this.editForm.get(['locationName']).value,
      runDayOfWeek: this.editForm.get(['runDayOfWeek']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRfbLocation>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
