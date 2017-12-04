# hacktivoverflow
Hacktiv8 overflow !!!  
access here: http://hacktiv8overflow.masfaris.com/

## Endpoint API
| Endpoint       | HTTP   | Require                  | Description         |
|----------------|--------|--------------------------|---------------------|
| /api/signfb    | POST   | token(fb)                | get token & store to database |
| /api/question  | POST   | tokenjwt, title, question, image(link) | post new question |
| /api/question/ | GET    | (public)                 | get all question |
| /api/question/:id | GET | (public), params.id(question) | get specific question |
| /api/question/:id | PUT | tokenjwt, title, question, image(link) | edit specific question |
| /api/question/:id | DELETE | tokenjwt, params.id(question) | delete specific question |
| /api/question/:id/answer | GET | (public)           | get answer question |
| /api/question/:id/answer | POST | answer, image(link) | answer specific question |
| /api/answer/:id | DELETE | tokenjwt, params.id(question & answer) | delete answer |
| /api/question/:id/vote/ | POST | tokenjwt, value | give vote specific question |
| /api/answer/:id/vote | POST | tokenjwt, value | give vote specific answer |