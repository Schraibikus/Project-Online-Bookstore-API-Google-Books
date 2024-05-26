import slide1 from "../../images/img_slide_01.jpg";
import slide2 from "../../images/img_slide_02.jpg";
import slide3 from "../../images/img_slide_03.jpg";

class Slider {
  constructor() {
    this.images = [
      {
        url: slide1,
      },
      {
        url: slide2,
      },
      {
        url: slide3,
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
      dot.addEventListener("click", function (e) {
        let num = e.target.dataset.index;
        this.moveSlider(num);
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
      this.curNumber = Number(
        this.sliderImages.querySelector(".active").dataset.index
      );
      this.nextNumber =
        this.curNumber === this.images.length - 1 ? 0 : this.curNumber + 1;
      this.moveSlider(this.nextNumber);
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
