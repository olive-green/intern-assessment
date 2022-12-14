# intern-assessment
# Yoga Class Booking App

## ReactJS + ExpressJS + MongoDB
## Introduction
This is a simple Yoga Class Booking App. In this project I've used ReactJS for the frontend, ExpressJS for the backend, MongoDB for production database

## Features
(**Note: While creating the project my aim was to focus entirely in the Backend part**)

 The API has minimal features like:
- User Registration
- Choosing a Batch (6-7AM, 7-8AM, 8-9AM and 5-6PM)
- Changing the Batch (next month)
- A Fake Payment
---
## ER Diagram
![ER Diagram](https://i.imgur.com/JZqlNFs.png)

## HomePage 
![HomePage](https://github.com/olive-green/intern-assessment/blob/main/screenshots/homepage.png)

---

## API Documentation
## How to run this project
### Clone the repository
    git clone https://github.com/olive-green/intern-assessment.git

### Change the directory
    cd flexmoney

### change the directory to client
    cd client

### Install the dependencies and start the client
    npm install && npm start
### Change the directory to server
    cd server
### Add environment variables by renaming the .env.example file to .env
    dbUrl=" "
    
    
    

### Base URL
    http://localhost:3000/api/v1
## API Endpoints
|  REQUEST  |  ENDPOINT         |  DESCRIPTION
|    ---    |    ---            |     ---
| POST      | /user/register    | Register user with name, email and password and date of birth
| POST      | /user/login       | Login user with email and password
| GET       | /user/logout      | Logout user
| GET       | /user/me          | Info about the loginned user
| POST      | /batch/join       | Add user to a batch with timing and pay the amount
| PATCH     | /batch/Change     | Change the Batch and Pay the amount
| GET       | /payment/all      | Get all the payments with pagination (its not protected)

