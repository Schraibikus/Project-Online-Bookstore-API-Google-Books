import person_icon from "../../images/icons/user_icon.svg";
import search_icon from "../../images/icons/search_icon.svg";
import bag_icon from "../../images/icons/bag_icon.svg";
class Header {
  constructor() {
    this.icons = [
      {
        url: person_icon,
        alt: "person_icon",
        width: 12,
        height: 15,
      },
      {
        url: search_icon,
        alt: "search_icon",
        width: 15,
        height: 15,
      },
      {
        url: bag_icon,
        alt: "bag_icon",
        width: 14,
        height: 17,
      },
    ];
    this.header = document.querySelector(".header");
  }

  setHeaderLogo() {
    this.headerLogo = document.createElement("p");
    this.headerLogo.innerText = "Bookshop";
    this.headerLogo.className = "header__logo";
    this.header.append(this.headerLogo);
  }

  setHeaderMenu() {
    this.headerMenu = document.createElement("nav");
    this.headerMenu.className = "header__menu";
    this.headerMenu.innerHTML = `
			<ul class="header__menu-list">
				<li class="header__menu-item">
					<a href="#" class="header__menu-link header__menu-link--active"
						>books</a>
				</li>
				<li class="header__menu-item">
					<a href="#" class="header__menu-link">audiobooks</a>
				</li>
				<li class="header__menu-item">
					<a href="#" class="header__menu-link">Stationery & gifts</a>
				</li>
				<li class="header__menu-item">
					<a href="#" class="header__menu-link">blog</a>
				</li>
			</ul>
		`;
    this.header.append(this.headerMenu);
  }

  setUserActions() {
    this.userActions = document.createElement("ul");
    this.userActions.className = "user-actions";
    this.userActions.innerHTML = `
			<li class="user-actions__item">
			<a href="#" class="user-action__link">
				<img
					src=${this.icons[0].url}
					alt=${this.icons[0].alt}
					width=${this.icons[0].width}
					height=${this.icons[0].height}
				/>
			</a>
			</li>
			<li class="user-actions__item">
			<a href="#" class="user-action__link">
				<img
				src=${this.icons[1].url}
				alt=${this.icons[1].alt}
				width=${this.icons[1].width}
				height=${this.icons[1].height}
				/>
			</a>
			</li>
		`;
    this.bagItem = document.createElement("li");
    this.bagItem.className = "user-actions__item";
    this.bagImg = document.createElement("img");
    this.bagImg.src = `${this.icons[2].url}`;
    this.bagImg.width = `${this.icons[2].width}`;
    this.bagImg.height = `${this.icons[2].height}`;
    this.userActions.append(this.bagItem);
    this.bagItem.append(this.bagImg);
    this.bagItemCount = document.createElement("span");
    this.bagItemCount.className = "bag-full bag-empty";
    this.bagItem.append(this.bagItemCount);
    this.header.append(this.userActions);
  }
}

export { Header };
