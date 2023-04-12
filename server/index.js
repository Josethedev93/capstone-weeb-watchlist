require('dotenv').config({path: '../.env'});
const express = require("express");

const app = express();
const port = process.env.PORT;
const axios = require("axios");



const options = {
  method: 'GET',
  url: 'https://anime-db.p.rapidapi.com/anime',
  params: {page: '1', size: '5'},
  headers: {
    'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
    'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
  }
};

axios.request(options)
.then(function (response) 
{
	console.log(response.data);
})
.catch(function (error) 
{
	console.error(error);
});

app.use(express.static('src'));
app.listen(port, () => { console.log(`server running on port ${port}`) });