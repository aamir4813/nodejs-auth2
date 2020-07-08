# NodeJS-SignIn-Register & Google-oAuth2

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)

## About <a name = "about"></a>

Login and Register template with Google-oAuth2 Authentication , login , Register backend by NodeJs (Express)
And MongoDB was used to store the data. 

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) 

### Prerequisites

```
  basic knowledge of ExpressJS
  npm
  git
  Google-oAuth2 API
  MongoDB Client or MongoDB Atlast(in my case)
```

### Installing  <a name = "deployment"></a>
A step by step series of examples that tell you how to get a development env running.

<!-- ''' -->
```bash
 
  git clone 
  cd nodejs-auth2/
  npm i
  npm start


```
  Create a .env file for Config
```
  DB_CONNECT = value
  GOOGLE_CLIENT_ID = value
  GOOGLE_CLIENT_KEY = value
  GOOGLE_CALLBACK_URL = http://localhost:3000/auth/google/callbacks (in my case ..)
  and just go to :  http://localhost:3000/
```


## Usage <a name = "usage"></a>

```
Following Routes are Available:
http://localhost:3000 + address

address : /
address : /access  [GET] {if Google Login is successful}
address : /failed  [GET] {if Google Login failed}
address : /logout  [GET] {to logout google login}
address : /auth/google [GET] {to login in to Google account}
address : /api/user/register [POST] {normal register}
address : /api/user/login  [POST] {normal login}
```