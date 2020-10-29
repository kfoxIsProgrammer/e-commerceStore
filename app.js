var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var expressHBS = require("express-handlebars");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var passport = require("passport");
var flash = require("connect-flash");
var bodyparser = require("body-parser");
var expressValidator = require("express-validator");
const hbshelpers = require("handlebars-helpers");
const multihelpers = hbshelpers();
const https = require("https");
const fss = require("fs");

var indexRouter = require("./routes/index");
var userRouter = require("./routes/user");

var app = express();

mongoose.connect("mongodb://127.0.0.1:27017/shopping", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
require("./config/passport");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  expressHBS({
    defaultLayout: "layout",
    extname: ".hbs",
    helpers: multihelpers,
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);

app.set("view engine", ".hbs");

app.use(logger("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(expressValidator()); //this line to be addded
app.use(cookieParser());
app.use(
  session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { secure: true, maxAge: 180 * 60 * 1000 },
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "/resources")));

app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

app.use("/user", userRouter);
app.use("/shoppingcart", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


module.exports = app;
