
// Login Asychronous Request
$('#sign-in-button').on('click', () => {
    validateInput('validateLogin') // Form Validation

    //Signing In
    if (Authenticate.flag == true) {
        Login.signIn();
        Authenticate.flag = false;
        return Authenticate.flag;
    }
});

// New User Registration
$('#new-user').on('click', () => {
    validateInput('validateUser');
    if (Authenticate.flag) {
        if (SignUp.password.val() == SignUp.confirmPassword.val()) {
            SignUp.register()
            Authenticate.flag = false;
            return Authenticate.flag;
        }
        else {
            $('#notification').html('Passwords does not match: Try agian').addClass('label label-warning');
            setTimeout(() => {
                $('#notification').fadeOut(1000);
                $('#notification').html(null).removeClass('label label-warning').show();
            }, 5000)
        }
    }
})

// Password Verification Asychronous Request 
$('#validate-user').on('click', () => {
    validateInput('validateUser');

    //Sending asynchronous request
    if (Authenticate.flag == true) {
        SignUp.validateUser();
        Authenticate.flag = false;
        return Authenticate.flag;
    }
});


// Password Reset Asychronous Request 
$('#save-password').on('click', () => {
    validateInput('checkPassword');

    //Sending asynchronous request
    if (Authenticate.flag == true) {

        if ($('#new-password').val() == $('#confirm-password').val()) {
            Authenticate.resetPassword();
            Authenticate.flag = false;
            return Authenticate.flag;
        }
        else {
            $('#notification').html('Password Does not match').addClass('label label-warning')
            $('save-password').html('Change Password');
            setTimeout(() => {
                $('#notification').fadeOut(1000);
                $('#notification').val(null)
                    .removeClass('label label-warning')
                        .show();
            }, 3000)
            Authenticate.flag = false;
            return Authenticate.flag;
        }
    }
});


$('#logout').on('click',() => {
    Login.logout();
})