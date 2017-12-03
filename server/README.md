## Endpoint API
| Endpoint       | HTTP   | Require                  | Description         |
|----------------|--------|--------------------------|---------------------|
| /api/signfb    | POST   | token(fb)                | get token & store to database |
| /api/question  | POST   | tokenjwt, title, question, image(link) | post new question |
| /api/question/ | GET    | (public)                 | get all question |
| /api/question/:id | GET | (public), params.id(question) | get specific question |
| /api/question/:id | PUT | tokenjwt, title, question, image(link) | edit specific question |
| /api/question/:id | DELETE | tokenjwt, params.id(question) | delete specific question |
| /api/question/:id/answer | POST | answer, image(link) | answer specific question |
| /api/question/:id/answer/:answerid | DELETE | tokenjwt, params.id(question & answer) | delete answer |
| /api/question/:id/vote/ | POST | tokenjwt, value | give vote specific question |
| /api/question/:id/answer/:answerid/vote | POST | tokenjwt, value | give vote specific answer |


## Before you start
1. start mongo
```
mongod
```
2. npm command
```
npm test
npm start
```