import { BadRequestException } from "@nestjs/common";
import axios from "axios";
const authUrl = 'http://localhost:3001';

export async function verify(req: any) : Promise<any> {
    const headers = req['myHeaders'];
    let token = '';
    headers.forEach((item: any) => {
        if (item.startsWith('Bearer')) {
          token = item.slice(7);
        }
    });

    const isLogged = (token: any) => {
        const params = { 
            url: authUrl+'more',
        };
        const headers = {
            "Authorization": `Bearer ${token}`,
        };
        //console.log(`get from ${params.url} with header ${headers.Authorization}`)
        return axios.post('http://localhost:3010', {}, { params, headers });
    }
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