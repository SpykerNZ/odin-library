let manuscriptArray = [];

const itemTemplateElem = document.querySelector(".item-template");
const itemsElem = document.querySelector(".items");

const openFormButtonElem = document.querySelector("button.open-form");

const formElem = document.querySelector(".add-form");
const fullscreenFormElem = document.querySelector(".fullscreen-container");
const titleFormElem = document.querySelector(".add-form  input.title");
const authorFormElem = document.querySelector(".add-form  input.author");
const pagesFormElem = document.querySelector(".add-form  input.pages");
const completedFormElem = document.querySelector(".add-form  input.completed");
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
    itemsElem.append(clone);
  });
  updateItemsEventListeners(itemsArray);
}

function updateItemsEventListeners(itemsArray) {
  const deleteItemButtonElem = document.querySelectorAll(".item .delete");
  deleteItemButtonElem.forEach((elem) => {
    elem.addEventListener("click", deleteItem);
  });
}

function deleteItem(e) {
  const item = e.target.parentElement.parentElement;
  manuscriptArray.splice(item.dataset.id, 1);
  updateItemsDisplay(manuscriptArray);
}

// Open Form
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
}

function submitForm(e) {
  // TODO - simplify this
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
    (completed = completedFormElem.value)
  );
  manuscriptArray.push(manuscript);
  updateItemsDisplay(manuscriptArray);
  closeForm();
  clearForm();
}

// Library Functions
function Manuscript(title, author, pages, completed) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.completed = completed;
}

// Default Items
const defaultItem1 = new Manuscript(
  (title = "Waiting for Godot"),
  (author = "Samuel Beckett"),
  (pages = 80),
  (completed = true)
);

const defaultItem2 = new Manuscript(
  (title = "The Mousetrap"),
  (author = "Agatha Christie"),
  (pages = 97),
  (completed = false)
);

const defaultItem3 = new Manuscript(
  (title = "Hamlet"),
  (author = "William Shakespeare"),
  (pages = 105),
  (completed = false)
);

manuscriptArray.push(defaultItem1);
manuscriptArray.push(defaultItem2);
manuscriptArray.push(defaultItem3);

updateItemsDisplay(manuscriptArray);
