const fs = require('fs');
const fastify = require('fastify')();
const {coinCount} = require('./p3-module.js');
fastify.get('/', (request, reply) => {
    fs.readFile(`${__dirname}/index.html`, 'utf8', (err, data) => {
      if (err) {
        reply
        .code(500)
        .header("Content-Type", "text/html; charset=utf-8")
        .send('<h1>Could not find path</h1>');
      } else {
        reply
        .code(200) 
        .header("Content-Type", "text/html; charset=utf-8")
        .send(data);
      }
    });
  });
  fastify.get('/coin', (request, reply) => {
    const { denom = 0, count = 0 } = request.query;
    const coinValue = coinCount({ denom: parseInt(denom), count: parseInt(count) });
    reply
        .code(200)
        .header("Content-Type", "text/html; charset=utf-8")
        .send(`<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`);
  });   
  fastify.get('/coins', (request, reply) => {
    const { option } = request.query;
    let coinValue = 0;
    switch (option) {
      case '1':
        coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });
        break;
      case '2':
        const coins = [{ denom: 25, count: 2 }, { denom: 1, count: 7 }];
        coinValue = coinCount(...coins);
        break;
      case '3':
        const nestedCoins = [[{ denom: 25, count: 2 }, { denom: 1, count: 7 }]];
        coinValue = coinCount(...nestedCoins);
        break;
      default:
        coinValue = 0;
        break;
    }
  
    reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`);
  });
  
  fastify.listen(8080, 'localhost', (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server on http://localhost:8080`);
  });  
