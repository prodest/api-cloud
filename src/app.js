const config = require( './config/app' );

if ( config.env === 'production' ) {
    require( 'newrelic' );
}

const express = require( 'express' );
const httpProxy = require( 'http-proxy' );

let app = express();

//
// Create a proxy server with custom application logic
//
const proxy = httpProxy.createProxyServer( {} );

app.use( ( req, res ) => {
    proxy.web( req, res, { target: 'http://cloud.datacenter.es.gov.br.local/v1/projects/1a4680' } );
} );

let pathApp = express();

const path = config.path;
pathApp.use( path, app );

module.exports = pathApp;
