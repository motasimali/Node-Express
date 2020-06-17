const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
    // next will call the next function with modified response
})
.get((req,res,next)=>{
    res.end('Will send all the dishes')
})
.post((req,res,next)=>{
    res.end('Will add the dish: '+ req.body.name +' with details: '+ req.body.description);
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on '+req.url);
})
.delete((req,res,next)=>{
    res.end('Delteting all the dishes');
});

module.exports = dishRouter;


