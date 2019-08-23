const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({'hello': 'there'});
});

app.post('/api/df_text_query', (req, res) => {
  res.send({'do': 'text query'})
});

app.post('/api/df_event_query', (req, res) => {
  res.send({'do': 'event query'})
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);