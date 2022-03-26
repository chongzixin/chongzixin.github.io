"use strict";
/* INIT */
// pre-load the list of available images in assets
var all_available_images = [
    // gecko garage
    'rick-the-roller.png',
    'caroline-the-crane.png',
    'max-the-monster-truck.png',
    'helen-the-helicopter.png',
    'bobby-the-bus.png',
    'sammy-the-schoolbus.png',
    'celia-the-cementmixer.png',
    'george-the-giantdumptruck.png',
    'dylan-the-dumptruck.png',
    'ryan-the-wreckingballcrane.png',
    'andy-the-animalambulance.png',
    'amber-the-ambulance.png',
    'vicky-the-icecreamvan.png',
    'chelsea-the-cherrypicker.png',
    'rebecca-the-recyclingtruck.png',
    'fiona-the-firetruck.png',
    'tony-the-taxi.png',
    'sophie-the-sportscar.png',
    'mally-the-motorcycle.png',
    'trevor-the-tractor.png',
    'evie-the-ev.png',
    'eric-the-excavator.jpeg',
    'danny-the-digger.png',
    'larry-the-lorry.png',
    'gecko-baby-truck.png',
    'gecko-video-1.png',
    'gecko-muddy-trucks.png',
    'oscar-the-oldbus.png',
    'tilly-the-towtruck.png',
    'bobby-stuck-in-snow.png',
    'mia-the-minidigger.png',
    'leo-the-limousine.png',
    'polly-the-littlebus.png',
    'five-green-buses.png',
    'maggie-the-minifiretruck.png',
    'celia-muddy-truck.png',
    'sophie-larry-muddy.png',
    'icecream-truck-smoothie.png',
    'maisie-the-mower.png',
    'babytruck-halloween.png',
    'bobby-samy-muddy.png',
    'gecko-garage-all.png',
    'florence-the-forklift.png',
    'mummy-bus.png',
    'bobby-bus-thermometer.png',
    'dot-the-babybus.png',
    'max-jump.png',
    'harry-the-babybus.png',
];
var NUM_IMAGES_TO_SHOW = 4;
// const NUM_IMAGES_TO_SHOW = all_available_images.length; // change num images accordingly, show all by default.
var NUM_ROWS = 2; // change number of rows accordingly
/* MAIN */
var quiz_img;
var game_ended;
var images_to_show = getRandomThumbnails(all_available_images, NUM_IMAGES_TO_SHOW);
var num_cols;
addEventListeners();
reloadGame(images_to_show);
/* FUNCTION DEFINITIONS */
// randomly retrieve desired number of thumbnails from list
function getRandomThumbnails(arr, num) {
    var result = new Array(num);
    var len = arr.length;
    var taken = new Array(len);
    if (num > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (num--) {
        var x = Math.floor(Math.random() * len);
        result[num] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    // if num is 1, return just the first element, else return an array
    return num === 1 ? result[0] : result;
}
function paintImagesInGrid(images) {
    num_cols = Math.ceil(images_to_show.length / NUM_ROWS);
    var instructions = document.getElementById("instructions");
    instructions.innerHTML = "Use the arrow keys (↑, ↓, ←, →) to find your favourite vehicle, press End to randomise image locations";
    // set number of rows and columns in CSS
    var gallery = document.getElementById("gallery");
    gallery.innerHTML = ""; // clear the gallery before painting
    gallery.style.gridTemplateRows = "repeat(".concat(NUM_ROWS, ", 300px)");
    gallery.style.gridTemplateColumns = "repeat(".concat(num_cols, ", 400px)");
    images.forEach(function (filename, index) {
        // produce the following: <div id="${index}" class="grid-item"><img src="assets/${filename}"></div>
        var gallery_item = document.createElement("div");
        gallery_item.id = (index + 1).toString(); // add 1 to the index to process our calculation
        gallery_item.className = "grid-item";
        // if this is the first image, set it as active
        if (index === 0) {
            gallery_item.className += " active";
        }
        var image = document.createElement("img");
        image.src = "assets/".concat(filename);
        gallery_item.appendChild(image);
        gallery.appendChild(gallery_item);
    });
}
function paintQuiz(img) {
    var quiz = document.getElementById("quiz");
    quiz.style.display = "flex"; // show it again because it gets hidden when game ends
    var quiz_img = document.getElementById("quiz_img");
    quiz_img.src = "assets/".concat(img);
}
function reloadGame(images) {
    game_ended = false;
    quiz_img = getRandomThumbnails(images_to_show, 1);
    paintImagesInGrid(images_to_show);
    paintQuiz(quiz_img);
}
function endGame() {
    game_ended = true;
    var instructions = document.getElementById("instructions");
    instructions.innerHTML = "You win! Press any key to restart.";
    // hide the gallery
    var gallery = document.getElementById("gallery");
    gallery.innerHTML = "";
    // hide the quiz section
    var quiz = document.getElementById("quiz");
    quiz.style.display = "none";
}
function addEventListeners() {
    window.onkeydown = function (ev) {
        if (ev.defaultPrevented)
            return;
        processKey(ev.key);
        function processKey(key) {
            if (game_ended) {
                // if game has ended, press any key to restart.
                images_to_show = getRandomThumbnails(all_available_images, NUM_IMAGES_TO_SHOW);
                reloadGame(images_to_show);
            }
            var current_index = +document.getElementsByClassName("active")[0].id;
            var new_index;
            if (key === "ArrowUp" && current_index - num_cols > 0) {
                new_index = current_index - num_cols;
                toggleActive(current_index, new_index);
            }
            else if (key === "ArrowDown" && current_index + num_cols <= images_to_show.length) {
                new_index = current_index + num_cols;
                toggleActive(current_index, new_index);
            }
            else if (key === "ArrowLeft" && current_index % num_cols != 1 && num_cols !== 1) {
                new_index = current_index - 1;
                toggleActive(current_index, new_index);
            }
            else if (key === "ArrowRight" && current_index % num_cols != 0 && current_index + 1 <= images_to_show.length) {
                new_index = current_index + 1;
                toggleActive(current_index, new_index);
            }
            else if (key === "Enter") {
                var current_image = images_to_show[current_index - 1];
                // if filename matches, remove thumbnail. end game when there are no more images
                if (current_image == quiz_img) {
                    images_to_show.splice(current_index - 1, 1);
                    images_to_show.length == 0 ? endGame() : reloadGame(images_to_show);
                }
            }
            else if (key === "r" || key === "End") {
                // if user presses R or End, refresh page to randomise images again.
                // we use End to provide convenience to users because it's near the arrow keys on the keyboard.
                images_to_show = getRandomThumbnails(all_available_images, NUM_IMAGES_TO_SHOW);
                reloadGame(images_to_show);
            }
        }
        function toggleActive(index_to_remove, index_to_add) {
            var _a, _b, _c;
            (_a = document.getElementById(index_to_remove.toString())) === null || _a === void 0 ? void 0 : _a.classList.remove("active");
            (_b = document.getElementById(index_to_add.toString())) === null || _b === void 0 ? void 0 : _b.classList.add("active");
            (_c = document.getElementById(index_to_add.toString())) === null || _c === void 0 ? void 0 : _c.scrollIntoView();
        }
    };
}
