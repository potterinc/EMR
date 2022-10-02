<?php

// New Appointment Record
function new_appointment()
{
    require_once 'config.php';
    // Sanitizing Names
    $firstname = filter_var(trim($_REQUEST['patientFirstName']), FILTER_VALIDATE_REGEXP, array("options" => array("regexp" => "/^[a-zA-Z]+$/")));
    $lastname = filter_var(trim($_REQUEST['patientLastName']), FILTER_VALIDATE_REGEXP, array("options" => array("regexp" => "/^[a-zA-Z]+$/")));
    $middlename = filter_var(trim($_REQUEST['patientMiddleName']), FILTER_VALIDATE_REGEXP, array("options" => array("regexp" => "/^[a-zA-Z]+$/")));
    $id = $_REQUEST['patientId'];
    $telephone = $_REQUEST['patientTelephone'];
    $time = $_REQUEST['appointmentTime'];
    $drug = $_REQUEST['prescribedDrug'];
    $date = $_REQUEST['appointmentDate'];
    $dosage = $_REQUEST['prescriptionDosage'];
    $frequency = $_REQUEST['prescriptionFrequency'];
    $duration = $_REQUEST['prescriptionDuration'];
    $purpose = $_REQUEST['purpose'];
    $further_details = $_REQUEST['detials'];
    $status = 'Pending';


    if ($firstname == NULL) {
        $response["error"] = "First Name is Invalid";
        return $response;
        return FALSE;
    } elseif ($lastname == NULL) {
        $response["error"] = 'Last Name is Invalid';
        return $response;
        return FALSE;
    } elseif ($middlename == NULL) {
        $response["error"] = 'Middle Name is Invalid';
        return $response;
        return FALSE;
    }

    // Procedures
    $appointment_record = "INSERT INTO appointments (
        patient_id, first_name, middle_name, last_name, patient_telephone, 
        purpose, further_details, prescribed_drug, dosage, duration, 
        drug_frequency, appointment_status, appointment_date, appointment_time
    ) VALUES (
        '$id','$firstname','$middlename','$lastname','$telephone',
        '$purpose','$further_details','$drug',$dosage,$duration,
        '$frequency','$status','$date','$time'
    )";

    // Adding patient record
    $appointment_result = $conn->query($appointment_record);
    // $activity = $conn->query($new_activity);
    $response = new Notification();

    if ($appointment_result === TRUE) {
        $response->status = TRUE;
        $response->success = "Record has been Added";
        return $response;
    } else {
        $response->status = FALSE;
        $response->error = "Failed: " . $conn->error;
        return $response;
    }
}

// Patient Listings
function list_patients()
{
    require 'config.php';
    $query_patients = "SELECT patient_id FROM patient";
    $query_result = $conn->query($query_patients);
    if ($query_result->num_rows > 0) {
        $data = "";
        while ($patient_data = $query_result->fetch_assoc()) {
            $data .= "<option value='{$patient_data['patient_id']}'>{$patient_data['patient_id']}</option>";
        }
    } else
        $data = "<option disabled>No Record found</option>";
    return $data;
}

// List Entities
function entity($type)
{
    require 'config.php';
    $entity_query = "SELECT entity_name FROM entity WHERE entity_type='$type'";
    $query_result = $conn->query($entity_query);
    if ($query_result->num_rows > 0) {
        $data = "";
        while ($entity_data = $query_result->fetch_assoc()) {
            $data .= "<option value='{$entity_data['entity_name']}'>{$entity_data['entity_name']}</option>";
        }
    } else
        $data = "<option disabled>No Record found</option>";
    return $data;
}

// List Drugs
function init_drugs()
{
    require 'config.php';
    $entity_query = "SELECT entity_name FROM entity WHERE entity_type='$type'";
    $query_result = $conn->query($entity_query);
    if ($query_result->num_rows > 0) {
        $data = "";
        while ($entity_data = $query_result->fetch_assoc()) {
            $data .= "<option value='{$entity_data['entity_name']}'>{$entity_data['entity_name']}</option>";
        }
    } else
        $data = "<option disabled>No Record found</option>";
    return $data;
}

// Appointment Data
function init_appointments($appDate)
{
    require 'config.php';
    $appointment_query = "SELECT * FROM appointments WHERE 
    appointment_date='$appDate'";
    $appResult = $conn->query($appointment_query);
    if ($appResult->num_rows > 0) {
        $data = "";
        while ($appointment_data = $appResult->fetch_assoc()) {
            $data .= "
            <tr>
                <td>{$appointment_data['patient_id']}</td>
                <td>{$appointment_data['first_name']} {$appointment_data['last_name']}</td>
                <td>{$appointment_data['purpose']}</td>
                <td>{$appointment_data['appointment_date']}</td>
                <td>{$appointment_data['appointment_status']}</td>
                <td><button onclick='updateStatus(\"" . $appointment_data['id'] . "\")' class='btn btn-success' title='Update Record' type='button'>
                <i class='fa fa-check-circle'></i></button>
                </td>
            </tr>
            ";
        }
    } else
        $data = "No Records Found";
    return $data;
}

/** Appointment Search */
function appointment_search()
{
    require 'config.php';
    $start = $_REQUEST['start'];
    $end = $_REQUEST['end'];

    // Procedures
    $search_query = "SELECT * FROM appointments WHERE
    appointment_date BETWEEN '$start' AND '$end'";
    $search_result = $conn->query($search_query);
    $response = new Notification();
    $response->result = "";

    if ($search_result->num_rows > 0) {
        while ($search_data = $search_result->fetch_assoc()) {
            $response->status = TRUE;
            $response->result .= "
            <tr>
                <td>" . $search_data['patient_id'] . "</td>
                <td>" . $search_data['first_name'] . " " . $search_data['last_name'] . "</td>
                <td>" . $search_data['purpose'] . "</td>
                <td>" . $search_data['appointment_date'] . "</td>
                <td>" . $search_data['appointment_status'] . "</td>
                <td><button onclick='updateStatus(\"" . $search_data['id'] . "\")' class='btn btn-success' title='Update Record' type='button'>
                <i class='fa fa-check-circle-o'></i></button>
                </td>
            </tr>
            ";
        }
        return $response;
    } else {
        $response->status = FALSE;
        $response->error = 'No Record Found';
        return $response;
    }
}

// Update Appointment Records
function update_status()
{
    require 'config.php';
    $recordID = $_REQUEST['recordID'];

    // Procedures
    $status_query = "UPDATE appointments SET appointment_status='Completed' WHERE id=$recordID";
    $status_result = $conn->query($status_query);
    $response = new Notification();
    $response->success = 'Status Updated';
    return $response;
}
