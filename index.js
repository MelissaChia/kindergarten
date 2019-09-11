var express = require("express"); //call express
var app = express(); // define our app using express
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Kindergarten = require("./kindergarten");
mongoose.connect(
  "mongodb+srv://melissa:mel123@cluster-melissa-taeci.mongodb.net/test?retryWrites=true&w=majority"
); // connect to mongodb

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

var router = express.Router();

router.get("/", function(req, res) {
  res.json({ message: "hooray! welcome to our api" });
});

router
  .route("/kindergartens")
  .post(function(req, res) {
    var kindergarten = new Kindergarten();
    kindergarten.name = req.body.name;
    kindergarten.description = req.body.description;
    kindergarten.email = req.body.email;
    kindergarten.phone = req.body.phone;
    kindergarten.url = req.body.url;
    kindergarten.openingHours = req.body.openingHours;
    kindergarten.imageUrl = req.body.imageUrl;
    kindergarten.latitude = req.body.latitude;
    kindergarten.longitude = req.body.longitude;
    kindergarten.save(function(err) {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: "Kindergarten successfully added" });
      }
    });
  })
  .get(function(req, res) {
    Kindergarten.find(function(err, kindergartens) {
      if (err) {
        res.error(err);
      } else {
        res.json({ status: "ok", data: kindergartens });
      }
    });
  });

router.route("/kindergartens/:id").get(function(req, res) {
  Kindergarten.findById(req.params.id, function(err, kindergarten) {
    if (err) {
      res.error(err);
    } else {
      res.json({ status: "ok", data: kindergarten });
    }
  });
});

router.route("/kindergartens/:id").post(function(req, res) {
  Kindergarten.findById(req.params.id, function(err, kindergarten) {
    if (err) {
      res.error(err);
    } else {
      kindergarten.name = req.body.name;
      kindergarten.description = req.body.description;
      kindergarten.email = req.body.email;
      kindergarten.phone = req.body.phone;
      kindergarten.url = req.body.url;
      kindergarten.openingHours = req.body.openingHours;
      kindergarten.imageUrl = req.body.imageUrl;
      kindergarten.latitude = req.body.latitude;
      kindergarten.longitude = req.body.longitude;
      kindergarten.save(function(err) {
        if (err) {
          res.send(err);
        } else {
          res.json({ message: "Kindergarten successfully added" });
        }
      });
    }
  });
});

app.use("/api", router);

app.listen(port);

console.log("Magic happens on port" + port);
