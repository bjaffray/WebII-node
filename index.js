const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/postage', handler)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))




var price;

function handler(request, response){
  const weight = request.query.weight;
  const p_type = request.query.postage_type;

  if(weight > 3.5)
    first(response, weight, p_type);

  switch(p_type){
    case "Stamped Letter":
      stamped(response, weight, p_type);
      break;
    case "Metered Letter":
      metered(response, weight, p_type);
      break;
    case "Large Envelope":
      large(response, weight, p_type);
      break;
    case "First-Class Package Service":
      first(response, weight, p_type);
      break;
    default:
      break;
  }
}


function stamped(response, weight, p_type){
  if(weight <= 1)
    price = 0.55;
  else if(weight <= 2)
    price = Number.parseFloat(0.70).toFixed(2);
  else if(weight <= 3)
    price = 0.85;
  else
    price = Number.parseFloat(1.00).toFixed(2);

  send(response, weight, p_type, price);
}


function metered(response, weight, p_type){

  if(weight <= 1)
    price = Number.parseFloat(0.50).toFixed(2);
  else if(weight <= 2)
    price = 0.65;
  else if(weight <= 3)
    price = Number.parseFloat(0.80).toFixed(2);
  else
    price = 0.95;

  send(response, weight, p_type, price);
}


function large(response, weight, p_type){

  weight = Math.ceil(weight);

  if (weight <= 13) {
    parF = 1 + ((weight - 1) * .15);
    price = Number.parseFloat(parF).toFixed(2);
  }

  send(response, weight, p_type, price);
}


function first(response, weight, p_type){

  weight = Math.ceil(weight);

  if (weight < 5 && weight > 0)
    price = 3.66;
  else if (weight < 9 && weight > 4)
    price = 4.39
  else if (weight < 13 && weight > 8)
    price = 5.19;
  else if (weight == 13)
    price = 5.71;

  send(response, weight, p_type, price);
}

function send(response, w, p_t, p)
{
  const params = {weight: w, p_type: p_t, price: p};
  response.render('pages/results', params);
}