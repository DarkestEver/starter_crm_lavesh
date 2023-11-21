const Role = require("../models/role");
const User = require("../models/user")
const jwt = require('jsonwebtoken');

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };

const checkRole = (roles) => async (req, res, next) => {
  let { role } = req.user;

  const user = await Role.findById(role);
  console.log({"Role": user.role})

  !roles.includes(user.role)
    ? res.status(401).json("Sorry you do not have access to this route")
    : next();
};

const authenticateAdmin = (req, res, next) => {
  authenticateJwt(req, res, () => {
      checkRole('admin')(req, res, next);
  });
};

module.exports = {
    authenticateJwt,
    checkRole,
    authenticateAdmin
}