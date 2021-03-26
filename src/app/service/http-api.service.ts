import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  constructor(public http: HttpClient) { }

  login(reqObj): Observable<HttpResponse<Object>>{
    const finalUrl = 'http://localhost:3000/auth'
    return this.http.post<HttpResponse<Object>>(finalUrl, reqObj);
  }
}
