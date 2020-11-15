#!/bin/sh
sleep 10
npx sequelize-cli db:migrate
node app.js