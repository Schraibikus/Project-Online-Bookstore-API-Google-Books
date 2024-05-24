class Slider {
  constructor() {
    this.images = [
      {
        url: "./src/images/slide_01.jpg",
      },
      {
        url: "./src/images/slide_02.jpg",
      },
      {
        url: "./src/images/slide_03.jpg",
      },
    ];
    this.sliderOptions = {
      dots: true,
      autoplay: true,
      autoplayInterval: 5000,
    };
  }

  initImages() {
    this.images.forEach((image, idx) => {
      this.imageDiv = `<div class="image n${idx} ${
        idx === 0 ? "active" : ""
      }" style="background-image:url(${
        this.images[idx].url
      })" data-index="${idx}"></div>`;
      this.sliderImages.innerHTML += this.imageDiv;
    });
  }

  initDots() {
    this.images.forEach((image, idx) => {
      this.dot = `<div class="slider__dots-item n${idx} ${
        idx === 0 ? "active" : ""
      }" data-index="${idx}"></div>`;
      this.sliderDots.innerHTML += this.dot;
    });
    this.sliderDots.querySelectorAll(".slider__dots-item").forEach((dot) => {
      dot.addEventListener("click", function () {
        this.moveSlider(this.dataset.index);
      });
    });
  }

  moveSlider(num) {
    this.sliderImages.querySelector(".active").classList.remove("active");
    this.sliderImages.querySelector(".n" + num).classList.add("active");
    if (this.sliderOptions.dots) {
      this.sliderDots.querySelector(".active").classList.remove("active");
      this.sliderDots.querySelector(".n" + num).classList.add("active");
    }
  }

  initAutoplay() {
    setInterval(() => {
      let curNumber = Number(
        this.sliderImages.querySelector(".active").dataset.index
      );
      let nextNumber = curNumber === this.images.length - 1 ? 0 : curNumber + 1;
      this.moveSlider(nextNumber);
    }, this.sliderOptions.autoplayInterval);
  }

  initSlider() {
    this.sliderImages = document.querySelector(".slider__images");
    this.sliderDots = document.querySelector(".slider__dots");
    this.initImages();
    if (this.sliderOptions.dots) {
      this.initDots();
    }
    if (this.sliderOptions.autoplay) {
      this.initAutoplay();
    }
  }
}

export { Slider };
