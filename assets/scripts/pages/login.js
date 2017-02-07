/*
 *  Document   : login.js
 *  Author     : samson
 *  Description: Custom JS code used in Login Page
 */
var BasePagesLogin = function() {
    // Init Login Form Validation, for more examples you can check out https://github.com/jzaefferer/jquery-validation
    var initValidationLogin = function(){
        jQuery('.js-validation-login').validate({
            errorClass: 'help-block text-right animated fadeInDown',
            errorElement: 'div',
            errorPlacement: function(error, e) {
                jQuery(e).parents('.form-group > div').append(error);
            },
            highlight: function(e) {
                jQuery(e).closest('.form-group').removeClass('has-error').addClass('has-error');
                jQuery(e).closest('.help-block').remove();
            },
            success: function(e) {
                jQuery(e).closest('.form-group').removeClass('has-error');
                jQuery(e).closest('.help-block').remove();
            },
            rules: {
                'login-email': {
                    required: true,
                    email : true
                },
                'login-password': {
                    required: true,
                    minlength: 6
                }
            },
            messages: {
                'login-username': {
                    required: 'Please enter a username',
                    minlength: 'Your username must consist of at least 3 characters'
                },
                'login-password': {
                    required: 'Please provide a password',
                    minlength: 'Your password must be at least 6 characters long'
                }
            }
        });
    };

    var initAuth = function (){
        // Initialize Firebase
        const config = {
            apiKey: "AIzaSyAtD3STZ5ML82cHXf-ME3fqpfXdbeb65QA",
            authDomain: "knowyourcity-91f64.firebaseapp.com",
            databaseURL: "https://knowyourcity-91f64.firebaseio.com",
            storageBucket: "knowyourcity-91f64.appspot.com",
            messagingSenderId: "669843503412"
        };
        firebase.initializeApp(config);

        const loginemail = document.getElementById('login-email');
        const loginpassword = document.getElementById('login-password');

        const email = loginemail.value;
        const pass = loginpassword.value;
        const auth = firebase.auth();

        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e = console.log(e.message));

    };

    return {
        init: function () {
            // Init Login Form Validation
            initValidationLogin();
            initAuth();
        }
    };


}();

// Initialize when page loads
jQuery(function(){ BasePagesLogin.init(); });