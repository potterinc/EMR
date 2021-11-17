<?php

// Corporate
if (isset($_REQUEST['companyName'])) {

    require_once 'config.php';
    require_once 'response.php';

    $company_name = filter_var(trim($_REQUEST['companyName']), FILTER_VALIDATE_REGEXP, array("options" => array("regexp" => "/^[a-zA-Z 0-9\/]+$/")));
    $company_telephone = filter_var(trim($_REQUEST['companyTelephone']), FILTER_VALIDATE_REGEXP, array("options" => array("regexp" => "/^[+0-9]+$/")));
    $company_address = $_REQUEST['companyAddress'];
    $entity_type = $_REQUEST['entityType'];

    if ($company_telephone == NULL) {
        $response["error"] = 'Phone Number is Invalid';
        print(json_encode($response, JSON_PRETTY_PRINT));
        return FALSE;
    } elseif ($company_name == NULL) {
        $response["error"] = 'Company Name is Invalid';
        print(json_encode($response, JSON_PRETTY_PRINT));
        return FALSE;
    }

    // Procedures
    $entity_record = "INSERT INTO entity (
            entity_name, entity_contact, entity_address, entity_type
        ) VALUES (
            '$company_name','$company_telephone','$company_address',
            '$entity_type'
        )";

    // Adding patient record
    $_result = $conn->query($entity_record);
    // $activity = $conn->query($new_activity);
    $response = new Notification();

    if ($_result === TRUE) {
        $response->status = TRUE;
        $response->success = "Record added";
        print(json_encode($response, JSON_PRETTY_PRINT));
    } else {
        $response->status = FALSE;
        $response->error = "FAILED: " . $conn->error;
        print(json_encode($response, JSON_PRETTY_PRINT));
    }
}

// Family
if (isset($_REQUEST['familyName'])) {

    require_once 'config.php';
    require_once 'response.php';

    $family_name = filter_var(trim($_REQUEST['familyName']), FILTER_VALIDATE_REGEXP, array("options" => array("regexp" => "/^[a-zA-Z ]+$/")));
    $family_telephone = filter_var(trim($_REQUEST['familyTelephone']), FILTER_VALIDATE_REGEXP, array("options" => array("regexp" => "/^[+0-9]+$/")));
    $family_address = $_REQUEST['familyAddress'];
    $entity_type = $_REQUEST['entityType'];

    if ($family_telephone == NULL) {
        $response["error"] = 'Phone Number is Invalid';
        print(json_encode($response, JSON_PRETTY_PRINT));
        return FALSE;
    } elseif ($family_name == NULL) {
        $response["error"] = 'Family Name is Invalid';
        print(json_encode($response, JSON_PRETTY_PRINT));
        return FALSE;
    }
    // Procedures
    $entity_record = "INSERT INTO entity (
            entity_name, entity_contact, entity_address, entity_type
        ) VALUES (
            '$family_name','$family_telephone','$family_address',
            '$entity_type'
        )";

    // Adding patient record
    $_result = $conn->query($entity_record);
    // $activity = $conn->query($new_activity);
    $response = new Notification();

    if ($_result === TRUE) {
        $response->status = TRUE;
        $response->success = "Record added";
        print(json_encode($response, JSON_PRETTY_PRINT));
    } else {
        $response->status = FALSE;
        $response->error = "FAILED: " . $conn->error;
        print(json_encode($response, JSON_PRETTY_PRINT));
    }
}
