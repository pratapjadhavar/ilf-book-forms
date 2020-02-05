// Selected community tags will have their 'data-id' attribute set to one of the ids in this list
// If they're not in the list, the attribute will be unset.

var communities = [
    {
        name: "Gunbalanya (Oenpelli)",
        state: "NT",
        alternativeNames: "Kunbarlanja, Kunbarllanjnja",
        id: "34",
    },
    {
        name: "Gulgagulganeng",
        state: "WA",
        alternativeNames: "",
        id: "35",
    },
    {
        name: "Yuendumu",
        state: "NT",
        alternativeNames: "",
        id: "42",
    },
    {
        name: "Kintore",
        state: "WA",
        alternativeNames: "",
        id: "235",
    },
    {
        name: "Maningrida",
        state: "NT",
        alternativeNames: "",
        id: "333",
    },
    {
        name: "Gapuwiyak (Lake Evella)",
        state: "NT",
        alternativeNames: "",
        id: "341",
    },
];

// Add all communities as dropdown items
var i;
for (i = 0; i < communities.length; i++) {
    comm = communities[i];
    var item = makeDropdownItem(
        comm.name,
        comm.state,
        comm.alternativeNames,
        comm.id,
        i
    );
    item.addEventListener("click", addTagListener);
    addDropdownItem(item);
}
// Add "Add new community" item
var extraItem = makeDropdownItem("", "", "", null, null);
extraItem.getElementsByClassName("name-span")[0].id = "add-community-name";

item.addEventListener("click", addTagListener);
addDropdownItem(extraItem);

function addTagListener(event) {
    var commName, commState, commId;
    var userAddedCommunity = event.currentTarget.querySelector(
        "#add-community-name"
    );
    if (userAddedCommunity) {
        commName = userAddedCommunity.innerText;
        commState = "";
    } else {
        commName =
            communities[event.currentTarget.getAttribute("data-index")].name;
        commState =
            communities[event.currentTarget.getAttribute("data-index")].state;
        commId = communities[event.currentTarget.getAttribute("data-index")].id;
    }

    addCommunityTagToList(commName, commState, commId);
    hideDropdown();
    clearSearchInput();
}

// Filter the dropdown list based on user input
function filterFunction(event) {
    // Ignore non-character keys
    if (
        isEnterEvent(event) ||
        isArrowUpEvent(event) ||
        isArrowDownEvent(event) ||
        isShiftEvent(event)
    ) {
        return;
    }

    var input = event.currentTarget;
    var val = input.value;
    var filter = val.toUpperCase();

    if (filter.length < 1) {
        hideDropdown();
    } else {
        showDropdown();
    }

    var shownItemIndex = 0;
    var dropDownItemsContainer = document.getElementById("dropdown-items");
    var dropdownItems = dropDownItemsContainer.querySelectorAll(
        ".dropdown-item"
    );
    getId("add-community-name").innerText = val;

    var i;
    var found = false;
    for (i = 0; i < dropdownItems.length; i++) {
        // var community = communities[i] || {};
        var commName = dropdownItems[i].querySelector(".name-span").innerText;
        var altName = "";
        if (dropdownItems[i].querySelector(".dropdown-alt-names-span")) {
            altName = dropdownItems[i].querySelector(".dropdown-alt-names-span")
                .innerText;
        }
        var txtValue = commName + " " + altName;

        // "Add new community"
        // if ()

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            dropdownItems[i].style.display = "";
            dropdownItems[i].setAttribute("shown-item-index", shownItemIndex);
            shownItemIndex++;
            found = true;
        } else {
            dropdownItems[i].style.display = "none";
            dropdownItems[i].removeAttribute("shown-item-index");
        }
    }
    if (!found) {
        showElementById("dropdown-items-noresults");
    }
}

// Enter key or arrow in search bar
getId("ilf-search-bar").addEventListener("keydown", function(event) {
    var searchBar = document.getElementById("ilf-search-bar");
    if (isEnterEvent(event)) {
        // Check first to see if an item is selected
        var selectedItems = document.querySelectorAll(
            ".dropdown-item.selected"
        );
        if (selectedItems.length && dropdownIsOpen()) {
            var selectedItem = selectedItems[0];
            var commName = selectedItem.querySelectorAll(".name-span")[0]
                .innerText;
            var state = selectedItem.querySelectorAll(".state-span");
            var commState = state.length
                ? state[0].innerText.replace(", ", "")
                : "";
            var id = selectedItem.getAttribute("data-id");
            var commId = id ? id : "";
            addCommunityTagToList(commName, commState, commId);
        } else {
            text = searchBar.value;
            if (text == "") return; // No empty tags
            // Try to find an id
            var match = findCommunityInList(text, communities);
            addCommunityTagToList(
                match.name || text,
                match.state || "",
                match.id || ""
            );
        }
        searchBar.value = "";
        hideDropdown();
    } else if (isArrowDownEvent(event)) {
        // Make the selection go down
        selectNextItemInDropdown("down");
    } else if (isArrowUpEvent(event)) {
        // Make the selection go up
        selectNextItemInDropdown("up");
    }
});

////////////////////
// COMMUNITY TAGS //
////////////////////

function getTagsInCommunityList() {
    return getId("community-selection-chosen-area").getElementsByClassName(
        "chosen-community-tag"
    );
}

function getNumTagsNotInDatabase() {
    var num = 0;
    var commTags = getId(
        "community-selection-chosen-area"
    ).getElementsByClassName("chosen-community-tag");
    var i;
    for (i = 0; i < commTags.length; i++) {
        if (!commTags[i].getAttribute("data-id")) {
            num++;
        }
    }
    return num;
}

function tagExistsInList(name) {
    var existingTags = getTagsInCommunityList();
    var i;
    var exists = false;
    for (i = 0; i < existingTags.length; i++) {
        var existingName = existingTags[i].getElementsByClassName(
            "name-span"
        )[0].innerText;

        if (existingName == name) {
            exists = true;
            break;
        }
    }
    return exists;
}

function numCommunitiesMessage(numComms) {
    if (numComms < 1) {
        return "No communities selected";
    } else if (numComms == 1) {
        return "1 community selected";
    } else {
        return numComms + " communities selected";
    }
}

function notInDbMessage(numNotInDb) {
    var baseMsg =
        " not listed in our database, but we’ll check the details and get back to you.";
    if (numNotInDb < 1) {
        return "";
    } else {
        return numNotInDb === 1
            ? "1 selected community is" + baseMsg
            : numNotInDb + " selected communities are" + baseMsg;
    }
}

function addCommunityTagToList(name, state, id) {
    if (tagExistsInList(name)) {
        alert("Community is already in the list");
        return false;
    }
    var insideHTML = makeNameDiv(name, state);
    var tag = makeTag(insideHTML);
    tag.setAttribute("data-id", id || "");
    addCommunityTag(tag);

    // Update messages
    recalculateTagMessages();
}

function recalculateTagMessages() {
    var numComms = getId("num-communities-selected");
    numComms.innerText = numCommunitiesMessage(getTagsInCommunityList().length);
    var notInDbMsg = getId("not-in-database");
    notInDbMsg.innerText = notInDbMessage(getNumTagsNotInDatabase());
}

function addCommunityTag(tag) {
    var tagsArea = getId("community-selection-chosen-area");
    tagsArea.insertBefore(tag, tagsArea.firstChild);
}

//////////////
// DROPDOWN //
//////////////

function getCurrentSelectedItemInDropdown() {
    var dropdownItems = getShowingDropdownItems();
    var i;
    for (i = 0; i < dropdownItems.length; i++) {
        if (dropdownItems[i].classList.contains("selected")) {
            return dropdownItems[i];
        }
    }
    return false;
}

function selectDropdownItemByIndex(index) {
    var itemToSelect = getDropdownItemByIndex(index);
    itemToSelect.classList += " selected";
}

function deselectDropdownItemByIndex(index) {
    var itemToSelect = getDropdownItemByIndex(index);
    itemToSelect.classList.remove("selected");
}

function getShowingDropdownItems() {
    var ret = [];
    var dropdownItems = getAllDropdownItems();
    var i;
    for (i = 0; i < dropdownItems.length; i++) {
        if (dropdownItems[i].hasAttribute("shown-item-index")) {
            ret.push(dropdownItems[i]);
        }
    }
    return ret;
}

function getAllDropdownItems() {
    return getId("dropdown-items").getElementsByClassName("dropdown-item");
}

function unselectAllDropdownItems() {
    var dropdownItems = getAllDropdownItems();
    var i;
    for (i = 0; i < dropdownItems.length; i++) {
        dropdownItems[i].classList.remove("selected");
    }
}

function getDropdownItemByIndex(index) {
    var dropdownItems = getShowingDropdownItems();

    var i;
    for (i = 0; i < dropdownItems.length; i++) {
        if (
            parseInt(dropdownItems[i].getAttribute("shown-item-index")) == index
        ) {
            return dropdownItems[i];
        }
    }
    return false;
}

function selectNextItemInDropdown(direction) {
    var indexPlusMinus = direction == "down" ? 1 : -1;
    if (!dropdownIsOpen()) {
        return;
    } else {
        var currentSelection = getCurrentSelectedItemInDropdown();
        var selectIndex;
        if (!currentSelection) {
            selectDropdownItemByIndex(0);
        } else {
            selectIndex =
                parseInt(currentSelection.getAttribute("shown-item-index")) +
                indexPlusMinus;
            selectDropdownItemByIndex(selectIndex);
            deselectDropdownItemByIndex(selectIndex - indexPlusMinus);
        }
        var newSelection = getCurrentSelectedItemInDropdown();
        if (newSelection) {
            getId("ilf-search-bar").value = getTextFromDropdownItem(
                newSelection
            );
        }
    }
}

function getTextFromDropdownItem(dropdownItem) {
    var ret = "";
    if (dropdownItem.getElementsByClassName("name-span").length) {
        ret += dropdownItem.getElementsByClassName("name-span")[0].innerText;
    }
    if (dropdownItem.getElementsByClassName("state-span").length) {
        ret += dropdownItem.getElementsByClassName("state-span")[0].innerText;
    }
    return ret;
}

/////////////////////
// EVENT LISTENERS //
/////////////////////

// Click outside dropdown to close
var specifiedElement = document.getElementById("dropdown-items");
document.addEventListener("click", function(event) {
    var isClickInside = specifiedElement.contains(event.target);

    if (!isClickInside) {
        //the click was outside the specifiedElement
        hideDropdown();
    }
});

// Add keyup listener
getId("ilf-search-bar").addEventListener("keyup", function(event) {
    filterFunction(event);
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
        // Update message
        recalculateTagMessages();
    });
    return x;
}

function makeDropdownItem(name, stateOrTerritory, alternativeNames, id, index) {
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
    // If there's no id, it's the 'add community' item
    if (!id) {
        var extraText = document.createElement("span");
        extraText.id = "add-new-comm-text";
        extraText.innerText = "Add new community: ";
        nameSpan.insertBefore(extraText, nameSpan.firstChild);
    } else {
        item.setAttribute("data-id", id);
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

function getId(id) {
    return document.getElementById(id);
}

function dropdownIsOpen() {
    return getId("dropdown-items").style.display == "block";
}

function isEnterEvent(event) {
    return event.which == 13 || event.code == "Enter";
}

function isArrowUpEvent(event) {
    return event.which == 38 || event.code == "ArrowUp";
}

function isArrowDownEvent(event) {
    return event.which == 40 || event.code == "ArrowDown";
}

function isShiftEvent(event) {
    return event.which == 16 || event.code == "Shift";
}

function showDropdown() {
    showElementById("dropdown-items");
}
function hideDropdown() {
    hideElementById("dropdown-items");
    hideElementById("dropdown-items-noresults");
    unselectAllDropdownItems();
}

function clearSearchInput() {
    document.getElementById("ilf-search-bar").value = "";
}

function addDropdownItem(item) {
    document.getElementById("dropdown-items").appendChild(item);
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// Attempt to guess what the user means if they press "Enter" without anything selected
function findCommunityInList(communityName, communityList) {
    var commName = communityName
        .split(",")[0]
        .trim()
        .toUpperCase();

    var i;
    for (i = 0; i < communityList.length; i++) {
        var rawCommunityName = communityList[i].name;
        var nameOne = rawCommunityName
            .split("(")[0]
            .trim()
            .toUpperCase();

        var regexp = /.*\((.*)\)/g;
        var match = regexp.exec(rawCommunityName);
        var nameTwo = "Some unrealistic string";
        if (match) {
            nameTwo = match[1].toUpperCase();
        }

        if (
            commName.indexOf(nameOne) === 0 ||
            commName.indexOf(nameTwo) === 0
        ) {
            return communityList[i];
        }
    }
    return -1;
}
