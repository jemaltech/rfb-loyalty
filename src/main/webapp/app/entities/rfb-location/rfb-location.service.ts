import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRfbLocation } from 'app/shared/model/rfb-location.model';

type EntityResponseType = HttpResponse<IRfbLocation>;
type EntityArrayResponseType = HttpResponse<IRfbLocation[]>;

@Injectable({ providedIn: 'root' })
export class RfbLocationService {
  public resourceUrl = SERVER_API_URL + 'api/rfb-locations';

  constructor(protected http: HttpClient) {}

  create(rfbLocation: IRfbLocation): Observable<EntityResponseType> {
    return this.http.post<IRfbLocation>(this.resourceUrl, rfbLocation, { observe: 'response' });
  }

  update(rfbLocation: IRfbLocation): Observable<EntityResponseType> {
    return this.http.put<IRfbLocation>(this.resourceUrl, rfbLocation, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRfbLocation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRfbLocation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
