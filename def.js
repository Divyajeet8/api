const express = require("express");

const router = express.Router();
const axios = require("axios");
const URL = "https://ifsc.razorpay.com/";

router.post("/v4", (req, res) => {
  console.log(req.body);
  res.writeHead(200, { "Content-Type": "application/json" });
  if (req.body.IFSC.length !== 11) {
    res.write(
      JSON.stringify({
        Message: "Please Enter IFSC Code of Valid Length (11 digits)",
      })
    );
    res.end();
    return;
  }
  axios
    .get(URL + req.body.IFSC)
    .then((response) => {
      // if(response.data !== 'undefined'){
      //     console.log(response.bank)
      // }
      // else{
      //     console.log("Bank Details Not Found")
      // }
      console.log(response.data);
      res.write(
        JSON.stringify({
          Message: "Bank Details Found",
          Bank: response.data.BANK,
          Branch: response.data.BRANCH,
        })
      );
      res.end();
    })
    .catch((err) => {
      // console.log(err.response.data)
      res.write(JSON.stringify({ Message: "Bank Details Not Found" }));
      res.end();
    });
});

module.exports = router;
