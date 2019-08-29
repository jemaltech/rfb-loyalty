import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRfbEvent } from 'app/shared/model/rfb-event.model';

type EntityResponseType = HttpResponse<IRfbEvent>;
type EntityArrayResponseType = HttpResponse<IRfbEvent[]>;

@Injectable({ providedIn: 'root' })
export class RfbEventService {
  public resourceUrl = SERVER_API_URL + 'api/rfb-events';

  constructor(protected http: HttpClient) {}

  create(rfbEvent: IRfbEvent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(rfbEvent);
    return this.http
      .post<IRfbEvent>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(rfbEvent: IRfbEvent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(rfbEvent);
    return this.http
      .put<IRfbEvent>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRfbEvent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRfbEvent[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(rfbEvent: IRfbEvent): IRfbEvent {
    const copy: IRfbEvent = Object.assign({}, rfbEvent, {
      eventDate: rfbEvent.eventDate != null && rfbEvent.eventDate.isValid() ? rfbEvent.eventDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.eventDate = res.body.eventDate != null ? moment(res.body.eventDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((rfbEvent: IRfbEvent) => {
        rfbEvent.eventDate = rfbEvent.eventDate != null ? moment(rfbEvent.eventDate) : null;
      });
    }
    return res;
  }
}
