import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import axios from "axios";
const authUrl = 'http://localhost:3051/auth/whoami';

export function verify(headers: any) {
    let token = '';
    let item = headers["authorization"];
    if(!item) {
        throw new UnauthorizedException("Could not find access token for authorization.");
    }
    if (item.startsWith('Bearer')) {
        token = item.slice(7);
    }

    let id;

    return axios.get(authUrl,{headers: {'Authorization' : headers.authorization }}).then((response) => { 
        id = response.data.id;
        console.log(`Authorized user with id: ${id}.`);
        return response.data.id; 
    })
    .catch(() => {
        throw new  UnauthorizedException("Could not verify authorization token.");
    });
}

export const paginate = (res, params) => {
    if (params.start !== undefined) {
        if (!parseInt(params.start)) {
          throw new BadRequestException(`Invalid start parameter.`);
        }
      }
    if (params.end !== undefined) {
        if (!parseInt(params.end)) {
            throw new BadRequestException(`Invalid end parameter.`);
        }
    }

    if(!res.length) {
        return res;
    }
    if(params.start > res.length) {
        return [];
    }
    const start = parseInt(params.start) - 1 || 0;
    const end = parseInt(params.end) || (parseInt(params.end) === 0 ? 0 : res.length);
    console.log(`start = ${start} and end= ${end}`);
    if(start >= end || start <= -1 || end === 0){
        throw new BadRequestException('Invalid start or end for pagination');
    }
    return res.slice(start,end);
}