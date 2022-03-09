/* INIT */

// pre-load the list of available images in assets
const all_available_images: string[] = [
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
];

const NUM_IMAGES_TO_SHOW = all_available_images.length; // change num images accordingly, show all by default.
const NUM_ROWS = 2; // change number of rows accordingly
const num_cols = Math.ceil(NUM_IMAGES_TO_SHOW / NUM_ROWS);

/* MAIN */
let images_to_show = getRandomThumbnails(all_available_images, NUM_IMAGES_TO_SHOW);
paintImagesOnScreen(images_to_show);
addEventListeners();

/* FUNCTION DEFINITIONS */

// randomly retrieve desired number of thumbnails from list
function getRandomThumbnails(arr:string[], num:number):string[] {
    let result = new Array(num);
    let len = arr.length;
    let taken = new Array(len);
    
    if (num > len)
    throw new RangeError("getRandom: more elements taken than available");
    while (num--) {
        const x = Math.floor(Math.random() * len);
        result[num] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    
    return result;
}

function paintImagesOnScreen(images:string[]) {
    // set number of rows and columns in CSS
    const gallery = document.getElementById("gallery") as HTMLDivElement;
    gallery.innerHTML = ""; // clear the gallery before painting

    gallery.style.gridTemplateRows = `repeat(${NUM_ROWS}, 300px)`;
    gallery.style.gridTemplateColumns = `repeat(${num_cols}, 400px)`;
    
    images.forEach((filename: string, index: number) => {
        // produce the following: <div id="${index}" class="grid-item"><img src="assets/${filename}"></div>
        
        const gallery_item = document.createElement("div") as HTMLDivElement;
        gallery_item.id = (index + 1).toString();  // add 1 to the index to process our calculation
        gallery_item.className = "grid-item";
        
        // if this is the first image, set it as active
        if(index === 0) {
            gallery_item.className += " active";
        }
        
        const image = document.createElement("img") as HTMLImageElement;
        image.src = `assets/${filename}`;
        gallery_item.appendChild(image);
        
        gallery.appendChild(gallery_item);
    });
}

function addEventListeners() {
    window.onkeydown = (ev: KeyboardEvent): any => {
        if(ev.defaultPrevented) return;
        processKey(ev.key);
        
        function processKey(key: string) {
            const currentIndex = +document.getElementsByClassName("active")[0].id;
            let newIndex;
            
            if(key === "ArrowUp" && currentIndex - num_cols > 0) {
                newIndex = currentIndex - num_cols;
                toggleActive(currentIndex, newIndex);
            }
            else if(key === "ArrowDown" && currentIndex + num_cols <= NUM_IMAGES_TO_SHOW) {
                newIndex = currentIndex + num_cols;
                toggleActive(currentIndex, newIndex);
            }
            else if(key === "ArrowLeft" && currentIndex % num_cols != 1) {
                newIndex = currentIndex - 1;
                toggleActive(currentIndex, newIndex);
            }
            else if(key === "ArrowRight" && currentIndex % num_cols != 0 && currentIndex + 1 <= NUM_IMAGES_TO_SHOW) {
                newIndex = currentIndex + 1;
                toggleActive(currentIndex, newIndex);
            }
            else if(key === "r" || key === "End") {
                // if user presses R or End, refresh page to randomise images again.
                // we use End to provide convenience to users because it's near the arrow keys on the keyboard.
                images_to_show = getRandomThumbnails(all_available_images, NUM_IMAGES_TO_SHOW);
                paintImagesOnScreen(images_to_show);
                toggleActive(currentIndex, 1);
            }
        }
        
        function toggleActive(indexToRemove:number, indexToAdd:number) {
            document.getElementById(indexToRemove.toString())?.classList.remove("active");
            document.getElementById(indexToAdd.toString())?.classList.add("active");
            document.getElementById(indexToAdd.toString())?.scrollIntoView();
        }
    }
}