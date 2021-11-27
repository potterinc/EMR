$(() => {

    var Appointment = {
        startDate: $('#appointment-date-from'),
        endDate: $('#appointment-date-to'),
        searchRecord: () => {
            $.ajax({
                url: '../controller/appointment.php',
                type: Authenticate.type.POST,
                dataType: Authenticate.JSON,
                data: {
                    start: Appointment.startDate.val(),
                    end: Appointment.endDate.val()
                },
                beforeSend: () => {
                    $('#appointment-data').html('Please wait...')
                    $('#search-button').val('Searching')
                },

                success: (asyncRequest) => {
                    // var requestData = JSON.stringify(asyncRequest);
                    ServerResponse.data = asyncRequest.result;
                    ServerResponse.error = asyncRequest.error;
                    ServerResponse.status = asyncRequest.status;
                },
                complete: () => {
                    $('#search-button').val('Search')
                    if (ServerResponse.status == true)
                        $('#appointment-data').html(ServerResponse.data);
                    else
                        $('#appointment-data').html(ServerResponse.error);
                }
            })
        },

        /**
         * 
         * @param {Date} appDate 
         * @param {String} pID 
         * @param {String} appStatus 
         */
        initRecord: (appDate, pID, appStatus) => {
            $.ajax({
                url: "../controller/appointment.php",
                dataType: Authenticate.JSON,
                type: Authenticate.type.POST,
                data: {
                    appDate: appDate,
                    patientID: pID,
                    appointmentStatus: appStatus
                },
                beforeSend: () => { $('#appointment-data').html('Please wait...') },
                success: (asyncRequest) => ServerResponse.data = asyncRequest.success,
                complete: () => $('#appointment-data').html(ServerResponse.data)
            })
        }
    }


    // Authentication Handle
    var Authenticate = {
        flag: false,
        JSON: 'json',
        type: { POST: 'POST', GET: 'GET' },
        validateInput: (inputArgs) => {
            var validInput = $('[' + inputArgs + ']');
            for (var formInput = 0; formInput < validInput.length; formInput++) {
                if (validInput.get(formInput).value == null || validInput.get(formInput).value == '') {
                    validInput[formInput].placeholder = 'This field is required';
                    return false;
                }
            }
            Authenticate.flag = true;
        },
        getToday: () => {
            // const monthNames = ["January", "February", "March", "April", "May", "June",
            //     "July", "August", "September", "October", "November", "December"];
            var dateObj = new Date(),
                m = (dateObj.getMonth() + 1).toString(),
                month = (m.length == 1) ? '0' + m : m,

                d = dateObj.getDate().toString(),
                day = (d.length == 1) ? '0' + d : d,

                year = dateObj.getFullYear();
            return year + "-" + month + "-" + day;
        }
    }


    // Respose Handler
    var ServerResponse = {
        success: "",
        error: "",
        status: "",
        data: ""
    }

    $('#search-button').on('click', () => Appointment.searchRecord())
    Appointment.initRecord(Authenticate.getToday());

})
