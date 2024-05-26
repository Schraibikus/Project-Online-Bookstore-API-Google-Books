import promo1 from "../../images/promo_01.png";
import promo2 from "../../images/promo_02.png";
class Banner {
  constructor() {
    this.main = document.querySelector(".main");
    this.banner = document.querySelector(".banner");
  }

  setBanner() {
    this.banner.innerHTML = `
			<a class="promo-01" href="#">
				<img
					src=${promo1}
					alt="Change old book on new"
					width="149"
					height="204"
				/>
			</a>
			<a class="promo-02" href="#">
				<img
					src=${promo2}
					alt="top 100 books 2022"
					width="158"
					height="273"
				/>
			</a>
			<section class="slider container">
				<div class="slider__images"></div>
				<div class="slider__dots"></div>
			</section>
		`;
  }
}

export { Banner };
