<?php
# New Patient
if (isset($_REQUEST['patientId'])) {

    require_once 'config.php';
    require_once 'response.php';
    // Sanitizing Names
    $firstname = filter_var(trim($_REQUEST['patientFirstName']), FILTER_VALIDATE_REGEXP, array("options" => array("regexp" => "/^[a-zA-Z ]+$/")));
    $lastname = filter_var(trim($_REQUEST['patientLastName']), FILTER_VALIDATE_REGEXP, array("options" => array("regexp" => "/^[a-zA-Z ]+$/")));
    $middlename = filter_var(trim($_REQUEST['patientMiddleName']), FILTER_VALIDATE_REGEXP, array("options" => array("regexp" => "/^[a-zA-Z ]+$/")));
    $telephone = filter_var(trim($_REQUEST['patientTelephone']), FILTER_VALIDATE_REGEXP, array("options" => array("regexp" => "/^[+0-9]+$/")));
    $id = $_REQUEST['patientId'];
    $patient_type = $_REQUEST['patientType'];
    $addr = $_REQUEST['patientAddress'];
    $reg_date = $_REQUEST['dateOfRegistration'];
    $category = $_REQUEST['patientCategory'];


    if ($firstname == NULL) {
        $response["error"] = "First Name is Invalid";
        print(json_encode($response, JSON_PRETTY_PRINT));
        return FALSE;
    } elseif ($lastname == NULL) {
        $response["error"] = 'Last Name is Invalid';
        print(json_encode($response, JSON_PRETTY_PRINT));
        return FALSE;
    } elseif ($middlename == NULL) {
        $response["error"] = 'Middle Name is Invalid';
        print(json_encode($response, JSON_PRETTY_PRINT));
        return FALSE;
    } elseif ($telephone == NULL) {
        $response["error"] = 'Telephone Number is Invalid';
        print(json_encode($response, JSON_PRETTY_PRINT));
        return FALSE;
    }

    // Procedures
    if ($_REQUEST['patientCategory'] == 'Family') {
        $entity = $_REQUEST['familyName'];
        $new_patient_record = "INSERT INTO patient (
        patient_id, patient_first_name, patient_last_name, 
        patient_middle_name, patient_mobile_no, patient_address, patient_type, 
        patient_category, date_registered, patient_entity
    ) VALUES (
        '$id','$firstname','$lastname','$middlename','$telephone',
        '$addr','$patient_type','$category','$reg_date','$entity'
    )";
    } elseif ($_REQUEST['patientCategory'] == 'Corporate') {
        $entity = $_REQUEST['companyName'];
        $new_patient_record = "INSERT INTO patient (
        patient_id, patient_first_name, patient_last_name, 
        patient_middle_name, patient_mobile_no, patient_address, patient_type, 
        patient_category, date_registered, patient_entity
    ) VALUES (
        '$id','$firstname','$lastname','$middlename','$telephone',
        '$addr','$patient_type','$category','$reg_date','$entity'
    )";
    } else {
        $new_patient_record = "INSERT INTO patient (
        patient_id, patient_first_name, patient_last_name, 
        patient_middle_name, patient_mobile_no, patient_address, patient_type, 
        patient_category, date_registered
    ) VALUES (
        '$id','$firstname','$lastname','$middlename','$telephone',
        '$addr','$patient_type','$category','$reg_date'
    )";
    }

    // Adding patient record
    $patient_result = $conn->query($new_patient_record);
    // $transaction_record = $conn->query($new_transaction_record);
    $response = new Notification();

    if ($patient_result === TRUE) {
        $response->status = TRUE;
        $response->success = "Thank you: $firstname, Record has been Added";
        print(json_encode($response, JSON_PRETTY_PRINT));
    } else {
        $response->status = FALSE;
        $response->error = "Patient ID $id, already exist";
        print(json_encode($response, JSON_PRETTY_PRINT));
    }
}

// Patient Entity List
if (isset($_REQUEST["entityData"])) {
    require 'response.php';
    $get_data['entityList'] = entity($_REQUEST["entityData"]);
    print(json_encode($get_data, JSON_PRETTY_PRINT));
}
