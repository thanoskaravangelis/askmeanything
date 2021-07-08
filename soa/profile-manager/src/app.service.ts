import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private endpoints = [
    {
      regex : new RegExp('profile/[1-9][0-9]*/(edit|myquestions|myanswered|mystats)?'),
      valid: true,
      authorize: true
    },
    {
      regex : new RegExp('profile/questionsperkeyword/([a-z]|[A-Z])+'),
      valid: true,
      authorize: false
    },
    {
      regex : new RegExp('profile/questions/perkeyword/stats'),
      valid: true,
      authorize: false
    },
    {
      regex : new RegExp('profile/(questions|answers)/(daily|monthly)/stats'),
      valid: true,
      authorize: false
    },
    {
      regex : new RegExp('profile/questions/monthly/analytics/[0-9]{4}/[2-9]{1}|1[0-2]?'),
      valid: true,
      authorize: false
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
