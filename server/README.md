## Endpoint API
| Endpoint       | HTTP   | Require                  | Description         |
|----------------|--------|--------------------------|---------------------|
| /              | GET    | -                        | Welcome Page        |
| /blog          | POST   | token(header), newpost   | Post new blog       |
| /blog/all      | GET    | -                        | Get blog post       |
| /blog/:id      | GET    | token(header),id(params) | Get blog post       |
| /blog/:id      | DELETE | token(header),id(params) | Delete blog post    |
| /signin        | POST   | username, password       | return token        |
| /signup        | POST   | username, password       | return token        |
| /verify        | POST   | token(header)            | return status login | 

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