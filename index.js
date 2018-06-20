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
};

// Populates page with website shortcuts, organized by categories
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
            let icon = document.createElement("span");
            icon.innerText = curr.shortcut;
            p.appendChild(icon);
            let text = document.createElement("a");
            text.innerText = curr.name;
            text.href = curr.url;
            p.appendChild(text);
            div.appendChild(p);
        }
        
        $("shortcut-area").appendChild(div);
    }   
}

function $(id) {
    return document.getElementById(id);
}



