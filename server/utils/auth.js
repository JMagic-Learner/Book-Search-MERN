const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({req}) {
    // allows token to be sent via  req.query or headers
    // Needs req.body.token to accept the login 
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    console.log("authMiddleware has been called");
    let token = req.body.token || req.query.token || req.headers.authorization;
    

    if (req.body.token) {
    console.log("The req.body.token is " + JSON.stringify(req.body.token));
    } else if (req.query.token) {
    console.log("The req.query.token is " + JSON.stringify(req.query.token));
    } else if (req.headers.authorization) {
    console.log("The req.headers.authorization is " + JSON.stringify(req.headers.authorization));
    } else {
    console.log("There was no token passed");
    }
    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
      console.log("the token has been matched against the req.user");
    } catch {
      console.log('Invalid token');
    }

    // send to next endpoint
    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id }
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
