/*  assigns various HTML elements from the webpage to corresponding variables for
 easier access and manipulation in the JavaScript code.*/

let container = document.querySelector(".container");
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");

/* --------------------------------------------------------------------------------- */ 

/* defines an events object that maps event types (mousedown, mousemove, mouseup, touchstart, 
touchmove, and touchend) to their corresponding names for both mouse and touch devices, 
enabling unified event handling based on the device type. */
let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup"
    },
    touch: {
        down: "touchstart",
        mobe: "touchmove",
        up: "touchend",
    },
};

/* --------------------------------------------------------------------------------- */
/*code sets up variables and a function to determine the device type (touch or mouse) 
for later use in the pixel art generator.*/

let deviceType = "";

let draw = false;
let erase = false;

const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

/* --------------------------------------------------------------------------------- */
/*isTouchDevice() function is used to determine the device type (touch or mouse) for 
later use in the pixel art generator.*/

isTouchDevice();

/* Event listeners are added to the grid-related elements and buttons for 
grid creation, painting, erasing, and other user interactions.*/

gridButton.addEventListener("click", () => {
    container.innerHTML = "";
    let count = 0;
    for (let i = 0; i < gridHeight.value; i++) {
        count += 2;
        let div = document.createElement("div");
        div.classList.add("gridRow");

        for (let j = 0; j < gridWidth.value; j++) {
            count += 2;
            let col = document.createElement("div");
            col.classList.add("gridCol");
            col.setAttribute("id", `gridCol${count}`);
            col.addEventListener(events[deviceType].down, () => {
                draw = true;
                if (erase) {
                    col.style.backgroundColor = "transparent";
                } else {
                    col.style.backgroundColor = colorButton.value;
                }
            });

            col.addEventListener(events[deviceType].move, (e) => {
                let elementId = document.elementFromPoint(
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY,
                ).id;
                checker(elementId);
            });


            col.addEventListener(events[deviceType].up, () => {
                draw = false;
            });

            div.appendChild(col);

        }

        container.appendChild(div);

    }
});

/* --------------------------------------------------------------------------------- */
/*The checker() function is defined to handle drawing and erasing pixels on the grid based on the device type and user actions.*/

function checker(elementId) {
    let gridColumns = document.querySelectorAll(".gridCol");
    gridColumns.forEach((element) => {
        if (elementId == element.id) {
            if (draw && !erase) {
                element.style.backgroundColor = colorButton.value;
            } else if (draw && erase) {
                element.style.backgroundColor = "transparent";
            }
        }
    });
}

/* --------------------------------------------------------------------------------- */
/*The clearGridButton event listener is defined to clear the grid when the user clicks the Clear Grid button.*/

clearGridButton.addEventListener("click", () => {
    container.innerHTML = "";
});

eraseBtn.addEventListener("click", () => {
    erase = true;
});

paintBtn.addEventListener("click", () => {
    erase = false;
});

gridWidth.addEventListener("input", () => {
    widthValue.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
});

gridHeight.addEventListener("input", () => {
    heightValue.innerHTML = gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
});

/* --------------------------------------------------------------------------------- */
/*The window.onload event listener is defined to set the grid width and height to 0 when the page loads.*/

window.onload = () => {
    gridHeight.value = 0;
    gridWidth.value = 0;
};