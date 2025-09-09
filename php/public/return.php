<?php
require_once 'shared.php';

// Returning after redirecting to a payment method portal.
$paymentIntent = $stripe->paymentIntents->retrieve(
   $_GET['payment_intent'],
);
echo json_encode(value: ['amount' => $paymentIntent->amount, 'currency' => $paymentIntent->currency]);
exit;
/* 
      <p>Status: <?= $paymentIntent->status; ?></p>
<p>Amount: <?= $paymentIntent->amount; ?></p>
<p>Currency: <?= $paymentIntent->currency; ?></p>
<p>Payment Method: <?= $paymentIntent->payment_method; ?></p> */