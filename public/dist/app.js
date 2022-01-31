"use strict";
// TODO: reduce repeat thumbnails from showing up too frequently
// TODO: automatically get images from file
// const fs = require('fs');
// const assets_folder = './public/assets/';
// fs.readdirSync(assets_folder).forEach((file: any) => {
//     console.log(file);
// });
// pre-load the list of available images in assets
var all_available_images = [
    // // colours
    // 'black.png',
    // 'blue.png',
    // 'green.png',
    // 'orange.png',
    // 'pink.png',
    // 'purple.png',
    // 'brown.png',
    // 'red.png',
    // 'grey.png',
    // 'white.png',
    // // fruits
    // 'kiwi.png',
    // 'strawberry.png',
    // // animals
    // 'zebra.png',
    // 'tiger.png',
    // 'elephant.png',
    // 'lion.png',
    // 'walrus.png',
    // 'dolphin.png',
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
];
// choose your desired number of images and rows. show all images by default.
var NUM_IMAGES_TO_SHOW = all_available_images.length;
var NUM_ROWS = 2;
var num_cols = Math.ceil(NUM_IMAGES_TO_SHOW / NUM_ROWS);
// randomly retrieve desired number of thumbnails from list
var images_to_show = getRandomThumbnails(all_available_images, NUM_IMAGES_TO_SHOW);
// set number of rows and columns in CSS
var gallery = document.getElementById("gallery");
gallery.style.gridTemplateRows = "repeat(".concat(NUM_ROWS, ", 300px)");
gallery.style.gridTemplateColumns = "repeat(".concat(num_cols, ", 400px)");
images_to_show.forEach(function (filename, index) {
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
window.onkeydown = function (ev) {
    if (ev.defaultPrevented)
        return;
    processKey(ev.key);
    function processKey(key) {
        var currentIndex = +document.getElementsByClassName("active")[0].id;
        var newIndex;
        if (key === "ArrowUp" && currentIndex - num_cols > 0) {
            newIndex = currentIndex - num_cols;
            toggleActive(currentIndex, newIndex);
        }
        else if (key === "ArrowDown" && currentIndex + num_cols <= NUM_IMAGES_TO_SHOW) {
            newIndex = currentIndex + num_cols;
            toggleActive(currentIndex, newIndex);
        }
        else if (key === "ArrowLeft" && currentIndex % num_cols != 1) {
            newIndex = currentIndex - 1;
            toggleActive(currentIndex, newIndex);
        }
        else if (key === "ArrowRight" && currentIndex % num_cols != 0 && currentIndex + 1 <= NUM_IMAGES_TO_SHOW) {
            newIndex = currentIndex + 1;
            toggleActive(currentIndex, newIndex);
        }
    }
    function toggleActive(indexToRemove, indexToAdd) {
        var _a, _b, _c;
        (_a = document.getElementById(indexToRemove.toString())) === null || _a === void 0 ? void 0 : _a.classList.remove("active");
        (_b = document.getElementById(indexToAdd.toString())) === null || _b === void 0 ? void 0 : _b.classList.add("active");
        (_c = document.getElementById(indexToAdd.toString())) === null || _c === void 0 ? void 0 : _c.scrollIntoView();
    }
};
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
    return result;
}
