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
        return axios.post(URLTOESB, {}, { params, headers });
    }
}