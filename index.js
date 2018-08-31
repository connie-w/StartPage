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

    //displayTime();
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
            let p = document.createElement("p");
            // let icon = document.createElement("span");
            // icon.innerText = curr.shortcut;
            //p.appendChild(icon);
            let text = document.createElement("a");
            text.innerHTML = "<span>" + curr.shortcut + "</span>" + curr.name;
            //text.innerText = curr.name;
            text.href = curr.url;
            p.appendChild(text);
            div.appendChild(p);
        }

        $("shortcut-area").appendChild(div);
    }
}

/**
 * Goes to the website corresponding to the given shortcut pressed
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
   alert("entering edit mode");
   let categories = document.querySelectorAll(".category");
   // go thru categories
   for(let i = 0; i < categories.length; i++) {
     let span = document.createElement("span");
     span.classList.add("fa");
     span.classList.add("fa-plus");
     categories[i].appendChild(span);

     // go thru individual websites
     let websites = categories[i].querySelectorAll("a")
     for(let j = 0; j < websites.length; j++) {
       let x = document.createElement("i");
       x.classList.add("fa");
       x.classList.add("fa-times");
       websites[j].querySelector("p")
       //apendd the child but do it before
     }
   }
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
