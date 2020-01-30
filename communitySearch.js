var communities = [
    {
        name: "Gunbalanya (Oenpelli)",
        state: "NT",
        alternativeNames: "Kunbarlanja, Kunbarllanjnja",
    },
    {
        name: "Gulgagulganeng",
        state: "WA",
        alternativeNames: "",
    },
    {
        name: "Yuendumu",
        state: "NT",
        alternativeNames: "",
    },
    {
        name: "Kintore",
        state: "WA",
        alternativeNames: "",
    },
    {
        name: "Maningrida",
        state: "NT",
        alternativeNames: "",
    },
    {
        name: "Gapuwiyak (Lake Evella)",
        state: "NT",
        alternativeNames: "",
    },
];

var i;
for (i = 0; i < communities.length; i++) {
    comm = communities[i];
    item = makeDropdownItem(comm.name, comm.state, comm.alternativeNames);
    addDropdownItem(item);
}

function addDropdownItem(item) {
    document.getElementById("dropdown-items").appendChild(item);
}

function makeDropdownItem(name, stateOrTerritory, alternativeNames) {
    item = document.createElement("div");
    item.classList = "dropdown-item bbox";
    // Name
    var nameSpan = makeNameDiv(name, stateOrTerritory);
    item.appendChild(nameSpan);

    if (!(alternativeNames == "")) {
        var alternativeNamesDiv = makeAlternativeNameDiv(alternativeNames);
        item.appendChild(alternativeNamesDiv);
    }
    return item;
}

function makeNameDiv(name, stateOrTerritory) {
    var nameDiv = document.createElement("div");
    var nameSpan = document.createElement("span");
    nameSpan.innerText = name;
    nameSpan.classList = "dropdown-name-span";
    nameDiv.appendChild(nameSpan);

    if (!(stateOrTerritory === "")) {
        var stateSpan = document.createElement("span");
        stateSpan.classList = "dropdown-state-span";
        stateSpan.innerText = ", " + stateOrTerritory;
        nameDiv.appendChild(stateSpan);
    }
    return nameDiv;
}

function makeAlternativeNameDiv(alternativeNames) {
    var alternativeNamesDiv = document.createElement("div");
    var alternativeNamesSpan = document.createElement("span");
    var alsoKnownAsSpan = document.createElement("span");
    alternativeNamesSpan.innerText = alternativeNames;
    alsoKnownAsSpan.innerText = "Also known as: ";
    alternativeNamesSpan.classList = "dropdown-alt-names-span";
    alsoKnownAsSpan.classList = "dropdown-also-known-span";
    alternativeNamesDiv.classList = "dropdown-alt-names-div";
    alternativeNamesDiv.appendChild(alsoKnownAsSpan);
    alternativeNamesDiv.appendChild(alternativeNamesSpan);
    console.log(alternativeNamesDiv);

    return alternativeNamesDiv;
}

// Add communities to dropdown

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("dropdown-content").classList.toggle("show");
}

function showDropdown() {
    document.getElementById("dropdown-items").style.display = "block";
}
function hideDropdown() {
    document.getElementById("dropdown-items").style.display = "none";
}

function showElementById(id) {
    document.getElementById(id).style.display = "block";
}

function hideElementById(id) {
    document.getElementById(id).style.display = "none";
}

function filterFunction() {
    var input, filter, a, i, commName;
    input = document.getElementById("ilf-search-bar");
    filter = input.value.toUpperCase();

    if (filter.length < 1) {
        hideDropdown();
        hideElementById("dropdown-items-noresults");
    } else if (filter.length == 1) {
        showDropdown();
    }

    div = document.getElementById("dropdown-items");
    a = div.querySelectorAll(".dropdown-item");
    for (i = 0; i < a.length; i++) {
        var altName = "";
        commName = a[i].getElementsByClassName("dropdown-name-span")[0]
            .innerText;

        if (a[i].getElementsByClassName("dropdown-alt-names-span").length > 0) {
            altName = a[i].getElementsByClassName("dropdown-alt-names-span")[0]
                .innerText;
        }

        txtValue = commName + " " + altName;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
            showElementById("dropdown-items-noresults");
        }
    }
}

function makeTag(text) {
    var tag = document.createElement("div");
    var label = document.createElement("span");
    tag.classList = "chosen-community-tag";
    label.innerText = text;
    tag.appendChild(label);
    return tag;
}

function addCommunityTag(tag) {
    document.getElementById("community-selection-chosen-area").appendChild(tag);
}

document
    .getElementById("ilf-search-bar")
    .addEventListener("keydown", function(event) {
        console.log(event.code);
        if (event.code == "Enter") {
            searchBar = document.getElementById("ilf-search-bar");
            text = searchBar.value;
            var newTag = makeTag(text);
            addCommunityTag(newTag);
            searchBar.value = "";
        } else if (event.code == "ArrowDown") {
            // Make the selection go down
        } else if (event.code == "ArrowUp") {
            // Make the selection go up
        }
    });
