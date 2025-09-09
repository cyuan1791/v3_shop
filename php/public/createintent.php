<?php

require_once 'shared.php';
header('Content-Type: application/json; charset=utf-8');

$json_data = file_get_contents('php://input');
$data      = json_decode($json_data, true);

try {
    $paymentIntent = $stripe->paymentIntents->create([
        'automatic_payment_methods' => ['enabled' => true],
        'amount'                    => (int) ($data['amount']),
        //'amount' => 1099,
        'currency'                  => $data['currency'],
    ]);
    $clientSecret = $paymentIntent->client_secret;
    echo json_encode(['clientSecret' => $clientSecret, 'data' => 'jsondtb' . $data['amount'], 'error' => ""]);
    exit;

} catch (\Stripe\Exception\ApiErrorException $e) {
    http_response_code(400);

    echo json_encode(value: ['clientSecret' => "", 'adata' => $json_data, 'error' => $e->getError()->message]);
    exit;
} catch (Exception $e) {
    error_log($e);
    http_response_code(500);
    exit;
}