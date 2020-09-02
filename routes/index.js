var express = require("express");
var router = express.Router();
var passport = require("passport");
var Cart = require("../models/cart");
var Product = require("../models/product");
var Order = require("../models/order");
const url = require("url");
var sanitize = require("mongo-sanitize");
var path = require("path");
/* GET home page. */
router.get("/", function (req, res, next) {
  active = "all";
  var products = Product.find(function (err, docs) {
    var successMsg = req.flash("success")[0];
    var productChunks = [];
    console.log(docs.length);
    var chunksize = 4;
    for (var i = 0; i < docs.length; i += chunksize) {
      productChunks.push(docs.slice(i, i + chunksize));
    }

    res.render("shop/index", {
      title: "Awesome Clothes E-commerce",
      products: productChunks,
      active: active,
      successMsg: successMsg,
      noMessage: !successMsg,
    });
  });
});

router.get("/findby/", function (req, res, next) {
  var value = sanitize(req.query.value);

  active = value;
  var products = Product.find({ majorTitle: value }, function (err, docs) {
    var successMsg = req.flash("success")[0];
    var productChunks = [];
    console.log(docs.length);
    var chunksize = 4;
    for (var i = 0; i < docs.length; i += chunksize) {
      productChunks.push(docs.slice(i, i + chunksize));
    }

    res.render("shop/index", {
      title: "Shopping-Cart",
      products: productChunks,
      active: active,
      successMsg: successMsg,
      noMessage: !successMsg,
    });
  });
});

router.get(
  "/.well-known/pki-validation/E8E3D46E111AA7AA6B0BA9BD75ACE4DF.txt",
  function (req, res, next) {
    res.sendFile(
      path.join(
        __dirname,
        "../.well-known/pki-validation",
        "E8E3D46E111AA7AA6B0BA9BD75ACE4DF.txt"
      )
    );
  }
);

router.get("/findby/:value", function (req, res, next) {
  var value = sanitize(req.params.value);

  if (value === "all") {
    return res.redirect("/");
  }
  active = value;
  var products = Product.find({ majorTitle: value }, function (err, docs) {
    var successMsg = req.flash("success")[0];
    var productChunks = [];
    console.log(docs.length);
    var chunksize = 4;
    for (var i = 0; i < docs.length; i += chunksize) {
      productChunks.push(docs.slice(i, i + chunksize));
    }

    res.render("shop/index", {
      title: "Shopping-Cart",
      products: productChunks,
      active: active,
      successMsg: successMsg,
      noMessage: !successMsg,
    });
  });
});

router.post("/item", function (req, res, next) {
  console.log(req.body.id);
  var product = Product.findOne({ productID: req.body.id }, function (
    err,
    docs
  ) {
    console.log("item got");
    var products2 = docs;
    res.render("shop/product-page", { product: products2 });
  });
});

router.get("/add-to-cart/", function (req, res, next) {
  var productid = req.query.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  var qty = parseInt(req.query.quantity);
  console.log(typeof qty);
  Product.findById(productid, function (err, product) {
    if (err) {
      return res.redirect("/");
    }
    cart.add(product, product.id, qty);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect("/");
  });
});

router.get("/reduce/:id", function (req, res, nect) {
  var productid = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reduceByOne(productid);
  req.session.cart = cart;
  res.redirect("/shoppingcart");
});

router.get("/remove/:id", function (req, res, nect) {
  var productid = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productid);
  req.session.cart = cart;
  res.redirect("/shoppingcart");
});

router.get("/shoppingcart", function (req, res, next) {
  if (!req.session.cart) {
    return res.render("shop/shoppingcartv2", { products: null });
  }

  var cart = new Cart(req.session.cart);
  res.render("shop/shoppingcartv2", {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice,
    qty: cart.totalQty,
  });
});

router.get("/checkout", isLoggedIn, function (req, res, next) {
  if (!req.session.cart) {
    return res.redirect("shop/shoppingcart");
  }

  var cart = new Cart(req.session.cart);
  console.log(cart);
  console.log(cart.items);
  var errMsg = req.flash("error")[0];
  res.render("shop/checkoutv2", {
    total: cart.totalPrice,
    qty: cart.totalQty,
    items: cart.items,
    errMsg: errMsg,
    noErrors: !errMsg,
  });
});

router.post("/checkout", isLoggedIn, function (req, res, next) {
  if (!req.session.cart) {
    return res.render("shop/shoppingcartv2", { products: null });
  }
  var cart = new Cart(req.session.cart);
  var stripe = require("stripe")("sk_test_SbZjlriqFD7G65nbgc64L83x00HVYLXeWQ");

  // `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token
  stripe.charges.create(
    {
      amount: cart.totalPrice * 100,
      currency: "cad",
      source: req.body.stripeToken, //we would use the token from the front end
      description: "My First Test Charge (created for API docs)",
    },
    function (err, charge) {
      if (err) {
        req.flash("error", err.message);
        return res.redirect("/checkout");
      }
      var order = new Order({
        user: req.user,
        cart: cart,
        address: req.body.address,
        name: req.body.name,
        paymentId: charge.id,
      });

      order.save(function (err, result) {
        req.flash("success", "Successfully bought product!");
        req.session.cart = null;
        res.redirect("/");
      });
    }
  );
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect("/user/signin");
}

module.exports = router;
