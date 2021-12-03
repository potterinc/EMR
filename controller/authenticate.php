<?php

require_once 'config.php';
$response = new Notification;

# Login Algorithm
if (isset($_REQUEST['username'])) {

    $username = filter_var(trim($_REQUEST['username']), FILTER_VALIDATE_REGEXP, array("options" => array("regexp" => "/^[a-zA-Z0-9.@_]+$/")));

    // Parameters
    $login_query = "SELECT * FROM users WHERE user_username='$username'";
    $result = $conn->query($login_query);

    if ($result->num_rows > 0) {
        while ($data = $result->fetch_assoc()) {
            # DECRYPT PASSWORD
            if (password_verify($_REQUEST['password'], $data['user_password'])) {
                $response->username = $data['user_username'];
                $response->status = TRUE;
                $response->userID = $data['user_id'];
                $response->privilege = $data['user_privilege'];
                $response->firstname = $data['user_firstname'];
                $response->lastname = $data['user_lastname'];
                print(json_encode($response, JSON_PRETTY_PRINT));
            } else {
                $response->error = 'Invalid Username or Password';
                print(json_encode($response, JSON_PRETTY_PRINT));
            }
        }
    } else {
        $response->status = FALSE;
        $response->error = "Username does not exist";
        print(json_encode($response, JSON_PRETTY_PRINT));
    }
}

# New Account
if (isset($_REQUEST['firstname']) && isset($_REQUEST['lastname'])) {
    // Sanitize Name and Email
    $firstname = filter_var(trim($_REQUEST['firstname']), FILTER_VALIDATE_REGEXP, array("options" => array("regexp" => "/^[a-zA-Z ]+$/")));
    $lastname = filter_var(trim($_REQUEST['lastname']), FILTER_VALIDATE_REGEXP, array("options" => array("regexp" => "/^[a-zA-Z ]+$/")));
    $username = filter_var(trim($_REQUEST['newUsername']), FILTER_VALIDATE_REGEXP, array("options" => array("regexp" => "/^[a-zA-Z0-9@_.]+$/")));
    $password = password_hash($_REQUEST['newPassword'], PASSWORD_BCRYPT);
    $security_question = $_REQUEST['securityQuestion'];
    $answer = $_REQUEST['answer'];
    $date_ = $_REQUEST['dateOfRegistration'];

    if ($firstname == NULL) {
        $response->error = "Firstname is Invalid";
        print(json_encode($response, JSON_PRETTY_PRINT));
        return FALSE;
    } elseif ($lastname == NULL) {
        $response->error = 'Lastname is Invalid';
        print(json_encode($response, JSON_PRETTY_PRINT));
        return FALSE;
    } elseif ($username == NULL) {
        $response->error = 'Invalid username: avoid using "\'", or "-", or ",", or "/"';
        print(json_encode($response, JSON_PRETTY_PRINT));
        return FALSE;
    }

    $sign_up = "INSERT INTO users (user_firstname,user_lastname,
    user_username,user_password,user_question,user_answer) 
    VALUES ('$firstname','$lastname','$username','$password',
    '$security_question','$answer')";

    $result = $conn->query($sign_up);
    if ($result == TRUE) {
        $response->status = TRUE;
        $response->success = "Registration Successful";
    } else {
        $response->status = FALSE;
        $response->error = "Username already exists: Try Again";
    }
    print(json_encode($response, JSON_PRETTY_PRINT));
}

# Password verification
if (isset($_REQUEST['userName']) && isset($_REQUEST['answer'])) {

    $username = filter_var(trim($_REQUEST['userName']), FILTER_VALIDATE_REGEXP, array("options" => array("regexp" => "/^[a-zA-Z0-9.@_]+$/")));
    $verify_user = "SELECT * FROM users WHERE 
    user_username='$username' AND 
    user_question = '" . $_REQUEST['question'] . "' 
    AND user_answer='" . $_REQUEST["answer"] . "'";

    $result = $conn->query($verify_user);
    if ($result->num_rows > 0) {
        while ($data = $result->fetch_assoc()) {
            $response->success = "<i class='fa fa-check'></i> Verified user, ".$data['user_firstname'];
            $response->status = TRUE;
            $response->userID = intval($data['user_id']);
        }
        print(json_encode($response, JSON_PRETTY_PRINT));
    } else {
        $response->error = '<i class="fa fa-times"></i> Failed '.$conn->error;
        $response->status = FALSE;
        print(json_encode($response, JSON_PRETTY_PRINT));
    }
}

# CHANGE PASSWORD
if (isset($_REQUEST['newassword'])) {
    if ($_REQUEST['newPassword'] == $_REQUEST['verifyNewPassword']) {
        $update_action = "UPDATE celteck_user SET user_password='" . password_hash($_REQUEST["newPassword"], PASSWORD_DEFAULT) .
            "' WHERE user_id=" . $_REQUEST["userId"];
        $result = $conn->query($update_action);
        $data['status'] = TRUE;
        $data['msg'] = '<small class="alert alert-success w3-animate-bottom">Pasword Changed <a href="index.html">Sign In</a></small>';
        print(json_encode($data));
    } else {
        $data['error'] = '<small class="alert alert-danger w3-animate-bottom">Password Does not Match</small>';
        return FALSE;
        print(json_encode($data));
    }
}

# INITIALIZING DATABASE

if (isset($_REQUEST['queryDB'])) {
    $sql = "SELECT * FROM celteck_user";
    $result = $conn->query($sql);

    if ($result->num_rows == 0)
        $db_response['DBStatus'] = NULL;
    else
        $db_response['DBStatus'] = $result->num_rows;

    print(json_encode($db_response));
}
