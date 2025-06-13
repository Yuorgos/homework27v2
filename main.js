const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");
const slides = document.querySelectorAll(".slider-image");
const bottom = document.getElementById("bottom");

let currentSlideIndex = 0;
const paginationCircles = [];
let autoPlayInterval;
let isPlaying = true;

function createPaginationCircle() {
    const div = document.createElement("div");
    div.className = "pagination-circle";
    bottom.appendChild(div);
    paginationCircles.push(div);
}

function addPagination() {
    slides.forEach(createPaginationCircle);
    paginationCircles[0].classList.add("active");
    paginationCircles.forEach((circle, index) => {
        circle.addEventListener("click", () => {
            changeSlide(index);
            stopAutoplay();
        });
    });
}

function addActiveClass() {
    paginationCircles[currentSlideIndex].classList.add("active");
}

function removeActiveClass() {
    paginationCircles[currentSlideIndex].classList.remove("active");
}

function showSlide() {
    slides[currentSlideIndex].classList.add("block");
}

function hideSlide() {
    slides[currentSlideIndex].classList.remove("block");
}

function changeSlide(index) {
    hideSlide();
    removeActiveClass();
    currentSlideIndex = index;
    addActiveClass();
    showSlide();
}

function nextSlide() {
    const newIndex = (currentSlideIndex + 1) % slides.length;
    changeSlide(newIndex);
}

function previousSlide() {
    const newIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    changeSlide(newIndex);
}


function startAutoplay() {
    autoPlayInterval = setInterval(nextSlide, 3000);
    isPlaying = true;
}

function stopAutoplay() {
    clearInterval(autoPlayInterval);
    isPlaying = false;
}

function toggleAutoplay() {
    if (isPlaying) {
        stopAutoplay();
    } else {
        startAutoplay();
    }
}


const pauseBtn = document.createElement("button");
pauseBtn.textContent = "⏸ Pause";
pauseBtn.style.padding = "10px 20px";
pauseBtn.style.cursor = "pointer";
pauseBtn.style.fontSize = "18px";
pauseBtn.style.borderRadius = "10px";
pauseBtn.style.border = "none";
pauseBtn.style.backgroundColor = "#444";
pauseBtn.style.color = "white";
pauseBtn.addEventListener("click", () => {
    toggleAutoplay();
    pauseBtn.textContent = isPlaying ? "⏸ Pause" : "▶ Play";
});
document.getElementById("slider-container").appendChild(pauseBtn);


document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        previousSlide();
        stopAutoplay();
    } else if (e.key === "ArrowRight") {
        nextSlide();
        stopAutoplay();
    }
});


addPagination();
arrowLeft.addEventListener("click", () => {
    previousSlide();
    stopAutoplay();
});
arrowRight.addEventListener("click", () => {
    nextSlide();
    stopAutoplay();
});
startAutoplay();