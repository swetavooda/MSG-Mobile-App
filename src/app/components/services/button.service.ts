import { Injectable } from '@angular/core';
import { Button } from '../shared/button';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { ListPicker } from 'tns-core-modules/ui/list-picker';
import { AbstractClassPart } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class ButtonService {
  //ctype: string;
  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

    getButtons(crimetype): Observable<Button[]> {
      //ctype: string =toString(crimetype);
   console.log(baseURL+crimetype);
    return this.http.get<Button[]>(baseURL+crimetype.toString())
      .pipe(catchError(this.processHTTPMsgService.handleError));
      
  }

  
}