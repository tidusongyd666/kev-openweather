import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL = 'https://api-kev-weather-ae66.azurewebsites.net/api/v1';
  private x_clientId_no_limit = 'cl-key-no-limit';
  private x_clientId_rate_limit = 'cl-key-1';

  constructor(private _http:HttpClient) { 

  }

  public getSearchEntitiesSimple(type : string, params = new HttpParams()): Observable<any> {
    return this._http
      .get(`${this.baseURL}/getweather/${type}`, { 
        headers: {'X_ClientId': this.x_clientId_no_limit},
        params: params });
  }

  public getWeather(country : string, city : string, unlimited = false) : Observable<any> {
    return this._http
    .get(`${this.baseURL}/getweather/country/${country}/city/${city}`, {
      headers: {'X_ClientId': unlimited ? this.x_clientId_no_limit : this.x_clientId_rate_limit}
   });
  }


}
