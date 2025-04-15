// /.netlify/functions/create-payment-intent
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.VITE_STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  const calculateOrderAmount = (items) => {
    return items * 100;
  };
  // console.log(event.body);
  if (event.body) {
    const { total_Price } = JSON.parse(event.body);
    console.log(total_Price);
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(total_Price),
        currency: "inr",
      });
      // console.log(paymentIntent.client_secret);
      return {
        statusCode: 200,
        body: JSON.stringify({ client_secret: paymentIntent.client_secret }),
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      };
    }
  }

  return {
    statusCode: 200,
    body: "created payment intent",
  };
};
