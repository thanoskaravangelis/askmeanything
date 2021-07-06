const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3010;
const corsOptions = {
  origin: "*",
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
const REDIS_PORT = 6379;
const REDIS_HOST = 'localhost';
const TotalConnections = 20


const urls = {
  auth: "http://localhost:3001",
  questionman: "http://localhost:3002",
  questionrun: "http://localhost:3003",
  profileman: "http://localhost:3004"
}


const methods = {
  "post": axios.post,
  "get": axios.get,
  "patch": axios.patch,
  "delete": axios.delete,
}

const pool = require('redis-connection-pool')('myRedisPool', {
  host: REDIS_HOST,
  port: REDIS_PORT,
  max_clients: TotalConnections,
  perform_checks: false,
  database: 0,
});
console.log('connected to redis');


async function checkProcess(req,res) {

  let link,url,dest;
  if(req.body.url.startsWith("http://localhost:3001")) {
    link = urls.auth;
    dest='auth';
    url = req.body.url.split(':3002/')[1];
  }
  if(req.body.url.startsWith("http://localhost:3002")) {
    link = urls.questionman;
    dest='questionman';
    url = req.body.url.split(':3002/')[1];
  }
  if(req.body.url.startsWith("http://localhost:3003")) {
    link = urls.questionrun;
    dest = 'questionrun';
    url = req.body.url.split(':3003/')[1];
  }
  if(req.body.url.startsWith("http://localhost:3004")) {
    link = urls.profileman;
    dest = 'profileman';
    url = req.body.url.split(':3004/')[1];
  }

  const params = {
    url : url
  }

  console.log(params.url);

  let resp = {
    exists : false,
    needsAuth: false
  }

  await axios.get(link+'/allow', { params }).then( (response) => {
    resp.exists = response.data.exists;
    resp.needsAuth = response.data.needsAuth;
  }).catch(() => {
    res.status(400).send("Bad request, could not identify url.");
  });

  if(resp.exists === false) {
    return res.status(404).send("Service url not found.");
  } else {
    requestProcess(req,res,dest);
  }
}

/* main function to receive the requests */
async function requestProcess(req, res, dest) {

  const func = methods[req.body.method] || null;
  if (!func) return res.status(405).send('Method not supported');
  const url = req.body.url;
  const method = req.body.method;
  const body = req.body.req_data || null; 
  const dest_service = dest;
  console.log(dest_service);
  if (!urls[dest_service]) return res.status(404).send('Service not found.');

  pool.hget('bus', 'messages', async (err, data) => {
    const currMessages = JSON.parse(data) || [];

    const newMessage = {
      id: currMessages ? currMessages.length + 1 : 1,
      req: {
        query: req.query,
        headers: req.headers,
        body: req.body,
      },
      timestamp: Date.now(),
      targetService: dest_service,
    };
    console.log({
      id: newMessage.id,
      req: {
        query: newMessage.req.query,
        body: newMessage.req.body,
      },
      timestamp: newMessage.timestamp,
      targetService: newMessage.targetService,
    })
    currMessages.push(newMessage);
    console.log('I pushed the new message.');
    pool.hset('bus', 'messages', JSON.stringify(currMessages), () => {
      pool.hget('channel', 'subscribers', (err, data) => {
        const subscribers = JSON.parse(data);
        let service_available = false;
        for (let i = 0; i < subscribers.length; i++) {
          if (subscribers[i] === (urls[newMessage.targetService])) {
            service_available = true;
            break;
          }
        }
        if (!service_available) {
          return res.status(400).send('Service is temporalily down.');
        }
        console.log(req.headers);
        if(method==='get' || method==='delete'){
          return func(url,{headers: {'Authorization' : req.headers.authorization }} )
          .then(response => {
            console.log('Sent response.');
            return res.send(response.data);
          }).catch(err => {
            console.log('Sent error.');
            return res.status(err.response.data.statusCode).send(err.response.data);
          })
        }
        else{
          return func(url,body,{headers: {'Authorization' : req.headers.authorization }} )
          .then(response => {
            console.log('Sent response.');
            return res.send(response.data);
          }).catch(err => {
            console.log('Sent error.');
            return res.status(err.response.data.statusCode).send(err.response.data);
          })
        }
      })
    })
  })
}


app.post('/', cors(corsOptions), (req, res) => {
  return checkProcess(req, res);
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});