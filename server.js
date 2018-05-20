const express = require( "express" );
const bodyParser = require( "body-parser" );

const app = express();
const PORT = process.env.PORT || 3030;

// middlewares
app.use( bodyParser.json() );
app.use( ( req, res, next ) => {
    res.header( "Access-Control-Allow-Origin", "*" );
    next();
} );

// Rest api's
app.get( "/", ( req, res ) => {
    res.send( { "hello": "world" } );
} );

console.log( `Your server is running on port -- ${PORT}` );
app.listen( PORT );
