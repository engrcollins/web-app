const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();


/*var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
*/

var whitelist = ['http://localhost:3000', 'http://desktop-hdv5l9a:3000', 'https://engrcollins.github.io', 'https://dev-catalog.netlify.app'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

/*app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
 });*/

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to McCollins Technologies." });
});

require("./app/routes/customer.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});