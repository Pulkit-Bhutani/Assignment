import { Injectable } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { News, Obj } from 'src/resources/news';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private pageUrl: string;

  constructor(
    private readonly configurationService: ConfigurationService,
    private readonly http: HttpClient,
    ) {
      this.pageUrl = this.configurationService.endpoints.pageUrl;
    }

  getDataByPageNumber(pageNumber: number): Observable<Obj> {
    const param = { 'page': pageNumber.toString() }
    return this.http.get(this.pageUrl, { params: param })
    .pipe(catchError((e) => {
      return of(e);
    }))
    .pipe(map((res) => {
      let result = res as Obj;
      return result;
    }))
  }

}
