const imgArr: string[] = [
    'black.png',
    'blue.png',
    'green.png',
    'orange.png',
    'pink.png',
    'purple.png',
    'red.png',
    'grey.png',
    'black.png',
    'blue.png',
    'green.png',
    'orange.png',
    'pink.png',
    'purple.png',
    'grey.png',
    'black.png',
    'blue.png',
    'green.png',
    'orange.png',
    'pink.png',
    'purple.png',
    'red.png',
    'grey.png',
];

const total_images = imgArr.length;
const num_rows = 2;
const num_cols = Math.ceil(total_images/num_rows);

// randomise array before loading into gallery
// TODO: shuffle array
const gallery = document.getElementById("gallery") as HTMLDivElement;

// set number of rows and columns in CSS
gallery.style.gridTemplateRows = `repeat(${num_rows}, 300px)`;
gallery.style.gridTemplateColumns = `repeat(${num_cols}, 400px)`;

imgArr.forEach((filename: string, index: number) => {
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
        else if(key === "ArrowDown" && currentIndex + num_cols <= total_images) {
            newIndex = currentIndex + num_cols;
            toggleActive(currentIndex, newIndex);
        }
        else if(key === "ArrowLeft" && currentIndex % num_cols != 1) {
            newIndex = currentIndex - 1;
            toggleActive(currentIndex, newIndex);
        }
        else if(key === "ArrowRight" && currentIndex % num_cols != 0 && currentIndex + 1 <= total_images) {
            newIndex = currentIndex + 1;
            toggleActive(currentIndex, newIndex);
        }
    }

    function toggleActive(indexToRemove:number, indexToAdd:number) {
        document.getElementById(indexToRemove.toString())?.classList.remove("active");
        document.getElementById(indexToAdd.toString())?.classList.add("active");
        document.getElementById(indexToAdd.toString())?.scrollIntoView();
    }
}