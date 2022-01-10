"use strict";
var imgArr = [
    'black.png',
    'blue.png',
    'green.png',
    'orange.png',
    'pink.png',
    'purple.png',
    'red.png',
];
// randomise array before loading into gallery
// TODO: shuffle array
var gallery = document.getElementById("gallery");
imgArr.forEach(function (filename, index) {
    // produce the following: <div id="${index}" class="grid-item"><img src="assets/${filename}"></div>
    var gallery_item = document.createElement("div");
    gallery_item.id = (index + 1).toString(); // add 1 to the index to process our calculation
    gallery_item.className = "grid-item";
    // if this is the first image, set it as active
    if (index === 5) {
        gallery_item.className += " active";
    }
    var image = document.createElement("img");
    image.src = "assets/".concat(filename);
    gallery_item.appendChild(image);
    gallery.appendChild(gallery_item);
});
var total_images = imgArr.length;
var num_rows = 2;
var num_cols = Math.ceil(total_images / num_rows);
window.onkeydown = function (ev) {
    if (ev.defaultPrevented)
        return;
    processKey(ev.key);
    function processKey(key) {
        var currentIndex = +document.getElementsByClassName("active")[0].id;
        console.log(currentIndex);
        var newIndex;
        if (key === "ArrowUp" && currentIndex - num_cols > 0) {
            newIndex = currentIndex - num_cols;
            toggleActive(currentIndex, newIndex);
        }
        else if (key === "ArrowDown" && currentIndex + num_cols <= total_images) {
            newIndex = currentIndex + num_cols;
            toggleActive(currentIndex, newIndex);
        }
        else if (key === "ArrowLeft" && currentIndex % num_cols != 1) {
            newIndex = currentIndex - 1;
            toggleActive(currentIndex, newIndex);
        }
        else if (key === "ArrowRight" && currentIndex % num_cols != 0 && currentIndex + 1 <= total_images) {
            newIndex = currentIndex + 1;
            toggleActive(currentIndex, newIndex);
        }
    }
    function toggleActive(indexToRemove, indexToAdd) {
        var _a, _b;
        (_a = document.getElementById(indexToRemove.toString())) === null || _a === void 0 ? void 0 : _a.classList.remove("active");
        (_b = document.getElementById(indexToAdd.toString())) === null || _b === void 0 ? void 0 : _b.classList.add("active");
    }
};
