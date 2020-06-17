const express =  require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(express.static(__dirname+'/public'));

//all means no matter which method GET, PUT, POST or DELETE is called
app.all('/dishes',(req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
    // next will call the next function with modified response
});

app.get('/dishes',(req,res,next)=>{
    res.end('Will send all the dishes')
});

app.post('/dishes',(req,res,next)=>{
    res.end('Will add the dish: '+ req.body.name +' with details: '+ req.body.description);
});

app.put('/dishes',(req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on '+req.url);
});

app.delete('/dishes',(req,res,next)=>{
    res.end('Delteting all the dishes');
});

app.get('/dishes/:dishId',(req,res,next)=>{
    res.end('Will send details of the dish: '+ req.params.dishId+ ' to you');
});

app.post('/dishes/:dishId',(req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on '+req.url + ' ' + req.params.dishId);
});

app.put('/dishes/:dishId',(req,res,next)=>{
    res.write('Updating the dish: '+ req.params.dishId+ '\n');
    res.end('Will update the dish: '+ req.body.name+ ' with details: '+req.body.description)
});

app.delete('/dishes/:dishId',(req,res,next)=>{
    res.end('Delteting dish: '+ req.params.dishId);
});

// next is used to invoke additional middlewares
app.use((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>This is the Express server</h1></body></html>')
});

const server = http.createServer(app);

server.listen(port,hostname,()=>{
    console.log(`Server is running at http://${hostname}:${port}`)
})