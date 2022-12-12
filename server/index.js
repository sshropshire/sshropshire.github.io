
const express = require('express');
const braintree = require('braintree');

const port = process.env.PORT || 3000;

const app = express();
app.use('/public', express.static('public'));

const environment = braintree.Environment.Sandbox;
const merchantId = process.env.BRAINTREE_MERCHANT_ID;
const publicKey = process.env.BRAINTREE_PUBLIC_KEY;
const privateKey = process.env.BRAINTREE_PRIVATE_KEY;

const gateway = new braintree.BraintreeGateway({ environment, merchantId, publicKey, privateKey });

app.post('/braintree/sandbox/client_tokens', async (req, res, next) => {
    const { clientToken } = await gateway.clientToken.generate();
    res.status(201).send({ value: clientToken });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
