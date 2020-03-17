import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _baseUri = "http://localhost:3000/api/";

  constructor() { }

  getBaseUri() {
    return this._baseUri;
  }
}
