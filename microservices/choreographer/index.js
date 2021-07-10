const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3060;
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
  auth: "http://localhost:3051",
  questionman: "http://localhost:3052",
  questionrun: "http://localhost:3053",
  profileman: "http://localhost:3054",
  questiondisp: "http://localhost:3055",
  stats : "http://localhost:3056"
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


/* main function to receive the requests */
async function requestProcess(req, res) {

  const func = methods[req.body.method] || null;
  if (!func) return res.status(405).send('Method not supported');
  const from = req.body.from;
  const entity = req.body.entity;
  const method = req.body.method;
  const toBeSent = req.body;
  headers = req.headers;
  if (from !== urls.auth && from === urls.profileman && from === urls.questiondisp && from=== urls.questionman && from === urls.questionrun && from===urls.stats ){
    return res.status(400).send('Bad request, departing url does not exist.')
  }
  let receivers = [];
  switch (entity) {
      case "answer":
        receivers.push(urls.questiondisp);
        receivers.push(urls.questionrun);
        receivers.push(urls.stats);
        break;
      case "keyword":
        receivers.push(urls.questiondisp);
        receivers.push(urls.questionman);
        receivers.push(urls.stats);
        break;
      case "question":
        receivers.push(urls.questiondisp);
        receivers.push(urls.questionman);
        receivers.push(urls.questionrun);
        receivers.push(urls.stats);
      case "question-has-keyword":
        receivers.push(urls.questiondisp);
        receivers.push(urls.questionman);
        receivers.push(urls.stats);
      case "user":
        receivers.push(urls.questiondisp);
        receivers.push(urls.questionman);
        receivers.push(urls.stats);
        receivers.push(urls.profileman);
        receivers.push(urls.auth);
        receivers.push(urls.questionrun);
      case "vote":
        receivers.push(urls.questiondisp);
        receivers.push(urls.questionrun);
        receivers.push(urls.stats);
      default:
          break;
  }

  receivers.pop(from);

  pool.hget('bus', 'messages', async (err, data) => {
    const currMessages = JSON.parse(data) || [];

    const newMessage = {
      id: currMessages ? currMessages.length + 1 : 1,
      req: {
        query: req.query,
        headers: req.headers,
        body: req.body,
      },
      method : method,
      timestamp: Date.now(),
      entity : entity
    };
    console.log({
      id: newMessage.id,
      req: {
        query: newMessage.req.query,
        body: newMessage.req.body,
      },
      method : newMessage.method,
      timestamp: newMessage.timestamp,
      entity: newMessage.entity,
    })
    currMessages.push(newMessage);
    console.log('I pushed the new message.');
    pool.hset('bus', 'messages', JSON.stringify(currMessages), () => {
      pool.hget('channel', 'subscribers', async (err, data) => {
        const subscribers = JSON.parse(data);
        let service_available = false;
        let stop = false;
        let unavailable;
        for (let i = 0; i < subscribers.length; i++) {
            for(let j = 0; j < receivers.length; j++){
                if(!stop) {
                    if (subscribers.includes(receivers[j])) {
                      console.log('Service: '+receivers[j]+' ok.');
                        if(j === receivers.length - 1) {
                            service_available = true;
                        }
                        continue;
                    }
                    else {
                        unavailable = receivers[j];   
                        stop = true;
                    }
                }
            }
        }
        console.log("Checked services availability...");
        if (!service_available) {
          return res.status(400).send(`Service with url: ${unavailable} is temporalily down.`);
        }
        console.log("Start distributing...");
        for (let i = 0; i < receivers.length; i++)
        {
            await axios.post(receivers[i]+'/choreo', toBeSent ,{ headers } )
            .then(response => {
                console.log('Sent response.');
                return res.send(response.data);
            }).catch(err => {
                console.log('Sent error.');
                return res.status(404).send("Could not communicate with requested service.");
            });
        }
        return;
      })
    })
  })
}



app.post('/', cors(corsOptions), (req, res) => {
  console.log('got request');
  return requestProcess(req, res);
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});