import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly storage: any;

  constructor() {
    this.storage = sessionStorage;
  }

  public clearStorage() {
    this.storage.clear();
  }

  public store(key: string, value: any) {
    this.storage.setItem(key, value)
  }

  public retrieve(key: string): any {
    const item = this.storage.getItem(key);
    if(item && item !== undefined) {
      return item;
    }
    return undefined;
  }

  public remove(key: string) {
    this.storage.remove(key);
  }
}
