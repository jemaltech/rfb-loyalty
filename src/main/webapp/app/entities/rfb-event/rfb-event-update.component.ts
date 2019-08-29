import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IRfbEvent, RfbEvent } from 'app/shared/model/rfb-event.model';
import { RfbEventService } from './rfb-event.service';
import { IRfbLocation } from 'app/shared/model/rfb-location.model';
import { RfbLocationService } from 'app/entities/rfb-location';

@Component({
  selector: 'jhi-rfb-event-update',
  templateUrl: './rfb-event-update.component.html'
})
export class RfbEventUpdateComponent implements OnInit {
  isSaving: boolean;

  rfblocations: IRfbLocation[];
  eventDateDp: any;

  editForm = this.fb.group({
    id: [],
    eventDate: [],
    eventCode: [],
    rfbLocationId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected rfbEventService: RfbEventService,
    protected rfbLocationService: RfbLocationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ rfbEvent }) => {
      this.updateForm(rfbEvent);
    });
    this.rfbLocationService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IRfbLocation[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRfbLocation[]>) => response.body)
      )
      .subscribe((res: IRfbLocation[]) => (this.rfblocations = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(rfbEvent: IRfbEvent) {
    this.editForm.patchValue({
      id: rfbEvent.id,
      eventDate: rfbEvent.eventDate,
      eventCode: rfbEvent.eventCode,
      rfbLocationId: rfbEvent.rfbLocationId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const rfbEvent = this.createFromForm();
    if (rfbEvent.id !== undefined) {
      this.subscribeToSaveResponse(this.rfbEventService.update(rfbEvent));
    } else {
      this.subscribeToSaveResponse(this.rfbEventService.create(rfbEvent));
    }
  }

  private createFromForm(): IRfbEvent {
    return {
      ...new RfbEvent(),
      id: this.editForm.get(['id']).value,
      eventDate: this.editForm.get(['eventDate']).value,
      eventCode: this.editForm.get(['eventCode']).value,
      rfbLocationId: this.editForm.get(['rfbLocationId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRfbEvent>>) {
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
