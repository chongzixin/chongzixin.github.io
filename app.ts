const testFolder = '../assets';

const imgArr = [
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
const gallery = document.getElementById("gallery");
imgArr.forEach(filename => {
    // TODO: add index to the ID
    gallery!.innerHTML += `<div class="grid-item"><img src="assets/${filename}"></div>`;
});


// get the element that is currently selected
// register keyboard event listener
// key up: if odd, index--, else dont move
// key down: if even, index++, else dont move
// key left: index-2
// key right: index+2