// const url = require('url');

// import node-fetch

const pinCode = require('./app');


const axios = require("axios");
// set url as constant
const URL = `https://api.postalpincode.in/pincode/${pinCode}`;

axios
  .get(URL)
  .then((response) => {
    // console.log(response.data.PostOffice[0].District);
    const city = response.data.PostOffice[0].District;
    // console.log(response.data.PostOffice[0].State);
    const state = response.data.PostOffice[0].State;
    func(city, state);
  })
  .catch((error) => {
    console.log("Invalid Pincode");
  });
const func = (city, state) => {
  const http = require("http");
  const server = http
    .createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ City: city, State: state }));
      res.end();
    })
    server.listen(8000,(err) => {
      if(err){
        throw err;
      }
      console.log("server working");
    });
};