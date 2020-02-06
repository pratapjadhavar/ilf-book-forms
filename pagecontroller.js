/*
 * @Purpose			: JS Controller for ILF Donation page
 * @Author			: Rabaab (Dreamwares)
 * @Created Date	: 02 - Nov - 2018
 */

var isDonateOnce, isIndividual; //Records donation type
var amount; //Records the amount
var donationType, paymentMethod;
var firstName = "",
    lastName = "",
    address = "",
    email = "",
    phone = "",
    orgName = "",
    website = "";
var donationData = new Object();
var paymentDetails = new Object();
var paypalPaymentDetails = new Object();
var creditCardDetails = new Object();

$(document).ready(function() {
    //Initializing the page
    // doInit();

    //--- Validating inputs ---//
    $("#Website").blur(function() {
        if (
            $(this)
                .val()
                .trim()
                .match("[a-zA-Z]{3,88}$")
        ) {
            website = $(this)
                .val()
                .trim();
            $("#Website").val(website);
            $("#websiteAddressError").hide();
        } else {
            firstName = "";
            $("#websiteAddressError").show();
        }
    });

    $("#FirstName").blur(function() {
        if (
            $(this)
                .val()
                .trim()
                .match("[a-zA-Z]{3,88}$")
        ) {
            firstName = $(this)
                .val()
                .trim();
            $("#FirstName").val(firstName);
            $("#FirstNameError").hide();
        } else {
            firstName = "";
            $("#FirstNameError").show();
        }
    });

    $("#LastName").blur(function() {
        if (
            $(this)
                .val()
                .trim()
                .match("[a-zA-Z]{3,88}$")
        ) {
            lastName = $(this)
                .val()
                .trim();
            $("#LastName").val(lastName);
            $("#LastNameError").hide();
        } else {
            lastName = "";
            $("#LastNameError").show();
        }
    });

    $("#Address").blur(function() {
        address = $(this)
            .val()
            .trim();
    });

    $("#OrganizationName").blur(function() {
        if (isRequiredMissing("OrganizationName")) {
            orgName = "";
            $("#OrganizationNameError").show();
        } else {
            orgName = $(this).val();
            $("#OrganizationNameError").hide();
        }
    });
    $("#Email").blur(function() {
        if (validateEmail("Email")) {
            email = $(this)
                .val()
                .trim();
            $("#Email").val(email);
            $("#emailAddressError").hide();
        } else {
            email = "";
            $("#emailAddressError").show();
        }
    });

    $("#PhoneNumber").blur(function() {
        if (validatePhone("PhoneNumber")) {
            phone = $(this)
                .val()
                .trim();
            $("#PhoneNumber").val(phone);
            $("#phoneNumberError").hide();
        } else {
            phone = "";
            $("#phoneNumberError").show();
        }
    });

    //--- Validation Ends ---//
});

/*
 * @Purpose	: Checks if required field missing
 */
function isRequiredMissing(elementName) {
    var val = $("#" + elementName)
        .val()
        .trim();
    if (val === "") {
        return true;
    }
    return false;
}

/*
 * @Purpose	: Validates email
 */
function validateEmail(Email) {
    var a = $("#" + Email)
        .val()
        .trim();
    var filter = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z ]{1,4}$/;
    if (filter.test(a)) {
        return true;
    } else {
        return false;
    }
}

/*
 * @Purpose	: Validates phone number
 */
function validatePhone(Phone) {
    var a = $("#" + Phone)
        .val()
        .trim();
    var filter = /^[0-9-+ ]+$/;
    if (filter.test(a)) {
        return true;
    } else {
        return false;
    }
}

/*
 * @Purpose	: Show / hide button
 */
function EnableDisableEFT() {
    if (isDonateOnce && !isIndividual) {
        //$('#EFTChequePaymentMode').removeAttr('disabled');
        $("#EFTChequePaymentMode").show();
    } else {
        $("#EFTChequePaymentMode").hide();
        //$('#EFTChequePaymentMode').attr('disabled','disabled');
    }
}

function htmlDecode(value) {
    return $("<div/>")
        .html(value)
        .text();
}

/*
 * Selects Credit card payment mode
 */
function selectCreditCard() {
    //Make credit card option selected
    paymentMethod = "Credit Card";
    $(".payment-mode").removeClass("active");
    $("#creditCardPaymentMode").addClass("active");

    //Show credit card details
    $(".paymentMode").hide();
    $("#credit-card-details").show();
    $("#submitDonationDiv").show();
}

function validate() {
    var reCaptchaResponse = grecaptcha.getResponse();

    if (
        firstName === "" ||
        lastName === "" ||
        email === "" ||
        (!isIndividual && orgName === "") ||
        phone === ""
    ) {
        showDetailsErrors();
        scrollTo("custom", 0, 0);
        $.toast({
            heading: "Error",
            text: "Please fill all the required fields",
            position: "top-center",
            icon: "error",
        });
        return false;
    } else if (
        paymentMethod == "Credit Card" &&
        (creditCardDetails.nameOnCard == null ||
            creditCardDetails.cardNumber == null ||
            creditCardDetails.cvv == null ||
            creditCardDetails.expiryMonth == null ||
            creditCardDetails.expiryYear == null)
    ) {
        showCardDetailsErrors();
        $.toast({
            heading: "Error",
            text: "Please provide all credit card details",
            position: "top-center",
            icon: "error",
        });
        return false;
    } /*else if(paymentMethod == 'PayPal' && !paypalPaymentDetails.paymentDone){
        $.toast({
            heading: 'Error',
            text: 'Please make payment using PayPal Checkout option',
            position: 'top-center',
            icon: 'error'
        })
        return false;
    }*/ else if (
        reCaptchaResponse.length == 0
    ) {
        $.toast({
            heading: "Error",
            text: "Validate captcha!",
            position: "top-center",
            icon: "error",
        });
        return false;
    } else {
        return true;
    }
}

function showDetailsErrors() {
    if (firstName === "") {
        $("#FirstNameError").show();
    }
    if (lastName === "") {
        $("#LastNameError").show();
    }
    if (email === "") {
        $("#emailAddressError").show();
    }
    if (!isIndividual && orgName === "") {
        $("#OrganizationNameError").show();
    }
    if (phone === "") {
        $("#phoneNumberError").show();
    }
}
