import { Injectable } from '@angular/core';
import { Button } from '../shared/button';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class ButtonService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getButtons(): Observable<Button[]> {

    return this.http.get<Button[]>(baseURL+'buttons')
      .pipe(catchError(this.processHTTPMsgService.handleError));
      
  }

  
}