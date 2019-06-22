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

  //compute(response, weight, p_type);
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
      //return error message
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
  switch(weight){
    case 1:
      price = Number.parseFloat(1.00).toFixed(2);
      break;
    case 2:
      price = Number.parseFloat(1.15).toFixed(2); 
      break;
    case 3:
      price = Number.parseFloat(1.30).toFixed(2);
      break;
    case 4:
      price = Number.parseFloat(1.45).toFixed(2);
      break;
    case 5:
      price = Number.parseFloat(1.60).toFixed(2);
      break;
    case 6:
      price = Number.parseFloat(1.75).toFixed(2);
      break;
    case 7:
      price = Number.parseFloat(1.90).toFixed(2);
      break;
    case 8:
      price = Number.parseFloat(2.05).toFixed(2);
      break;
    case 9:
      price = Number.parseFloat(2.20).toFixed(2);
      break;
    case 10:
      price = Number.parseFloat(2.35).toFixed(2);
      break;
    case 11:
      price = Number.parseFloat(2.50).toFixed(2);
      break;
    case 12:
      price = Number.parseFloat(2.65).toFixed(2);
      break;
    case 13:
      price = Number.parseFloat(2.80).toFixed(2);
      break;
    default:
      //error message;
      break;
  }
  send(response, weight, p_type, price);
}

function first(respone, weight, p_type){
  
  weight = Math.ceil(weight);
  switch(weight){
    case 1:
      price = 3.66;
      break;
    case 2:
      price = 3.66;
      break;
    case 3:
      price = 3.66;
      break;
    case 4:
      price = 3.66;
      break;
    case 5:
      price = 4.39;
      break;
    case 6:
      price = 4.39;
      break;
    case 7:
      price = 4.39;
      break;
    case 8:
      price = 4.39;
      break;
    case 9:
      price = 5.19;
      break;
    case 10:
      price = 5.19;
      break;
    case 11:
      price = 5.19;
      break;
    case 12:
      price = 5.19;
      break;
    case 13:
      price = 5.71;
      break;
    default:
      //error message;
      break;
  }
  send(response, weight, p_type, price);
}

function send(response, w, p_t, p)
{
  const params = {weight: w, p_type: p_t, price: p};
  response.render('pages/results', params);
}