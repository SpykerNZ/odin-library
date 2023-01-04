let manuscriptArray = [];

const itemTemplateElem = document.querySelector(".item-template");
const itemsElem = document.querySelector(".items");

const openFormButtonElem = document.querySelector("button.open-form");
const formElem = document.querySelector(".add-form");
const fullscreenFormElem = document.querySelector(".fullscreen-container");
const titleFormElem = document.querySelector(".add-form input.title");
const authorFormElem = document.querySelector(".add-form input.author");
const pagesFormElem = document.querySelector(".add-form input.pages");
const completedFormElem = document.querySelector(".add-form input.completed");
const favoriteFormElem = document.querySelector(".add-form input.favorite");
const submitFormButtomElem = document.querySelector(".add-form input.submit");
const closeFormButtonElem = document.querySelector(".add-form button.close");

openFormButtonElem.addEventListener("click", openForm);
closeFormButtonElem.addEventListener("click", closeForm);
submitFormButtomElem.addEventListener("click", submitForm);

// Display Functions
function updateItemsDisplay(itemsArray) {
  itemsElem.innerHTML = "";
  itemsArray.forEach((item, i) => {
    const clone = itemTemplateElem.content.cloneNode(true);
    clone.querySelector(".item").dataset.id = i;
    clone.querySelector(".title").textContent = item.title;
    clone.querySelector(".author").textContent = item.author;
    clone.querySelector(".pages").textContent = `${item.pages} Pages`;
    if (item.favorite) {
      clone.querySelector(".item").classList.add("favorite");
    }
    if (item.completed) {
      clone.querySelector(".item .completed").src =
        "./images/notebook-check.svg";
      clone.querySelector(".item .completed").classList.add("filter-hover-red");
    }
    itemsElem.append(clone);
  });
  updateItemsEventListeners(itemsArray);
}

function updateItemsEventListeners() {
  updateElemChildEventListener(".item .delete", deleteItem);
  updateElemChildEventListener(".item .favorite", favoriteItemToggle);
  updateElemChildEventListener(".item .completed", completedItemToggle);
}

function updateElemChildEventListener(selector, func) {
  const elem = document.querySelectorAll(selector);
  elem.forEach((e) => {
    e.addEventListener("click", func);
  });
}

function favoriteItemToggle(e) {
  const item = e.target.parentElement.parentElement;
  manuscriptArray[item.dataset.id].favorite =
    !manuscriptArray[item.dataset.id].favorite;
  updateItemsDisplay(manuscriptArray);
}

function completedItemToggle(e) {
  const item = e.target.parentElement.parentElement;
  manuscriptArray[item.dataset.id].completed =
    !manuscriptArray[item.dataset.id].completed;
  updateItemsDisplay(manuscriptArray);
}

function deleteItem(e) {
  const item = e.target.parentElement.parentElement;
  manuscriptArray.splice(item.dataset.id, 1);
  updateItemsDisplay(manuscriptArray);
}

// Form Controls
function openForm() {
  fullscreenFormElem.style.display = "block";
}

function closeForm() {
  clearForm();
  fullscreenFormElem.style.display = "none";
}

function clearForm() {
  titleFormElem.value = "";
  authorFormElem.value = "";
  pagesFormElem.value = "";
  completedFormElem.value = "";
  favoriteFormElem.value = "";
}

function submitForm(e) {
  if (
    titleFormElem.value === "" ||
    authorFormElem.value === "" ||
    pagesFormElem.value === ""
  ) {
    return;
  }
  e.preventDefault();
  const manuscript = new Manuscript(
    (title = titleFormElem.value),
    (author = authorFormElem.value),
    (pages = pagesFormElem.value),
    (completed = completedFormElem.value),
    (favorite = favoriteFormElem.value)
  );
  manuscriptArray.push(manuscript);
  updateItemsDisplay(manuscriptArray);
  closeForm();
  clearForm();
}

function Manuscript(title, author, pages, completed, favorite) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.completed = completed;
  this.favorite = favorite;
}

// Default Items
manuscriptArray.push(
  new Manuscript(
    (title = "Waiting for Godot"),
    (author = "Samuel Beckett"),
    (pages = 80),
    (completed = true),
    (favorite = true)
  )
);
manuscriptArray.push(
  new Manuscript(
    (title = "The Mousetrap"),
    (author = "Agatha Christie"),
    (pages = 97),
    (completed = false),
    (favorite = false)
  )
);
manuscriptArray.push(
  new Manuscript(
    (title = "Hamlet"),
    (author = "William Shakespeare"),
    (pages = 105),
    (completed = false),
    (favorite = false)
  )
);

updateItemsDisplay(manuscriptArray);
