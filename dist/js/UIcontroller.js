/**
 * NEW PATIENT
 */
$('#new-individual').click(() => $('#UIPanel').load('pages/patient.html'))
$('#new-corporate').click(() => $('#UIPanel').load('pages/corporate.html'))
$('#new-family').click(() => $('#UIPanel').load('pages/family.html'))

/*
 * APPOINTMENTS
 */
$('#new-payment').click(() => $('#UIPanel').load('pages/payment.html'))
$('#new-refund').click(() => $('#UIPanel').load('pages/refund.html'))
$('#new-appointment').click(() => $('#UIPanel').load('pages/appointment.html'))
// $('#all-appointment').click(() => $('#UIPanel').load('pages/appointments/view-all-appointment.html'))
$('#update-appointment-records').click(() => $('#UIPanel').load('pages/appointments/individual-appointment.html'))


/**
 * ENTITY
 */
$('#corporate-entity').click(() => $('#UIPanel').load('pages/corporate-entity.html'))
$('#family-entity').click(() => $('#UIPanel').load('pages/family-entity.html'))
