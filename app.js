const express = require("express");
const app = express();
const cors = require("cors");
const fs = require('fs');

///init middleware//////////////////////////////
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

//in this Special case preload the json into memoery
const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
//default error handling function
const error_handle = (error) => console.error;
//default route/////////////////////////////////
app.get('/', async(req, res) => {
  try {
    res.json({data: "Service is running!"});
  } catch (error) {
    res.status(500).json({error: "Service is not running."});
    error_handle(error);
  }
});

app.get('/items', async(req, res) => {
  try {
    res.json({data});
  } catch (error) {
    res.status(500).json({error : error.message});
    error_handle(error);
  }
});

app.get('/item/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const ret = data.find(el => el.id === id);
    if(ret === undefined){
      res.status(404).json({"error": 'Item not found.'});
    }else{
      res.json({"data": ret});
    } 
  } catch (error) {
    res.status(500).json({error: "Server error."});
    error_handle(error);
  }
});
////404////////////////////////////////////////////
app.get("*", (req, res) => {
  res.status(404).send(`<h3>404</h3><p>File not found.</p>`);
});
////////////////////////////////////////////////
module.exports = app;