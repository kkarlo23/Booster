# Booster

Booster is a vehicle management application


## Dependencies
mongodb 

nodejs

npm

## Clone the git repository
download backend dependencies
```bash
cd backend
npm install
```


download frontend dependencies
```bash
cd frontend
npm install
```

## Run backend

```bash
cd backend
node app.js configPath="PathToYourDbConfigFile.json"
```
eg. if config file with name 'config.json' is in backend folder it would be:
```bash
node app.js configPath="./config.json"
```

config file format should be like this: 
```json
{
  "username": "myUsername",
  "password": "myPassword",
  "db": "myDB",
  "collection": "myCollection"
}
```

At this point backend should be running at port localhost:3000

## Run frontend

```bash
cd frontend
npm run dev
```

At this point frontend should be running at port localhost:4000

## Some design decisions expained

mongo is used simply because data provided already had mongo object id field.

minimal set of libraries used since it is a very small application.

vuejs 3 is used purely because of my existing knowledge in that framework, there is no
store since it is a small application.
I could have make more isolated components (eg. buttons, inputs and stuff). but it will take more time

no css framework was used, all is written from scratch, only loader is copied from internet :D 

there is no mobile support (you should not even use this app!!!)

if i had time I would implement authentication with sessions using redis

## ENDING

I had fun writing this, I hope you will have fun exploring this awsome app :D 