let express = require("express");
let app = express();
let path = require("path")
let port = 3000;

app.use(express.static(__dirname + "/public/"));
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});