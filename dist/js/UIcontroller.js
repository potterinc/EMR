/**
 * NEW PATIENT
 */
$('#new-individual').on('click', () => $('#UIPanel').load('patient.html'))
$('#new-corporate').on('click', () => $('#UIPanel').load('corporate.html'))
$('#new-family').on('click', () => $('#UIPanel').load('family.html'))

/*
 * APPOINTMENTS
 */
$('#new-payment').on('click', () => $('#UIPanel').load('payment.html'))
$('#new-refund').on('click', () => $('#UIPanel').load('refund.html'))
$('#new-appointment').on('click', () => $('#UIPanel').load('appointment.html'))
// $('#all-appointment').on(() => $('#UIPanel').load('appointments/view-all-appointment.html'))
$('#update-appointment-records').on('click', () => $('#UIPanel').load('appointments/individual-appointment.html'))


/**
 * ENTITY
 */
$('#corporate-entity').on('click', () => $('#UIPanel').load('corporate-entity.html'))
$('#family-entity').on('click', () => $('#UIPanel').load('family-entity.html'))
