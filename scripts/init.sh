#!/bin/bash
psql -U postgres << EOF
create database asd;
\c asd;
create user asd;
alter user asd with encrypted password 'asd';
grant all privileges on database asd to asd;
create extension "uuid-ossp";
EOF
