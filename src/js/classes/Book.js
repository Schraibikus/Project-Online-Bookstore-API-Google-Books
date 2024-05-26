import { Header } from "./Header.js";
import { Banner } from "./Banner.js";
import { Slider } from "./Slider.js";

class Book {
  key = "AIzaSyDDOMidehv5Pbxvwys6YMfRx700GHYlpkk";
  apiURL = "https://www.googleapis.com/books/v1/volumes";
  booksItems = JSON.parse(localStorage.getItem("booksItems")) || [];
  bookInBag = JSON.parse(localStorage.getItem("bookInBag")) || [];
  categoryArr = [
    "Architecture",
    "Art",
    "Biography & Autobiography",
    "Buisness & Economics",
    "Crafts & Hobbies",
    "Drama",
    "Fiction",
    "Health & Fitness",
    "History",
    "Humor",
    "Poetry",
    "Psychology",
    "Science",
    "Technology & Engeniring",
    "Travel",
  ];

  constructor() {
    this.loadMore = document.querySelector(".button-load");
    this.categorySection = document.querySelector(".category");
    this.booksSection = document.querySelector(".books");

    this.categoryTag = this.categoryArr[0];
    this.startIndex = 0;
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  showCategory(categoryArr) {
    this.categoryList = document.createElement("ul");
    this.categoryList.className = "category__menu-list";
    this.categoryList.innerHTML = "";
    categoryArr.forEach((category) => this.createItem(category));
  }

  createItem(category) {
    this.categoryItem = document.createElement("li");
    this.categoryItem.className = "category__menu-item";
    this.categoryLink = document.createElement("a");
    this.categoryLink.className = "category__menu-link";
    for (let i = 0; i < this.categoryArr.length; i++) {
      this.categoryLink.innerText = category;
      this.categoryItem.append(this.categoryLink);
      this.categoryList.append(this.categoryItem);
    }
    this.categorySection.append(this.categoryList);
  }

  getActiveLink() {
    this.activeLinks = document.querySelectorAll(".category__menu-link");
    this.activeLinks[0].classList.add("item--active");
  }

  categoryChange() {
    this.categoryList.addEventListener("click", (event) => {
      this.clearBooks = document.querySelector(".books__list");
      this.clearBooks.innerHTML = "";
      this.singleSelect(event.target);
      this.categoryTag = event.target.textContent;
      this.getParams(this.categoryTag, this.startIndex);
      this.initRequest(this.params);
      setTimeout(() => {
        this.booksItemsCategory = this.booksItems.slice(-6);
        this.booksItemsCategory.forEach((book) => this.createBook(book));
        this.getBagFull();
      }, 800);
    });
  }

  singleSelect(element) {
    this.categoryAll = this.categoryList.querySelectorAll(".item--active");
    for (let elem of this.categoryAll) {
      elem.classList.remove("item--active");
    }
    element.classList.add("item--active");
  }

  nextBooks() {
    this.loadMore.addEventListener("click", (event) => {
      this.startIndex += 6;
      this.getParams(this.categoryTag, this.startIndex);
      this.initRequest(this.params);
      setTimeout(() => {
        this.booksItemsLazy = this.booksItems.slice(-6);
        this.booksItemsLazy.forEach((book) => this.createBook(book));
        this.getBagFull();
      }, 800);
    });
  }

  getParams(categoryTag, startIndex) {
    this.params = new URLSearchParams();
    this.params.append("q", `subject:"${categoryTag}"`);
    this.params.append("key", `${this.key}`);
    this.params.append("printType", "books");
    this.params.append("startIndex", `${startIndex}`);
    this.params.append("maxResults", "6");
    this.params.append("langRestrict", "en");
    return this.params;
  }

  async initRequest(params) {
    try {
      const response = await fetch(`${this.apiURL}?${params}`);
      if (!response.ok) {
        throw new Error("Network not OK");
      }
      await response.json().then((data) => {
        // console.log("data >>> ", data.items);
        data.items.forEach((book) => {
          if (
            !book.saleInfo.listPrice ||
            book.saleInfo.listPrice.amount === undefined ||
            book.saleInfo.listPrice.currencyCode === undefined
          ) {
            book.saleInfo.listPrice = {};
          }

          if (
            !book.volumeInfo.imageLinks ||
            !book.volumeInfo.imageLinks.smallThumbnail
          ) {
            book.volumeInfo.imageLinks = "https://picsum.photos/200/300";
          } else {
            book.volumeInfo.imageLinks.thumbnail;
          }

          const booksItemsObj = {
            url: book.volumeInfo.imageLinks.smallThumbnail,
            author: book.volumeInfo.authors,
            title: book.volumeInfo.title,
            text: book.volumeInfo.description,
            price: book.saleInfo.listPrice.amount,
            currencyCode: book.saleInfo.listPrice.currencyCode,
            rating: this.getRandom(1, 5),
            review: this.getRandom(1, 10000),
          };
          this.booksItems.push(booksItemsObj);
          if (this.booksItems.length > 18) this.booksItems.pop();
          localStorage.setItem("booksItems", JSON.stringify(this.booksItems));
        });
      });
      return this.booksItems;
    } catch (error) {
      console.error("Problemm...", error);
    }
  }

  createBooksList() {
    this.booksList = document.createElement("ul");
    this.booksList.className = "books__list";
    this.booksSection.append(this.booksList);
  }

  showBookCard(booksItems) {
    this.booksList.innerHTML = "";
    booksItems.forEach((book) => this.createBook(book));
  }

  createBook(book) {
    this.bookItem = document.createElement("li");
    this.bookItem.className = "book__card";
    this.bookImg = document.createElement("img");
    this.bookDesc = document.createElement("div");
    this.bookDesc.className = "book__card-desciption";
    this.bookAuthor = document.createElement("p");
    this.bookAuthor.className = "book__card-author";
    this.bookTitle = document.createElement("h2");
    this.bookTitle.className = "book__card-title";
    this.bookRating = document.createElement("div");
    this.bookRating.className = "book__card-rating";
    this.bookStars = document.createElement("div");
    this.bookStars.className = "book__card-stars";
    this.starSpan1 = document.createElement("span");
    this.starSpan1.className = "star";
    this.starSpan1.innerHTML = `
      <svg
        width="12"
        height="11"
        viewBox="0 0 12 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
      <path
        class="star-color"
        d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z"
        fill="#F2C94C"
      />
    `;
    this.starSpan2 = document.createElement("span");
    this.starSpan2.className = "star";
    this.starSpan2.innerHTML = `
      <svg
        width="12"
        height="11"
        viewBox="0 0 12 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
      <path
        class="star-color"
        d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z"
        fill="#F2C94C"
      />
    `;
    this.starSpan3 = document.createElement("span");
    this.starSpan3.className = "star";
    this.starSpan3.innerHTML = `
      <svg
        width="12"
        height="11"
        viewBox="0 0 12 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
      <path
        class="star-color"
        d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z"
        fill="#F2C94C"
      />
    `;
    this.starSpan4 = document.createElement("span");
    this.starSpan4.className = "star";
    this.starSpan4.innerHTML = `
      <svg
        width="12"
        height="11"
        viewBox="0 0 12 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
      <path
        class="star-color"
        d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z"
        fill="#F2C94C"
      />
    `;
    this.starSpan5 = document.createElement("span");
    this.starSpan5.className = "star";
    this.starSpan5.innerHTML = `
      <svg
        width="12"
        height="11"
        viewBox="0 0 12 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
      <path
        class="star-color"
        d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z"
        fill="#F2C94C"
      />
    `;

    this.bookReviewText = document.createElement("p");
    this.bookReviewText.className = "review-text";
    this.bookCardText = document.createElement("p");
    this.bookCardText.className = "book__card-text";
    this.bookCardPrice = document.createElement("p");
    this.bookCardPrice.className = "book__card-price";
    this.buttonCard = document.createElement("button");
    this.buttonCard.className = "button";

    for (let i = 0; i < this.booksItems.length; i++) {
      if (!book.url) {
        this.bookImg.src = "https://picsum.photos/200/300";
      } else {
        this.bookImg.src = book.url;
      }
      this.bookImg.width = 212;
      this.bookImg.height = 300;

      this.bookAuthor.innerText = `${book.author}`;

      this.bookTitle.innerText = `${book.title}`;

      this.bookItem.append(this.bookImg);
      this.bookItem.append(this.bookDesc);

      this.bookDesc.append(this.bookAuthor);
      this.bookDesc.append(this.bookTitle);
      this.bookDesc.append(this.bookRating);

      this.bookRating.append(this.bookStars);

      this.bookStars.append(this.starSpan1);
      this.bookStars.append(this.starSpan2);
      this.bookStars.append(this.starSpan3);
      this.bookStars.append(this.starSpan4);
      this.bookStars.append(this.starSpan5);

      switch (book.rating) {
        case 1:
          this.starSpan2.classList.add("colorStar");
          this.starSpan3.classList.add("colorStar");
          this.starSpan4.classList.add("colorStar");
          this.starSpan5.classList.add("colorStar");
          break;
        case 2:
          this.starSpan3.classList.add("colorStar");
          this.starSpan4.classList.add("colorStar");
          this.starSpan5.classList.add("colorStar");
          break;
        case 3:
          this.starSpan4.classList.add("colorStar");
          this.starSpan5.classList.add("colorStar");
          break;
        case 4:
          this.starSpan5.classList.add("colorStar");
      }

      this.bookReviewText.innerHTML = `<span class="review">${book.review} </span> review`;
      this.bookRating.append(this.bookReviewText);

      if (book.text === null || book.text === undefined) {
        this.bookCardText.innerText = "";
      } else {
        this.bookCardText.innerText = `${book.text}`;
      }

      this.bookDesc.append(this.bookCardText);
      if (book.price === undefined && book.currencyCode === undefined) {
        this.bookCardPrice.innerText = "";
      } else {
        this.bookCardPrice.innerText = `${book.currencyCode} ${book.price}`;
      }

      this.bookDesc.append(this.bookCardPrice);

      if (book.price) {
        this.buttonCard.classList.add("button--active");
        this.buttonCard.innerText = `buy now`;
      } else {
        this.buttonCard.classList.remove("button--active");
        this.buttonCard.innerText = `in the cart`;
      }
      this.bookDesc.append(this.buttonCard);

      this.booksList.append(this.bookItem);
    }
  }

  getBagFull() {
    this.buttonsActive = document.querySelectorAll(".button--active");
    if (this.buttonsActive) {
      let count = 0;
      this.buttonsActive.forEach((button) => {
        button.addEventListener(
          "click",
          (event) => {
            if (event.target) {
              let targetBook = event.target;
              const descBookInBag = {
                author: targetBook.parentElement.children[0].textContent,
                title: targetBook.parentElement.children[1].textContent,
                text: targetBook.parentElement.children[3].textContent,
                price: targetBook.parentElement.children[4].textContent,
              };
              this.bookInBag.push(descBookInBag);
              localStorage.setItem("bookInBag", JSON.stringify(this.bookInBag));
              count++;
            }
            this.header.bagItemCount.classList.remove("bag-empty");
            this.header.bagItemCount.textContent = count;
          },
          { once: true }
        );
      });
    }
  }

  render() {
    this.header = new Header();
    this.banner = new Banner();
    this.slider = new Slider();
  }

  async start() {
    this.render();
    this.header.setHeaderLogo();
    this.header.setHeaderMenu();
    this.header.setUserActions();
    this.banner.setBanner();
    this.slider.initSlider();
    this.showCategory(this.categoryArr);
    this.getActiveLink();
    this.getParams(this.categoryTag, this.startIndex);
    await this.initRequest(this.params);
    this.createBooksList();
    this.showBookCard(this.booksItems);
    this.getBagFull();
    this.categoryChange();
    this.nextBooks();
  }
}

export { Book };
