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
  manuscripts.toggleFavorite(item.dataset.id);
  updateItemsDisplay(manuscripts.array);
}

function completedItemToggle(e) {
  const item = e.target.parentElement.parentElement;
  manuscripts.toggleCompleted(item.dataset.id);
  updateItemsDisplay(manuscripts.array);
}

function deleteItem(e) {
  const item = e.target.parentElement.parentElement;
  manuscripts.remove(item.dataset.id);
  updateItemsDisplay(manuscripts.array);
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
  manuscripts.add(manuscript);
  updateItemsDisplay(manuscripts.array);
  closeForm();
  clearForm();
}

class Manuscript {
  constructor(title, author, pages, completed, favorite) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.completed = completed;
    this.favorite = favorite;
  }
}

class Manuscripts {
  array = [];

  add(manuscript) {
    this.array.push(manuscript);
  }

  remove(id) {
    this.array.splice(id, 1);
  }

  toggleFavorite(id) {
    this.array[id].favorite = !this.array[id].favorite;
  }

  toggleCompleted(id) {
    this.array[id].completed = !this.array[id].completed;
  }
}

const manuscripts = new Manuscripts();

// Default Items
manuscripts.add(
  new Manuscript(
    (title = "Waiting for Godot"),
    (author = "Samuel Beckett"),
    (pages = 80),
    (completed = true),
    (favorite = true)
  )
);
manuscripts.add(
  new Manuscript(
    (title = "The Mousetrap"),
    (author = "Agatha Christie"),
    (pages = 97),
    (completed = false),
    (favorite = false)
  )
);
manuscripts.add(
  new Manuscript(
    (title = "Hamlet"),
    (author = "William Shakespeare"),
    (pages = 105),
    (completed = false),
    (favorite = false)
  )
);

updateItemsDisplay(manuscripts.array);
