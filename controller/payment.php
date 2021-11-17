<?php

// Payment Record
if (isset($_REQUEST['patientId'])) {

    require_once 'config.php';
    require_once 'response.php';
    // Sanitizing Names
    $id = $_REQUEST['patientId'];
    $amount_paid = $_REQUEST['amount'];
    $payment_method = $_REQUEST['paymentMethod'];
    $service_type = $_REQUEST['service'];
    $transaction_date = $_REQUEST['transactionDate'];
    $payment_description = $_REQUEST['details'];

    // Procedures
        $transaction_record = "INSERT INTO transactions (
            patient_id, service_type, deposit, payment_type,
            transaction_date, payment_description
    ) VALUES (
        '$id','$service_type',$amount_paid,'$payment_method',
        '$transaction_date','$payment_description'
    )";

    // Adding patient record
    $_result= $conn->query($transaction_record);
    // $activity = $conn->query($new_activity);
    $response = new Notification();

    if ($_result === TRUE) {
        $response->status = TRUE;
        $response->success = "Payment Successful";
        print(json_encode($response, JSON_PRETTY_PRINT));
    } else {
        $response->status = FALSE;
        $response->error = "FAILED: ". $conn->error;
        print(json_encode($response, JSON_PRETTY_PRINT));
    }
}