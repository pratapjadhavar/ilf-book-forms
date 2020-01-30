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
        name: "Yuendumu",
        state: "NT",
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

console.log("len", communities.length);

var i;
for (i = 0; i < communities.length; i++) {
    comm = communities[i];
    item = makeDropdownItem(comm.name, comm.state, comm.alternativeNames);
    document.getElementById("dropdown-items").appendChild(item);
}

function makeDropdownItem(name, state, alternativeNames) {
    item = document.createElement("div");
    // Name
    nameSpan = document.createElement("span");
    nameSpan.innerText = name;
    nameSpan.classList = "dropdown-name-span";

    item.appendChild(nameSpan);

    if (!(alternativeNames == "")) {
        alternativeNamesSpan = document.createElement("span");
        alternativeNamesSpan.innerText = alternativeNames;
        alternativeNamesSpan.classList = "dropdown-alt-names-span";
        item.appendChild(alternativeNamesSpan);
    }
    return item;
}

// Add communities to dropdown

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("dropdown-content").classList.toggle("show");
}

function showDropdown() {
    console.log("showing dropdown");

    document.getElementById("dropdown-items").style.display = "block";
}
function hideDropdown() {
    document.getElementById("dropdown-items").style.display = "none";
}

function filterFunction(e) {
    // e.preventDefault();

    var input, filter, ul, li, a, i;
    input = document.getElementById("ilf-search-bar");
    filter = input.value.toUpperCase();

    console.log(filter.length);

    if (filter.length < 1) {
        hideDropdown();
    } else if (filter.length == 1) {
        showDropdown();
    }

    div = document.getElementById("dropdown-items");
    a = div.getElementsByTagName("span");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

function checkEnter() {
    console.log(this);
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
        if (event.code == "Enter") {
            searchBar = document.getElementById("ilf-search-bar");
            text = searchBar.value;
            var newTag = makeTag(text);
            addCommunityTag(newTag);
            searchBar.value = "";
        }
    });
