var MAX_PACKS = 4;

var bookPacks = [
    {
        name: "Books 4 Toddlers",
        description:
            "A range of developmentally appropriate books suitable for young children aged 0-3 years old.",
        isAvailable: "true",
    },
    {
        name: "Books 4 Kids",
        description:
            "A pack of vibrant picture books aimed to grab the attention of 4-7 year olds.",
        isAvailable: "true",
    },
    {
        name: "Books 4 Big Kids",
        description:
            "A collection of books for all interests and reading levels for children aged 8 to 12",
        isAvailable: "true",
    },
    {
        name: "Books 4 Community",
        description:
            "From joke books and poetry, to animals and crafts, this pack is tailored for older readers.",
        isAvailable: "true",
    },
];

var images = {
    "Books 4 Toddlers": [
        "./images/1.1.jpg",
        "./images/1.2.jpg",
        "./images/1.3.jpg",
    ],
    "Books 4 Kids": [
        "./images/2.1.jpg",
        "./images/2.2.jpg",
        "./images/2.3.jpg",
    ],
    "Books 4 Big Kids": [
        "./images/3.1.jpg",
        "./images/3.2.jpg",
        "./images/3.3.jpg",
    ],
    "Books 4 Community": [
        "./images/4.1.jpg",
        "./images/4.2.jpg",
        "./images/4.3.jpg",
    ],
};

var pdfs = {
    "Books 4 Toddlers": "./files/dummy-pdf1.pdf",
    "Books 4 Kids": "./files/dummy-pdf1.pdf",
    "Books 4 Big Kids": "./files/dummy-pdf1.pdf",
    "Books 4 Community": "./files/dummy-pdf1.pdf",
};

var orgCommunities = [
    { name: "Gapuwiyak (Lake Evella)", id: "23" },
    { name: "Maningrida", id: "42" },
    { name: "Gunbalanya (Oenpelli)", id: "78" },
    { name: "Wugularr (Beswick)", id: "90" },
];

var prefillOrderDetails = {
    ContactName: "Nuala Smith",
    OrganisationName: "Arnhem Land After School Reading Program",
    PostalAddress: "PMB 111",
    TownOrSuburb: "Humpty Doo",
    State: "NT",
    Postcode: "0822",
    Email: "nuala@arnhemreading.com",
    PhoneNumber: "0845324446",
};

// Prefill form
document.getElementById("ContactName").value =
    prefillOrderDetails["ContactName"];
document.getElementById("OrganisationName").value =
    prefillOrderDetails["OrganisationName"];
document.getElementById("PostalAddress").value =
    prefillOrderDetails["PostalAddress"];
document.getElementById("TownOrSuburb").value =
    prefillOrderDetails["TownOrSuburb"];
document.getElementById("Postcode").value = prefillOrderDetails["Postcode"];
document.getElementById("Email").value = prefillOrderDetails["Email"];
document.getElementById("PhoneNumber").value =
    prefillOrderDetails["PhoneNumber"];

var stateSelectOptions = document.getElementById("State").children;
var i;
for (i = 0; i < stateSelectOptions.length; i++) {
    if (stateSelectOptions[i].value == prefillOrderDetails["State"]) {
        stateSelectOptions[i].setAttribute("selected", "");
    }
}

// Add book packs
var bookPacksArea = document.getElementById("all-book-packs");
for (i = 0; i < bookPacks.length; i++) {
    var pack = bookPacks[i];
    var isAvailable = pack.isAvailable == "true" ? true : false;
    var packNumber = i + 1;
    var packDiv = makeBookPack(
        pack.name,
        packNumber,
        pack.description,
        isAvailable
    );
    bookPacksArea.appendChild(packDiv);
}

// Add community checkboxes
var confirmCommunitiesDiv = document.getElementById(
    "confirm-communities-wrapper"
);
for (i = 0; i < orgCommunities.length; i++) {
    var community = orgCommunities[i];
    var communityCheckboxDiv = document.createElement("div");

    // Checkbox
    var commCheckbox = document.createElement("input");
    commCheckbox.type = "checkbox";
    commCheckbox.id = "confirm-" + community.name;
    commCheckbox.value = "confirm-" + community.name;
    commCheckbox.checked = "true";

    // Label
    var commLabel = document.createElement("label");
    commLabel.htmlFor = "confirm-" + community.name;
    commLabel.innerText = community.name;
    commLabel.className = "confirm-community-label";

    communityCheckboxDiv.appendChild(commCheckbox);
    communityCheckboxDiv.appendChild(commLabel);

    confirmCommunitiesDiv.appendChild(communityCheckboxDiv);
}

///////////////////
// MAKE ELEMENTS //
///////////////////

function makeBookPack(name, packNumber, description, isAvailable) {
    var newPack = document.createElement("div");
    newPack.className = "book-pack-displaybox";

    // Slideshow
    var slideShow = makeSlideShow(images[name], packNumber);
    newPack.appendChild(slideShow);

    // Description
    var packDesc = makePackInfoBox(name, description, isAvailable);
    newPack.appendChild(packDesc);

    // Bottom area (order quantity and PDF link)
    var bottomArea = document.createElement("div");
    bottomArea.className = "bookpack-quantity-pdf-container";

    // Order quantity
    bottomArea.appendChild(makePackNumberDropdown(name));

    // PDF info
    packPdfFilepath = pdfs[name];
    var pdfBox = makePdfBox(packPdfFilepath);
    bottomArea.appendChild(pdfBox);

    newPack.appendChild(bottomArea);

    return newPack;
}

// Book pack description
function makePackInfoBox(pName, pDesc, isAvail) {
    var packInfoBox = document.createElement("div");
    packInfoBox.className = "bookpack-info-box";
    var title = document.createElement("h4");
    title.innerText = pName;
    title.className = "bookpack-title";
    var packDescripion = document.createElement("p");
    packDescripion.innerText = pDesc;
    packDescripion.className = "bookpack-description";
    packInfoBox.appendChild(title);
    packInfoBox.appendChild(packDescripion);

    return packInfoBox;
}

// Link to PDF at the end of book pack
function makePdfBox(filepath) {
    var pdfContainer = document.createElement("div");
    var pdfInfoText = document.createElement("p");
    pdfContainer.className = "bookpack-pdf-container";

    // Link to PDF
    var pdfLink = document.createElement("a");
    pdfLink.href = filepath;
    pdfLink.target = "_blank";
    pdfLink.innerText = "View book pack contents";

    var pdfInfoText2 = document.createElement("p");
    pdfInfoText2.innerText = "(PDF opens in a new tab)";

    pdfInfoText.appendChild(pdfLink);
    pdfContainer.appendChild(pdfInfoText);
    pdfContainer.appendChild(pdfInfoText2);

    return pdfContainer;
}

// Dropdown for order quantity
function makePackNumberDropdown(packName) {
    var dropdownContainer = document.createElement("div");
    dropdownContainer.className = "bookpack-dropdown-container";
    var quantityLabel = document.createElement("span");
    quantityLabel.innerText = "Order quantity: ";
    var quantitySelect = document.createElement("select");
    quantitySelect.className = "quantity-select form-control";
    var i;
    for (i = 0; i < MAX_PACKS + 1; i++) {
        var quantOption = document.createElement("option");
        quantOption.value = i;
        quantOption.innerText = i;
        quantitySelect.appendChild(quantOption);
    }
    dropdownContainer.appendChild(quantityLabel);
    dropdownContainer.appendChild(quantitySelect);
    return dropdownContainer;
}

// Slideshow of book images
function makeSlideShow(slidePics, packNumber) {
    var slidesAndDots = document.createElement("div");
    var slideshowContainer = document.createElement("div");
    slideshowContainer.className = "slideshow-container";
    slidesAndDots.className = "slides-and-dots";

    var i;
    for (i = 0; i < slidePics.length; i++) {
        // Make slide
        var slide = document.createElement("div");
        slide.className = "slides bookpack-" + packNumber;
        // Only show the first slide initially
        slide.style.display = i == 0 ? "block" : "none";
        // Text with slide number
        var numberText = document.createElement("div");
        numberText.className = "numbertext";
        slideNum = i + 1;
        numberText.innerText = slideNum + " / " + slidePics.length;
        slide.appendChild(numberText);
        // Slide image
        var slideImg = document.createElement("img");
        slideImg.src = slidePics[i];
        slideImg.className = "slide-img";
        slide.appendChild(slideImg);
        // Add to slideshow
        slideshowContainer.appendChild(slide);
    }
    // Prev button
    var prevButton = document.createElement("a");
    prevButton.className = "prev";
    prevButton.addEventListener("click", function() {
        plusSlides(-1, "bookpack-" + packNumber);
    });
    var prevTextNode = document.createTextNode("❮");
    prevButton.appendChild(prevTextNode);
    slideshowContainer.appendChild(prevButton);
    // Next button
    var nextButton = document.createElement("a");
    nextButton.className = "next";
    nextButton.addEventListener("click", function() {
        plusSlides(1, "bookpack-" + packNumber);
    });
    var nextTextNode = document.createTextNode("❯");
    nextButton.appendChild(nextTextNode); // Forward symbol
    slideshowContainer.appendChild(nextButton);

    // Make dots?

    // return
    slidesAndDots.appendChild(slideshowContainer);
    // slidesAndDots.appendChild(dotsContainer);
    return slidesAndDots;
}

// Slideshow

var slideIndex = 1;
// showSlides(slideIndex);

// Next/previous controls
function plusSlides(n, whichBookPack) {
    showSlides((slideIndex += n), whichBookPack);
}

// Thumbnail image controls
function currentSlide(n, whichBookPack) {
    showSlides((slideIndex = n), whichBookPack);
}

function showSlides(n, whichBookPack) {
    console.log("props", n);
    console.log("which", whichBookPack);

    var i;
    var slides = document.getElementsByClassName("slides " + whichBookPack);

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    // Logic for dots?
    slides[slideIndex - 1].style.display = "block";
}
