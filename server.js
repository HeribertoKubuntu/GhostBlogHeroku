//const Sentry = require("@sentry/node");
// or use es6 import statements
// import * as Sentry from '@sentry/node';

// Sentry.init({ dsn: "https://a00780c370974d699419cfaca4d050e8@o354876.ingest.sentry.io/5400034" });

//require('newrelic');

var ghost = require("ghost");
var express = require("express");
var urlService = require("./node_modules/ghost/core/frontend/services/url");
var parentApp = express();

// Run a single Ghost process
ghost()
  .then(function(ghostServer) {
    // for making subdir work
    parentApp.use(urlService.utils.getSubdir(), ghostServer.rootApp);
    ghostServer.start(parentApp);
  })
  .catch(error => {
    console.error(`Ghost server error: ${error.message} ${error.stack}`);
    process.exit(1);
  });
