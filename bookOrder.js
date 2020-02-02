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
    "Books 4 Toddlers": ["1.1.jpg", "1.2.jpg", "1.3.jpg"],
    "Books 4 Kids": ["2.1.jpg", "2.2.jpg", "2.3.jpg"],
    "Books 4 Big Kids": ["3.1.jpg", "3.2.jpg", "3.3.jpg"],
    "Books 4 Community": ["4.1.jpg", "4.2.jpg", "4.3.jpg"],
};

var pdfs = {
    "Books 4 Toddlers": "",
    "Books 4 Kids": "",
    "Books 4 Big Kids": "",
    "Books 4 Community": "",
};

var orgCommunities = [
    { name: "Gapuwiyak (Lake Evella)", id: "23" },
    { name: "Maningrida", id: "42" },
    { name: "Gunbalanya (Oenpelli)", id: "78" },
    { name: "Wugularr (Beswick)", id: "90" },
];

// Add book packs
var i;
var bookPacksArea = document.getElementById("all-book-packs");
for (i = 0; i < bookPacks.length; i++) {
    var pack = bookPacks[i];
    var isAvailable = pack.isAvailable == "true" ? true : false;
    var packDiv = makeBookPack(pack.name, pack.description, isAvailable);
    bookPacksArea.appendChild(packDiv);
}

function makeBookPack(name, description, isAvailable) {
    var newPack = document.createElement("div");
    var packImg = document.createElement("img");

    packImg.src = "./images/1.1.jpg";
    newPack.appendChild(packImg);
    newPack.classList = "book-pack-displaybox";

    // Name
    var packName = document.createElement("span");
    packName.innerText = name;
    newPack.appendChild(packName);
    return newPack;
}

function makeSlideShow(images, packNumber) {
    var slideshowContainer = document.createElement("div");
    slideshowContainer.className = "slideshow-container";

    var i;
    for (i = 0; i < images.length; i++) {
        // Make slide
        var slide = document.createElement("div");
        slide.className = "slides bookpack-" + packNumber;
        // Only show the first slide initially
        slide.style.display = i == 0 ? "block" : "none";
        // Text with slide number
        var numberText = document.createElement("div");
        numberText.className = "numbertext";
        slideNum = i + 1;
        numberText.innerText = slideNum + " / " + images.length;
        slide.appendChild(numberText);
        // Slide image
        var slideImg = document.createElement("img");
        slideImg.src = images[i];
        slideImg.className = "slide-img";
    }
}

// Slideshow

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n, whichBookPack) {
    showSlides((slideIndex += n), whichBookPack);
}

// Thumbnail image controls
function currentSlide(n, whichBookPack) {
    showSlides((slideIndex = n), whichBookPack);
}

function showSlides(n, whichBookPack) {
    var i;
    var slides = document.getElementsByClassName("slides " + whichBookPack);
    var dots = document.getElementsByClassName("dot " + whichBookPack);
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
