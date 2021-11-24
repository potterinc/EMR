
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


// Password Verification Asychronous Request 
$('#VerifyAccount').on('click', () => {
    validateInput('validateAccount');

    //Sending asynchronous request
    if (Authenticate.flag == true) {
        $.ajax({
            url: 'https://filmplace.potterincorporated.com/config/auth.php',
            dataType: Authenticate.JSON,
            type: Authenticate.type.POST,
            beforeSend: () => {
                $('#VerifyAccount').html('<img src="./images/preloader/fading_circles.gif" width="32" />')
            },
            data: {
                verifiedEmail: Authenticate.Email.val(),
                answer: Authenticate.Answer.val(),
                securityQuestion: Authenticate.Question.val()
            },
            success: (asyncRequest) => {
                Authenticate.Email.val(null);
                Authenticate.Answer.val(null);
                Authenticate.Question.val('null');
                $('#VerifyAccount').html('Verify');
                if (asyncRequest.Status === true) {
                    $('#small-dialog2').html(Authenticate.ChangePassword);
                    Authenticate.verifiedUserId.val(asyncRequest.userId);
                }
                else {
                    $('#AccountVerificationStatus').html(asyncRequest.Message);
                    setTimeout(() => {
                        $('#AccountVerificationStatus').fadeOut(1000);
                    }, 5000);
                    $("#AccountVerificationStatus").val(null).show();
                }
            }
        })
        Authenticate.flag = false;
        return Authenticate.flag;
    }
});


// Password Reset Asychronous Request 
$('#PasswordReset').click(() => {
    validateInput('validatePassword');

    //Sending asynchronous request
    if (Authenticate.flag == true) {

        if (Authenticate.confirmNewPassword.val() === Authenticate.Password.val()) {

            setTimeout(() => {
                $.ajax({
                    url: 'https://filmplace.potterincorporated.com/config/auth.php',
                    dataType: Authenticate.JSON,
                    type: Authenticate.type.POST,
                    data: {
                        password: Authenticate.Password.val(),
                        userId: Authenticate.verifiedUserId.val()
                    },
                    beforeSend: () => {
                        $('#PasswordReset').html('<img src="./images/preloader/fading_circles.gif" width="32" />');
                    },
                    success: (asyncRequest) => {
                        Authenticate.Password.val(null);
                        Authenticate.confirmNewPassword.val(null);
                        $('#PasswordReset').html('Reset Password');
                        if (asyncRequest.Status == true) {
                            $('#PasswordResetStatus').html(asyncRequest.Message);
                            $('#PasswordReset').html('Redirecting...')
                            setTimeout(() => {
                                $('#PasswordResetStatus').fadeOut(1000);
                                $('#PasswordResetStatus').val(null).show();
                                location.href = 'index.html';
                            }, 5000)
                        }
                    }
                })
            }, 3000)
            Authenticate.flag = false;
            return Authenticate.flag;
        }
        else {
            $('#PasswordResetStatus').html('<span class="w3-animate-top w3-amber w3-btn-block w3-padding-8 w3-center">Password Does not match<br>Try Again.</span>')
            Authenticate.Password.val(null);
            Authenticate.confirmNewPassword.val(null);
            $('#PasswordReset').html('Reset Password');
            setTimeout(() => {
                $('#PasswordResetStatus').fadeOut(1000);
                $('#PasswordResetStatus').val(null).show()
            }, 5000)
            Authenticate.flag = false;
            return Authenticate.flag;
        }
    }

});

// New User Registration
$('#SignUp').click(() => {
    validateInput('validateUser');
    //Sending asynchronous request
    if (Authenticate.flag == true) {
        $.ajax({
            url: 'https://filmplace.potterincorporated.com/config/auth.php',
            type: Authenticate.type.POST,
            dataType: Authenticate.JSON,
            data: {
                fullName: SignUp.fullName.val(),
                newUserEmail: SignUp.Email.val(),
                telephone: SignUp.telephone.val(),
                NewSecurityQuestion: SignUp.Question.val(),
                answer: SignUp.Answer.val(),
                password: SignUp.Password.val(),
                dateOfRegistration: SignUp.getToday()
            },
            beforeSend: () => {
                $('#SignUp').html('<img src="./images/preloader/fading_circles.gif" width="32" />');
            },
            success: (asyncRequest) => {
                SignUp.fullName.val(null);
                SignUp.Email.val(null);
                SignUp.telephone.val(null);
                SignUp.Question.val('null');
                SignUp.Answer.val(null);
                SignUp.Password.val(null);
                $('#SignUp').html('Sign Up');

                $('#SignUpNotification').html(asyncRequest.Message);
                setTimeout(() => {
                    $('#SignUpNotification').fadeOut(1000);
                    $('#SignUpNotification').val(null).show();
                    location.href = 'index.html';
                }, 5000)
            }
        })
        Authenticate.flag = false;
        return Authenticate.flag;
    }
})

/**
 * File Upload algorithm
 */

// $('#UploadPicture').click(() => {
//     validateInput('validateUpload');

//     if (Authenticate.flag == true) {
//         let formData = new FormData(form);
//         $.ajax({
//             url: 'https://filmplace.potterincorporated.com/config/upload.php',
//             type: Authenticate.type.POST,
//             // dataType: Authenticate.JSON,
//             contentType: false,
//             cache: false,
//             processData: false,
//             dataType: Authenticate.JSON,
//             data: formData,
//             beforeSend: () => {
//                 $('#UploadPicture').html('<img src="./images/preloader/upload.gif" width="32" />');
//             },

//             success: (asyncRequest) => {
//                 Upload.Address.val(null);
//                 Upload.Category.val(null)
//                 Upload.Country.val('null')
//                 Upload.Owner.val(null)
//                 Upload.City.val(null)
//                 Upload.Cost.val(null)
//                 Upload.Description.val(null);
//                 $("#UploadStatus").html(asyncRequest.Message);

//                 setTimeout(() => {
//                     $('#UploadStatus').fadeOut(1000);
//                     $('#UploadStatus').val(null).show();
//                     location.href = 'main.html';
//                 }, 5000)

//             }
//         });
//     }
//     Authenticate.flag = false;
// })

// Search algorithm

$('#Search').click(() => {
    validateInput('validateKeyword');

    if (Authenticate.flag == true)
        Search.match();
    else
        return false;
})

$('#logout').click(() => {
    Login.logout();
})

// Advance search

// $('#advanceSearch').click(function () {
//     validateInput('validateAdvance');
//     if (Authenticate.flag == true) {
//         Search.advance();
//         Authenticate.flag = false;
//     }

// })

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
            return false;
        }
    }
    Authenticate.flag = true;
}

var Login = {
    Username: $('#login-username'),
    Password: $('#login-password'),
    loginSession: () => {
        if (localStorage.getItem('status') === 'true') {
            $('.menu-title').html(localStorage.getItem('name'))
            $('#userID').html(localStorage.getItem('id'))
            $('#owner').val(localStorage.getItem('name'));
            $('#owner-phone').val(localStorage.getItem('telephone'))
        }
        else
            location.href = 'index.html';
    },
    logout: () => {
        localStorage.clear();
        location.href = 'index.html';
    },
    activeSession: () => {
        if (localStorage.getItem('status') == 'true')
            location.href = 'main.html';
    },
    signIn: () => {
        $.ajax({
            url: 'controller/authenticate.php',
            type: Authenticate.type.POST,
            dataType: Authenticate.JSON,
            beforeSend: () => {
                $('#sign-in-button').html('<label></label>')
                $('#sign-in-button label').addClass('loader')
            },
            data: {
                username: Login.Username.val(),
                password: Login.Password.val(),
            },
            success: (asyncRequest) => {
                serverResponse.status = asyncRequest.status;
                serverResponse.userID = asyncRequest.userID;
                serverResponse.firstName = asyncRequest.firstName;
                serverResponse.lastName = asyncRequest.lastName;
                serverResponse.privilege = asyncRequest.priviledge;
                serverResponse.username = asyncRequest.username;
                serverResponse.error = asyncRequest.error;
            },
            complete: () => {
                if (serverResponse.status == true) {
                    localStorage.setItem('firstName', serverResponse.firstName);
                    localStorage.setItem('lastName', serverResponse.lastName)
                    localStorage.setItem('status', serverResponse.status);
                    localStorage.setItem('userID', serverResponse.userID);
                    localStorage.setItem('username', serverResponse.username);
                    localStorage.setItem('privilege', serverResponse.privilege);
                    location.href = 'pages/main.html';
                } else
                    $('#notification').html(serverResponse.error).addClass('label label-warning');
                Login.Username.val(null);
                Login.Password.val(null);
                $('#sign-in-button').html('Sign In');
                setTimeout(() => {
                    $('#notification').fadeOut(1000);
                    $('#notification').val(null).removeClass('label label-warning').show();
                }, 5000)
            }
        })

    }
}

var SignUp = {
    fullName: $('#FullName'),
    telephone: $('#Telephone'),
    Question: $('#NewQuestion'),
    Email: $('#NewEmail'),
    Answer: $('#NewAnswer'),
    Password: $('#NewPassword'),
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

var Authenticate = {
    flag: false,
    Email: $('#Email'),
    Password: $('#ResetPassword'),
    JSON: 'JSON',
    type: { POST: 'POST', GET: 'GET' },
    Question: $('#SecurityQuestion'),
    Answer: $('#Answer'),
    ChangePassword: $('#Reset'), //Change Password markup
    verifiedUserId: $('#VerifiedUserId'),
    confirmNewPassword: $('#ConfirmResetPassword'),
}

var Upload = {
    Address: $('#Address'),
    Category: $('#Category'),
    Country: $('#Country'),
    City: $('#City'),
    Cost: $('#Cost'),
    Preview: $('#ImagePreview'),
    Description: $('#Description'),
    Owner: $('.menu-title'),
    Currency: $('#Currency'),
    avialablity: 1
}

var Search = {
    keyword: $('#keyword'),
    city: $('#city'),
    country: $('#Country'),
    category: $('#category'),
    match: () => {
        $.ajax({
            url: 'https://filmplace.potterincorporated.com/config/search.php',
            type: Authenticate.type.POST,
            beforeSend: () => {
                $('#previewUploads').html('<img src="images/preloader/house_loading.gif" />')
            },
            data: { keyword: Search.keyword.val() },
            success: (asyncRequest) => {
                $('#previewUploads').html(asyncRequest);
                $('#searchTitle').html('Search Result');
            }
        })
        Authenticate.flag = false;
    },
    advance: () => {
        $.ajax({
            url: 'config/search.php',
            type: Authenticate.type.POST,
            dataType: Authenticate.JSON,
            beforeSend: () => $('#previewUploads').html('<img src="images/dual-ring-loader.gif" />'),
            data: {
                city: Search.city.val(),
                category: Search.category.val(),
                country: Search.country.val(),
            },
            success: (asyncRequest) => {
                $('#previewUploads').html(asyncRequest);
                $('#searchTitle').html('Search Result');
                // $('#resultCount').html(asyncRequest.count);
            }
        })
    }
}


const serverResponse = {
    error: "",
    message: "",
    status: undefined,
    userID: "",
    firstName: "",
    lastName: "",
    privilege: "",
    username: ""
}


// var Preview = {
//     latestUploads: () => {
//         $.ajax({
//             url: 'https://filmplace.potterincorporated.com/config/search.php',
//             type: Authenticate.type.GET,
//             beforeSend: () => $('#previewUploads').html('<img src="images/preloader/house_loading.gif" width="25" />'),
//             data: { login: true },
//             success: (asyncRequest) => $('#previewUploads').html(asyncRequest)
//         })
//     },
//     myGallery: () => {
//         $.ajax({
//             url: 'https://filmplace.potterincorporated.com/config/gallery.php',
//             type: Authenticate.type.POST,
//             data: {
//                 activeUser: localStorage.getItem('status'),
//                 owner: localStorage.getItem('name'),
//                 telephone: localStorage.getItem('telephone')
//             },
//             success: (asyncRequest) => $('#gallery').html(asyncRequest)
//         })
//     }
// }

/**
 * Camera Plugin
 */
// $.getScript('../node_modules/cordova-plugin-camera/types/index.d.ts');

// let Photo = {
//     cameraOptions: {
//         quality: '80',
//         destinationType: Camera.DestinationType.FILE_URI,
//         sourceType: Camera.PictureSourceType.CAMERA,
//         mediaType: Camera.MediaType.PICTURE,
//         encodingType: Camera.EncodingType.JPEG,
//         cameraDirection: Camera.Direction.BACK,
//         targetWidth: 320,
//         targetHeight: 200,
//         saveToPhotoAlbum: true
//     },
//     Init: () => $('#camera-btn').click(() => Photo.takePhoto()),
//     takePhoto: () => navigator.camera.getPicture(callbackSuccess(), callbackFailure(), Photo.cameraOptions),
//     callbackSuccess: (imgURI) => $('#imagePreview').text(imgURI),
//     callbackFailure: (failureMsg) => $('#imagePreview').text(failureMsg)
// }
// document.addEventListener('deviceready', Photo.Init())

/**
 * Password input toggle
 */

let inputTypPwd = true;
$('#password-view').click(() => {

    if (inputTypPwd == true) {
        $('#LoginPassword').attr('type', 'text');
        inputTypPwd = false;
        return false;
    }

    if (inputTypPwd == false) {
        $('#LoginPassword').attr('type', 'password')
        inputTypPwd = true;
        return false;
    }
})