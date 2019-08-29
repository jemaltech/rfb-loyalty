import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRfbUser } from 'app/shared/model/rfb-user.model';

type EntityResponseType = HttpResponse<IRfbUser>;
type EntityArrayResponseType = HttpResponse<IRfbUser[]>;

@Injectable({ providedIn: 'root' })
export class RfbUserService {
  public resourceUrl = SERVER_API_URL + 'api/rfb-users';

  constructor(protected http: HttpClient) {}

  create(rfbUser: IRfbUser): Observable<EntityResponseType> {
    return this.http.post<IRfbUser>(this.resourceUrl, rfbUser, { observe: 'response' });
  }

  update(rfbUser: IRfbUser): Observable<EntityResponseType> {
    return this.http.put<IRfbUser>(this.resourceUrl, rfbUser, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRfbUser>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRfbUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
