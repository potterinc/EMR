<?php

// Patients Listings
if (isset($_REQUEST["patient"])) {
    require 'response.php';
    $get_data['patients'] = list_patients();
    print(json_encode($get_data, JSON_PRETTY_PRINT));
}

// Todays Appointments
if (isset($_REQUEST["appDate"])) {
    require 'response.php';
    $appDate = $_REQUEST['appDate'];

    $app_data['success'] = init_appointments($appDate);
    print(json_encode($app_data, JSON_PRETTY_PRINT));
}

// Appointment Search
if (isset($_REQUEST['start']) || isset($_REQUEST['end'])) {
    require_once 'response.php';
    $search_result = appointment_search();
    print(json_encode($search_result, JSON_PRETTY_PRINT));
}

# New Appointment Record
if (isset($_REQUEST['patientId'])) {
    require_once 'response.php';
    $new_appointment_record = new_appointment();
    print(json_encode($new_appointment_record, JSON_PRETTY_PRINT));
}

// Update Appointment Records
if (isset($_REQUEST['recordID'])) {
    require_once 'response.php';
    $status_update = update_status();
    print(json_encode($status_update, JSON_PRETTY_PRINT));
}
// Initializing Drugs
// if (isset($_REQUEST["drugs"])) {
//     require 'response.php';
//     $get_data['drugList'] = init_drugs();
//     print(json_encode($get_data, JSON_PRETTY_PRINT));
// }
