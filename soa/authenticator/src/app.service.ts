import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private endpoints = [
    {
      regex : new RegExp('auth/login|whoami|signup'),
      valid: true,
      authorize: true
    }
  ];

  isAllowed(params: any) {
    let returned = {
      valid:false,
      authorize:false
    };

    for (let i = 0; i < this.endpoints.length; i++) {
      if(this.endpoints[i].regex.test(params.url)) {
        returned.valid = this.endpoints[i].valid;
        returned.authorize = this.endpoints[i].authorize;
      }
    }
    return returned;
  }

  listEndpoints() {
    let returned = [];
    for (let i = 0; i < this.endpoints.length; i++) {
      returned.push(
        {
          url: this.endpoints[i].regex.toString(),
          valid : this.endpoints[i].valid,
          authorize : this.endpoints[i].authorize
        }
      )
    }

    return returned; 
  }
}
