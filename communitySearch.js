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
    var item = makeDropdownItem(
        comm.name,
        comm.state,
        comm.alternativeNames,
        i
    );
    item.addEventListener("click", function(event) {
        var commName =
            communities[event.currentTarget.getAttribute("data-index")].name;
        var commState =
            communities[event.currentTarget.getAttribute("data-index")].state;

        addCommunityTagToList(commName, commState);
    });
    addDropdownItem(item);
}

function addDropdownItem(item) {
    document.getElementById("dropdown-items").appendChild(item);
}

// Add communities to dropdown

function showDropdown() {
    showElementById("dropdown-items");
}
function hideDropdown() {
    hideElementById("dropdown-items");
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
        commName = a[i].getElementsByClassName("name-span")[0].innerText;

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

function tagExistsInList(name) {
    var existingNames = document
        .getElementById("community-selection-chosen-area")
        .getElementsByClassName("name-span");
    var i;
    var exists = false;
    for (i = 0; i < existingNames.length; i++) {
        if (existingNames[i].innerText == name) {
            exists = true;
            break;
        }
    }
    return exists;
}

function addCommunityTagToList(name, state) {
    if (tagExistsInList(name)) {
        alert("Community is already in the list");
        return false;
    }
    var insideHTML = makeNameDiv(name, state);
    var tag = makeTag(insideHTML);
    addCommunityTag(tag);
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

///////////////////////////
// HTML ELEMENT CREATION //
///////////////////////////

function makeTag(nameDiv) {
    var tag = document.createElement("div");

    tag.classList = "chosen-community-tag bbox";
    tag.appendChild(nameDiv);
    var x = makeRemoveTagButton();
    tag.appendChild(x);
    return tag;
}

function makeRemoveTagButton() {
    var x = document.createElement("div");
    x.classList = "remove-tag-icon";
    var icon = document.createElement("i");
    icon.classList = "fa fa-times";
    x.appendChild(icon);
    x.addEventListener("click", function() {
        var list = document.getElementById("community-selection-chosen-area");
        list.removeChild(this.parentElement);
    });
    return x;
}

function makeDropdownItem(name, stateOrTerritory, alternativeNames, index) {
    item = document.createElement("div");
    item.classList = "dropdown-item bbox";
    item.setAttribute("data-index", index);
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
    nameDiv.classList = "name-div";
    var nameSpan = document.createElement("span");
    nameSpan.innerText = name;
    nameSpan.classList = "name-span";
    nameDiv.appendChild(nameSpan);

    if (!(stateOrTerritory === "")) {
        var stateSpan = document.createElement("span");
        stateSpan.classList = "state-span";
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
    return alternativeNamesDiv;
}

//////////////////////
// HELPER FUNCTIONS //
//////////////////////

function showElementById(id) {
    document.getElementById(id).style.display = "block";
}

function hideElementById(id) {
    document.getElementById(id).style.display = "none";
}
