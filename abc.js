const express = require("express");

const router = express.Router();
const axios = require("axios");
const URL = `https://api.postalpincode.in/pincode/`;

router.post("/v2", (req, res) => {
  console.log(req.body);
  res.writeHead(200, { "Content-Type": "application/json" });
  if (req.body.pincode.length !== 6) {
    res.write(
      JSON.stringify({
        Message: "Please Enter Pincode of Valid Length (6 digits)",
      })
    );
    res.end();
    return;
  }
  axios
    .get(URL + req.body.pincode)
    .then((response) => {
      if (response.data[0].Status === "Success") {
        console.log(response.data[0].PostOffice[0]);
        res.write(
          JSON.stringify({
            Message: response.data[0].Message,
            Status: response.data[0].Status,
            City: response.data[0].PostOffice[0].District,
            State: response.data[0].PostOffice[0].State,
          })
        );
      } else {
        res.write(
          JSON.stringify({
            Message: response.data[0].Message,
            Status: response.data[0].Status,
          })
        );
      }
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.end();
    });
});

module.exports = router;
