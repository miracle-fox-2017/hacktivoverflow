# hacktivoverflow
Hacktiv8 overflow !!!  
access here: http://hacktiv8overflow.masfaris.com/

## File and Folder Structure  
```
.
├── README.md
├── client
│   ├── build
│   │   ├── build.js
│   │   ├── check-versions.js
│   │   ├── logo.png
│   │   ├── utils.js
│   │   ├── vue-loader.conf.js
│   │   ├── webpack.base.conf.js
│   │   ├── webpack.dev.conf.js
│   │   └── webpack.prod.conf.js
│   ├── config
│   │   ├── dev.env.js
│   │   ├── index.js
│   │   └── prod.env.js
│   ├── dist
│   │   ├── index.html
│   │   └── static
│   │       ├── css
│   │       └── js
│   ├── index.html
│   ├── package.json
│   ├── README.md
│   ├── src
│   │   ├── App.vue
│   │   ├── assets
│   │   │   └── logo.png
│   │   ├── components
│   │   │   ├── Home.vue
│   │   │   ├── QuestionAsk.vue
│   │   │   ├── Questions.vue
│   │   │   ├── Question.vue
│   │   │   ├── TheNavBar.vue
│   │   │   └── TheRightSideBar.vue
│   │   ├── main.js
│   │   ├── router
│   │   │   └── index.js
│   │   └── vuex
│   │       └── store.js
│   └── static
└── server
    ├── app.js
    ├── bin
    │   └── www
    ├── controllers
    │   ├── indexController.js
    │   └── questionController.js
    ├── helpers
    │   ├── fb.js
    │   ├── hashPassword.js
    │   └── jsonToken.js
    ├── middlewares
    │   ├── checkStatus.js
    │   └── verifyToken.js
    ├── models
    │   ├── answer.js
    │   ├── question.js
    │   └── user.js
    ├── package.json
    ├── public
    │   └── stylesheets
    │       └── style.css
    ├── README.md
    ├── routes
    │   ├── indexRouter.js
    │   └── questionRouter.js
    └── test
        └── app.test.js
```

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