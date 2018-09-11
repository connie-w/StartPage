"use strict";

var websites =
{
    "websites": [
        [
            {"name": "facebook", "url": "https://www.facebook.com/", "shortcut": "f"},
            {"name": "reddit", "url": "https://www.reddit.com/", "shortcut": "r"},
            {"name": "twitter", "url": "https://twitter.com/", "shortcut": "t"},
            {"name": "tumblr", "url": "https://tumblr.com/", "shortcut": "T"}
        ],
        [
            {"name": "google", "url": "https://www.google.com/", "shortcut": "g"},
            {"name": "youtube", "url": "https://www.youtube.com/", "shortcut": "y"},
            {"name": "drive", "url": "https://drive.google.com/", "shortcut": "d"},
            {"name": "gmail", "url": "https://mail.google.com/", "shortcut": "m"}
        ],
        [
            {"name": "github", "url": "https://github.com/", "shortcut": "h"},
            {"name": "gitlab", "url": "https://gitlab.com/", "shortcut": "l"},
            {"name": "w3schools", "url": "https://www.w3schools.com/", "shortcut": "w"},
            {"name": "stackoverflow", "url": "https://stackoverflow.com/", "shortcut": "s"}
        ]
    ]
};

var categories = ["social", "google", "code"];

window.onload = function() {
    populateShortcuts();
    window.addEventListener('keypress', function(event) {
        const key = event.key;
        //alert(key);
        if (key == "?") {
            //TODO: implement search
        } else {
            goToShortcut(key);
        }
    });
    $("edit").onclick = enterEditMode;
    setInterval(displayTime, 100);
};

/**
 * Populates page with website shortcuts, organized by categories
 */
function populateShortcuts() {
    for(let i = 0; i < websites.websites.length; i++) {
        let div = document.createElement("div");
        div.classList.add("category");
        let category = document.createElement("h3");
        category.innerHTML = categories[i];
        div.appendChild(category);

        for(let j = 0; j < websites.websites[i].length; j++) {
            let curr = websites.websites[i][j];
            createShortcut(curr.name, curr.shortcut, curr.url, div);
        }

        $("shortcut-area").appendChild(div);
    }
}

/**
 * Creates the shortcut link and adds it to the given div
 * @param {String} name - name of the website
 * @param {String} shortcut - shortcut key (single letter)
 * @param {String} url - url of website
 * @param {HTMLelement} div - div to append the shortcut to
 */
function createShortcut(name, shortcut, url, div) {
  let p = document.createElement("p");
  let text = document.createElement("a");
  text.innerHTML = "<span>" + shortcut + "</span>" + name;
  text.href = url;
  p.appendChild(text);
  div.appendChild(p);
}

/**
 * Goes to the website corresponding to the given shortcut pressed
 * does not open new tab/window
 * @param {String} key - key pressed
 */
function goToShortcut(key) {
    for(let i = 0; i < websites.websites.length; i++) {
        for(let j = 0; j < websites.websites[i].length; j++) {
            let curr = websites.websites[i][j];
            if (curr.shortcut == key) {
                window.location.href = curr.url;
            }
        }
    }
}

/**
 * Gets the currently stored website bookmarks using Chrome storage API
 */
function getStoredWebsites() {

}

/**
 * Enters the edit view for bookmarks
 */
 function enterEditMode() {
   let categories = document.querySelectorAll(".category");
   let editButton = document.querySelector(".fa-edit");
   editButton.classList.remove("fa-edit");
   editButton.classList.add("fa-sign-out");
   editButton.onclick = exitEditMode;
   // go thru categories
   for(let i = 0; i < categories.length; i++) {
     let span = document.createElement("span");
     span.classList.add("fa");
     span.classList.add("fa-plus");
     span.onclick = function() {
         promptNewShortcut(categories[i]);
     };
     categories[i].appendChild(span);

     // go thru individual websites
     let websites = categories[i].querySelectorAll("a")
     for(let j = 0; j < websites.length; j++) {
       let x = document.createElement("i");
       x.classList.add("fa");
       x.classList.add("fa-times");
       websites[j].prepend(x);
       //apend the child but do it before
     }
   }
 }

 /**
  * Exits edit mode, removing GUI elements for editing
  */
 function exitEditMode() {
     let editButton = document.querySelector(".fa-sign-out");
     editButton.classList.remove("fa-sign-out");
     editButton.classList.add("fa-edit");
     editButton.onclick = enterEditMode;

     let categories = document.querySelectorAll(".category");
     for(let i = 0; i < categories.length; i++) {
         //remove add button
        let add = categories[i].querySelector(".fa-plus");
        categories[i].removeChild(add);
    }
 }

 /**
  * Prompts user for name, shortcut, url of website and creates a new shortcut
  * with the given information
  * @param {HTMLelement} category - category to add the new shortcut to
  */
 function promptNewShortcut(category) {
    let name = window.prompt("Enter website name: ","Google");
    if (!name) {
        return 0;
    }
    let shortcut = window.prompt("Enter keyboard shortcut (case sensitive): ", "G");
    if (!shortcut) {
        return 0;
    }
    let valid = validateShortcut(shortcut);
    while(!valid && shortcut) {
        shortcut = prompt("Enter new shortcut: ", "");
        valid = validateShortcut(shortcut);
    }

    let url = window.prompt("Enter website url: ", "https://www.google.com/");
    if (!url) {
        return 0;
    }
    createShortcut(name, shortcut, url, category);

    // Adds the new shortcut to the websites object
    let categoryName = category.querySelector("h3").innerText;
    let categoryIndex = getCategoryIndex(categoryName);
    let newShortcut = {
        name: name,
        url: url,
        shortcut: shortcut
    };
    websites.websites[categoryIndex].push(newShortcut);
    console.log(websites.websites[categoryIndex]);

    //TODO: update chrome storage API when new shortcut is added
 }

 /**
  * Returns a boolean of whether the given shortcut is valid
  * checks that the shortcut is a single letter and not already used
  * @param {String} shortcut - shortcut to check
  */
 function validateShortcut(shortcut) {
     if (shortcut.length > 1) {
         alert("shortcut must be 1 letter long");
         return false;
     }

     for(let i = 0; i < websites.websites.length; i++) {
         for(let j = 0; j < websites.websites[i].length; j++) {
             let curr = websites.websites[i][j];
             if (curr.shortcut == shortcut) {
                 alert("shortcut already exists for " + curr.name +
                 " please choose a new shortcut");
                 return false;
             }
         }
     }
     return true;
 }

 /**
  * Returns the index of the given category name in the categories array
  * @param {String} categoryName - string to look for in categories
  * @return {integer} - index of category if found, else returns -1
  */
 function getCategoryIndex(categoryName) {
     for (let i = 0; i < categories.length; i++) {
         if(categories[i] == categoryName) {
             return i;
         }
     }
     return -1;
 }

/*
 * Updates the current time in hours/minutes to the clock, in am/pm format
 */
function displayTime() {
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();
    let ampm = h >= 12 ? 'pm' : 'am';
    h = h % 12;
    h = h ? h : 12;
    if(m < 10) {
      m = "0" + m;
    }
    let time = h + ":" + m + " " + ampm;
    $("clock").innerText = time;
}

function $(id) {
    return document.getElementById(id);
}
