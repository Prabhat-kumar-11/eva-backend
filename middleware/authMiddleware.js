const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (token) {
    try {
      const decoded = jwt.verify(token.split(" ")[1], "socialMedia");
      if (decoded) {
        req.body.authorID = decoded.authorID;
        req.body.author = decoded.author;
        next();
      } else {
        res.send({ msg: "please Login !!" });
      }
    } catch (err) {
      res.send({ err: err.message });
    }
  } else {
    res.send({ msg: "please Login !!" });
  }
};

module.exports = {
  auth,
};
