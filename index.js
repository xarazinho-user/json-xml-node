const express = require('express');
const cors = require('cors');
const { parseString, Builder } = require('xml2js');
const bodyParser = require('body-parser');

const port = 51492;

const app = express();

app.use(cors());
app.use(bodyParser.text({ type: '*/*', limit: '50mb' }));

app.use((req, res, next) => {
  if (!req.body) {
    throw new Error('Requisição sem conteúdo');
  }
  next();
});

app.post('/json-to-xml', (req, res) => {
  try {
    const builder = new Builder();
    res.status(200).send(builder.buildObject(JSON.parse(req.body)));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post('/xml-to-json', (req, res) => {
  try {
    parseString(req.body, { explicitArray: false }, (error, result) => {
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
