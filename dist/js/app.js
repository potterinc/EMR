// Initialize user data
const User = JSON.parse(localStorage.getItem('User'));

$(() => {

    // Logout
    $('#logout').on('click', Login.logout)

    // Append user data
    $('.active-user').html(`${User.firstName} ${User.lastName}`);
    $('.role').html(`${User.privilege}`)
    $('.doe').html(`${User.dateOfEmployment}`)
})
