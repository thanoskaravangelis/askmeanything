import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(params: any): boolean {
    const allowed = [/.*profile\/.*\/edit/];
    for (let i = 0; i < allowed.length; i++) {
      if (allowed[i].test(params.url)) {
        return true;
      }
      return false;
    }
  }
}
