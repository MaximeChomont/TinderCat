import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
  public Server = 'http://localhost/';
  public ApiUrl = 'apiTinder/api/web/v1/';
  public ServerWithApiUrl = this.Server + this.ApiUrl;
}
