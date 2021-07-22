# saas-80
A repository containing the project's work for the course Software as a Service in the 8th semester of the department of Electronical and Computer Engineering NTUA.

<html>
    <div id="my-div">
        <img id="img1" src="frontend/src/images/lightbulb_icon.png" alt="askmeanything logo" width="70" height="70"/>  
        <h2 id="title">askmeanything</h2> 
    </div>
</html>

The aim of the project was to create a question-answer management application, named *askmeanything*, with minimal functionality that implements some Software as a Service (SaaS) architectures.

You can find our app deployed on heroku here: https://ask-soa-frontend.herokuapp.com/

- - - 

### Architectures

#### Service Oriented Architecture or SOA

In SOA, we created a **service-bus** which uses ```REDIS``` and acts as a middleware between the 4 services but also between our frontend and our services.
The services, listed below, are all ```REDIS``` clients. <br>

1. **Authenticator** <br>
    > Uses JWT tokens to provide authentication for our users.

2. **Question manager** <br> 
    > Manages questions and their keywords.

3. **Question run** <br> 
    > Manages answers and votes, a more secondary service.

4. **Profile,stats and analytics** <br> 
    > Provides stats and analytics for the above and the user's profile. 

Finally, we created a separate app named **data-layer** which provides an interface between our Postgres database and the four services.

#### Microservices

In the Microservices architecture we created 6 microservices and a **choreographer** using ```REDIS``` again which synchronizes their databases.

The microservices created are:
    
1. **authenticator-ms**
    > Uses JWT tokens to provide authentication for our users.
2. **question-man ms**
    > Supports CRUD operations for questions and keywords.
3. **question-run ms**
    > Similar to question run service in SOA.
4. **questions-disp ms**
    > Used to display one or more questions with all their information(answers, keywords, votes).
5. **profile-ms**
    > Supports user's CRUD operations.
6. **stats-ms**
    > Provides all the statistics and analytics endpoints. 

---
    
### Languages,Tools and Frameworks

<p align="left">
    <img src="https://raw.githubusercontent.com/github/explore/37c71fdca4e12086faf8c7009793d2eb588c914e/topics/nestjs/nestjs.png" alt="nest-js icon" width="40" height="40"/>
    <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png" alt="ts icon" width="40" height="40"/>
    <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png" alt="node-js icon" width="40" height="40"/>
    <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/express/express.png" alt="express icon" width="40" height="40"/>
    <img src="https://github.com/typeorm/typeorm/raw/master/resources/logo_big.png" alt="typeorm icon" width="70" height="40"/>
    <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/postgresql/postgresql.png" alt="postgres icon" width="40" height="40"/>
    <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png" alt="react icon" width="40" height="40"/>
    <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/bootstrap/bootstrap.png" alt="bootsrap icon" width="40" height="40"/>
    <img src="https://redis.io/images/redis-white.png" alt="redis icon" width="120" height="40"/>
    <img src="https://raw.githubusercontent.com/github/explore/cb661bc288627f05a5ac4187b00495fd8048c9fa/topics/heroku/heroku.png" alt="heroku icon" width="40" height="40"/>
</p>

and also... **axios**,**pg** and **canvas-js**.

---

### Deployment

For the deployment of our application we used Heroku which is very "postgres-friendly" for our databases.

In total we deployed 14 apps, 6 for the SOA architecture, 7 for the microservices and 1 for our frontend.

We attached ```heroku-postgres``` in all the apps that needed a database and ```heroku-redis``` in all the apps that implemented redis as a server or as a client.

---

### Developers

<p align = "left"> 
Karavangelis Athanasios
<a href="https://github.com/thanoskaravangelis"> 
    <img src="https://raw.githubusercontent.com/github/explore/78df643247d429f6cc873026c0622819ad797942/topics/github/github.png" with="20" height="20"/>
</a>
<a href="mailto:thanosblv@gmail.com"> <img src="https://camo.githubusercontent.com/c9a89a6426081483aa6cd371bdecae44045961437b349ea97097d476978436f4/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f6e706d2f73696d706c652d69636f6e734076332f69636f6e732f676d61696c2e737667" alt="email" height="20" data-canonical-src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/gmail.svg" style="max-width:100%;"></a>
</p> 
<p align = "left"> 
Mantzoutas Andreas
<a href="https://github.com/andrmantz"> 
    <img src="https://raw.githubusercontent.com/github/explore/78df643247d429f6cc873026c0622819ad797942/topics/github/github.png" with="20" height="20"/>
</a>
<a href="mailto:anmantzoutas@gmail.com"> <img src="https://camo.githubusercontent.com/c9a89a6426081483aa6cd371bdecae44045961437b349ea97097d476978436f4/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f6e706d2f73696d706c652d69636f6e734076332f69636f6e732f676d61696c2e737667" alt="email" height="20" data-canonical-src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/gmail.svg" style="max-width:100%;"></a>
</p> 
