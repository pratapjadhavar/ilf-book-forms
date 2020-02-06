/*
 * @Purpose			: JS Controller for ILF Order form
 * @Author			: Rabaab (Dreamwares), Dan (Small Multiples)
 * @Created Date	: 02 - Nov - 2018
 */

var contactName = "",
    orgName = "",
    address = "",
    town = "",
    postCode = "",
    email = "",
    phone = "";

$(document).ready(function() {
    //Initializing the page
    // doInit();

    //--- Validating inputs ---//
    $("#ContactName").blur(function() {
        if (
            $(this)
                .val()
                .trim()
        ) {
            contactName = $(this)
                .val()
                .trim();
            $("#ContactName").val(contactName);
            $("#ContactNameError").hide();
        } else {
            firstName = "";
            $("#ContactNameError").show();
        }
    });

    $("#OrganisationName").blur(function() {
        if (
            $(this)
                .val()
                .trim()
        ) {
            orgName = $(this)
                .val()
                .trim();
            $("#OrganisationName").val(orgName);
            $("#orgNameError").hide();
        } else {
            firstName = "";
            $("#orgNameError").show();
        }
    });

    $("#PostalAddress").blur(function() {
        if (
            $(this)
                .val()
                .trim()
        ) {
            address = $(this)
                .val()
                .trim();
            $("#PostalAddress").val(address);
            $("#PostalAddressError").hide();
        } else {
            firstName = "";
            $("#PostalAddressError").show();
        }
    });

    $("#TownOrSuburb").blur(function() {
        if (
            $(this)
                .val()
                .trim()
        ) {
            town = $(this)
                .val()
                .trim();
            $("#TownOrSuburb").val(town);
            $("#TownOrSuburbError").hide();
        } else {
            firstName = "";
            $("#TownOrSuburbError").show();
        }
    });

    $("#Postcode").blur(function() {
        if (
            $(this)
                .val()
                .trim()
                .match("[0-9]{4}$")
        ) {
            postCode = $(this)
                .val()
                .trim();
            $("#Postcode").val(postCode);
            $("#PostcodeError").hide();
        } else {
            postCode = "";
            $("#PostcodeError").show();
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

function htmlDecode(value) {
    return $("<div/>")
        .html(value)
        .text();
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
