/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module

  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files

  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt

    - For any other route not defined in the server return 404

    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.get("/files", (req, res, next) => {
  fs.readdir(`${__dirname}/files`, (err, files) => {
    if (err) {
      res.status(500).json("Failed to retrieve files");
    } else {
      res.json(files);
    }
  });
});

app.get("/file/:filename", (req, res) => {
  let fileName = req.params.filename;

  fs.readdir(`${__dirname}/files`, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      if (files.includes(fileName)) {
        fs.readFile(
          `${__dirname}/files/${fileName}`,
          "utf-8",
          (err, content) => {
            if (err) {
              res.send(err);
            } else {
              res.send(content);
            }
          }
        );
      } else {
        res.status(404).send("File not found");
      }
    }
  });
});

app.use((req, res, next) => {
  res.status(404).send("Route not found");
});

module.exports = app;
