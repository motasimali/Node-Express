const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
    // next will call the next function with modified response
})
.get((req,res,next)=>{
    res.end('Will send all the leaders')
})
.post((req,res,next)=>{
    res.end('Will add the leader: '+ req.body.name +' with details: '+ req.body.description);
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req,res,next)=>{
    res.end('Delteting all the leaders');
});

leaderRouter.route('/:leaderId')
.get((req,res,next)=>{
    res.end('Will send details of the leader: '+ req.params.leaderId+ ' to you');
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/'+ req.params.leaderId);
})
.put((req,res,next)=>{
    res.write('Updating the leader: '+ req.params.leaderId+ '\n');
    res.end('Will update the leader: '+ req.body.name+ ' with details: '+req.body.description)
})
.delete((req,res,next)=>{
    res.end('Delteting leader: '+ req.params.leaderId);
});

module.exports = leaderRouter;


