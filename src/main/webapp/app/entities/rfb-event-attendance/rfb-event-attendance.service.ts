import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRfbEventAttendance } from 'app/shared/model/rfb-event-attendance.model';

type EntityResponseType = HttpResponse<IRfbEventAttendance>;
type EntityArrayResponseType = HttpResponse<IRfbEventAttendance[]>;

@Injectable({ providedIn: 'root' })
export class RfbEventAttendanceService {
  public resourceUrl = SERVER_API_URL + 'api/rfb-event-attendances';

  constructor(protected http: HttpClient) {}

  create(rfbEventAttendance: IRfbEventAttendance): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(rfbEventAttendance);
    return this.http
      .post<IRfbEventAttendance>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(rfbEventAttendance: IRfbEventAttendance): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(rfbEventAttendance);
    return this.http
      .put<IRfbEventAttendance>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRfbEventAttendance>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRfbEventAttendance[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(rfbEventAttendance: IRfbEventAttendance): IRfbEventAttendance {
    const copy: IRfbEventAttendance = Object.assign({}, rfbEventAttendance, {
      attendanceDate:
        rfbEventAttendance.attendanceDate != null && rfbEventAttendance.attendanceDate.isValid()
          ? rfbEventAttendance.attendanceDate.format(DATE_FORMAT)
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.attendanceDate = res.body.attendanceDate != null ? moment(res.body.attendanceDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((rfbEventAttendance: IRfbEventAttendance) => {
        rfbEventAttendance.attendanceDate = rfbEventAttendance.attendanceDate != null ? moment(rfbEventAttendance.attendanceDate) : null;
      });
    }
    return res;
  }
}
