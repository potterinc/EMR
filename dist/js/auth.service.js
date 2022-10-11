
/**
 * 
 * @param {HTMLAttribute} inputArgs 
 * @returns 
 */
function validateInput(inputArgs) {
    var validInput = $('[' + inputArgs + ']');
    for (var formInput = 0; formInput < validInput.length; formInput++) {
        if (validInput.get(formInput).value == null || validInput.get(formInput).value == '') {
            validInput[formInput].placeholder = 'This field is required';
            validInput[formInput].style.borderLeftWidth = '5px';
            validInput[formInput].style.borderStyle = 'solid';
            validInput[formInput].style.borderLeftColor = '#a00';
            return false;
        }
    }
    Authenticate.flag = true;
}

var Login = {
    Username: $('#login-username'),
    Password: $('#login-password'),
    logout: () => {
        localStorage.clear();
        location.href = 'index.html';
    },
    activeSession: () => {
        if (localStorage.getItem('loginStatus') == 'true')
            location.href = 'main.html';
    },
    signIn: () => {
        $.ajax({
            url: 'controller/authenticate.php',
            type: Authenticate.type.POST,
            dataType: Authenticate.JSON,
            beforeSend: () => {
                $('#sign-in-button').html('<label>')
                $('#sign-in-button label').addClass('loader')
            },
            data: {
                username: Login.Username.val(),
                password: Login.Password.val(),
            },
            success: (asyncRequest) => {
                APIResponse = asyncRequest;
                APIResponse.User = {
                    username: asyncRequest.username,
                    id: asyncRequest.userID,
                    firstName: asyncRequest.firstname,
                    lastName: asyncRequest.lastname,
                    privilege: asyncRequest.privilege
                }
            },
            complete: () => {
                Login.Username.val(null);
                Login.Password.val(null);
                $('#sign-in-button').html('Sign In');
                if (APIResponse.status) {
                    localStorage.setItem('User', JSON.stringify(APIResponse.User));
                    localStorage.setItem('loginStatus', APIResponse.status);
                    location.href = 'pages/main.html';
                } else {
                    $('#notification').html(APIResponse.error).addClass('label label-warning');
                    setTimeout(() => {
                        $('#notification').fadeOut(1000);
                        $('#notification').val(null).removeClass('label label-warning').show();
                    }, 5000)
                }
            }
        })

    }
}

var SignUp = {
    firstName: $('#new-first-name'),
    lastName: $('#new-last-name'),
    securityQuestion: $('#security-question'),
    securityAnswer: $('#security-answer'),
    username: $('#new-username'),
    password: $('#new-password'),
    confirmPassword: $('#confirm-password'),

    register: () => {
        $.ajax({
            url: '../controller/authenticate.php',
            type: Authenticate.type.POST,
            dataType: Authenticate.JSON,
            data: {
                firstname: SignUp.firstName.val(),
                lastname: SignUp.lastName.val(),
                securityQuestion: SignUp.securityQuestion.val(),
                answer: SignUp.securityAnswer.val(),
                newUsername: SignUp.username.val(),
                newPassword: SignUp.password.val(),
                dateOfRegistration: SignUp.getToday()
            },
            beforeSend: () => {
                $('#new-user').html('<label>');
                $('#new-user label').addClass('loader');
            },
            success: (asyncRequest) => {
                APIResponse.status = asyncRequest.status;
                APIResponse.error = asyncRequest.error;
                APIResponse.message = asyncRequest.message;
            },
            complete: () => {
                SignUp.firstName.val(null)
                SignUp.lastName.val(null)
                SignUp.securityQuestion.val(null)
                SignUp.securityAnswer.val(null)
                SignUp.username.val(null)
                SignUp.password.val(null)
                SignUp.confirmPassword.val(null)
                $('#new-user').html('Register');
                if (APIResponse.status == true) {
                    $('#notification').html(APIResponse.message).addClass('label label-success');
                    setTimeout(() => {
                        $('#notification').html('Redirecting...');
                        $('#notification').fadeOut(1000);
                        $('#notification').val(null).removeClass('label label-success label-success').show();
                        location.href = '../index.html';
                    }, 5000)
                }
                else {
                    $('#notification').html(APIResponse.error).addClass('label label-warning');
                    setTimeout(() => {
                        $('#notification').fadeOut(1000);
                        $('#notification').val(null).removeClass('label label-warning').show();
                    }, 5000)
                }
            }
        })
    },
    validateUser: () => {
        $.ajax({
            url: '../controller/authenticate.php',
            dataType: Authenticate.JSON,
            type: Authenticate.type.POST,
            beforeSend: () => {
                $('#validate-user').html('<label>')
                $('#validate-user label').addClass('loader')
            },
            data: {
                userName: SignUp.username.val(),
                answer: SignUp.securityAnswer.val(),
                question: SignUp.securityQuestion.val()
            },
            success: (asyncRequest) => {
                APIResponse.error = asyncRequest.error;
                APIResponse.message = asyncRequest.message;
                APIResponse.status = asyncRequest.status;
                APIResponse.userID = asyncRequest.userID;
            },
            complete: () => {
                SignUp.username.val(null);
                SignUp.securityAnswer.val(null);
                SignUp.securityQuestion.val('null');

                if (APIResponse.status) {
                    $('#notification').html(APIResponse.message).addClass('label label-success');
                    $('#userID').html(APIResponse.userID);
                    setTimeout(() => {
                        $('#notification').fadeOut(1000).val(null).removeClass('label label-success').show();
                        $('#reset-form-label').html('Enter new password');
                        $('#validate-account').html($('#reset-password').show())
                    }, 3000);
                } else {
                    $('#notification').html(APIResponse.error).addClass('label label-danger');

                    setTimeout(() => {
                        $('#validate-user').html('Validate');
                        $('#notification').fadeOut(1000).val(null).removeClass('label label-danger').show();
                    }, 5000);
                }
            }
        })
    },
    /**
     * Get the current date of the client system in YYYY-DD-MM format
     */
    getToday: () => {
        // const monthNames = ["January", "February", "March", "April", "May", "June",
        //     "July", "August", "September", "October", "November", "December"];
        let dateObj = new Date();
        let month = String(dateObj.getMonth()).padStart(2, '0');
        let day = String(dateObj.getDate()).padStart(2, '0');
        let year = dateObj.getFullYear();
        let output = year + "-" + month + "-" + day;
        return output;
    }
}

const Authenticate = {
    flag: false,
    JSON: 'JSON',
    type: { POST: 'POST', GET: 'GET' },
    Question: $('#SecurityQuestion'),
    Answer: $('#Answer'),
    ChangePassword: $('#Reset'), //Change Password markup
    verifiedUserId: $('#VerifiedUserId'),
    confirmNewPassword: $('#ConfirmResetPassword'),
    resetPassword: () => {
        $.ajax({
            url: '../controller/authenticate.php',
            dataType: Authenticate.JSON,
            type: Authenticate.type.POST,
            data: {
                newPassword: $('#new-password').val(),
                userId: $('#userID').html()
            },
            beforeSend: () => {
                $('#save-password').html('<label>');
                $('#save-password label').addClass('loader');
            },
            success: (asyncRequest) => {
                $('#new-password').val(null);
                $('#confirm-password').val(null);
                $('#save-password').html('Change Password');
                if (asyncRequest.status) {
                    $('#notification').addClass('label label-success');
                    $('#notification').html(asyncRequest.message)
                    $('#save-password').html('Redirecting...')
                    setTimeout(() => {
                        location.href = '../index.html';
                    }, 5000)
                }
            }
        })
    },
    init: () => {
        $.ajax({
            url: 'controller/authenticate.php',
            type: 'POST',
            dataType: 'json',
            data: { dbNull: true },
            success: (res) => {
                APIResponse = res;
            },
            complete: () => {
                if (APIResponse.dbNull)
                    $('#register').show();
            },
        })
    }
}

var APIResponse = {
    // error: undefined,
    // message: undefined,
    // status: undefined,
    // data: undefined
}

// let inputTypPwd = true;
// $('#password-view').click(() => {

//     if (inputTypPwd == true) {
//         $('#LoginPassword').attr('type', 'text');
//         inputTypPwd = false;
//         return false;
//     }

//     if (inputTypPwd == false) {
//         $('#LoginPassword').attr('type', 'password')
//         inputTypPwd = true;
//         return false;
//     }
// })