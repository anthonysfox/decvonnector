const express = require("express");
const router = express.Router();
const querystring = require("querystring");
const request = require("request");
const utils = require("../../config/utils");

// @route  GET api/spotify/login
// @desc   Login to spotify
// @access Public
router.get("/login", async (req, res) => {
  const state = utils.generateRandomString(16);
  res.cookie(process.env.STATE_KEY, state);

  // application requests auth
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: process.env.CLIENT_ID,
        scope: process.env.SCOPES,
        redirect_uri: process.env.REDIRECT_URI,
        state: state,
      })
  );
});

// @route  GET api/spotify/callback
// @desc   gets the access and refresh tokens
// @access Public
router.get("/callback", function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[process.env.STATE_KEY] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(process.env.STATE_KEY);
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(
            process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
          ).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        var options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        // use the access token to access the Spotify Web API
        // request.get(options, function (error, response, body) {
        //   console.log(body);
        // });

        res.status(200).send({ access_token, refresh_token });
      } else {
        res.redirect(
          "/#" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      }
    });
  }
});

module.exports = router;
