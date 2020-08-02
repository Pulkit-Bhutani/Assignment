import { Injectable } from '@angular/core';
import { Endpoints } from '../resources/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  endpoints: Endpoints;

  constructor() { }

  load() {
    const endpoint = 'https://hn.algolia.com/api/v1/search';

    this.endpoints = new Endpoints();

    this.endpoints.pageUrl = endpoint;
  }


}
