let manuscriptArray = [];

const itemTemplateElem = document.querySelector(".item-template");
const itemsElem = document.querySelector(".items");

const addItemButtonElem = document.querySelector("button.add");

const fullscreenFormElem = document.querySelector(".fullscreen-container");
const titleFormElem = document.querySelector(".add-item  input.title");
const authorFormElem = document.querySelector(".add-item  input.author");
const pagesFormElem = document.querySelector(".add-item  input.pages");
const completedFormElem = document.querySelector(".add-item  input.completed");

// Display Functions
function updateItemsDisplay(array) {
  itemsElem.innerHTML = "";
  array.forEach((book) => {
    const clone = itemTemplateElem.content.cloneNode(true);
    clone.querySelector(".title").textContent = book.title;
    clone.querySelector(".author").textContent = book.author;
    clone.querySelector(".pages").textContent = `${book.pages} Pages`;
    itemsElem.append(clone);
  });
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

function submitForm() {
  const manuscript = new Manuscript(
    (title = titleFormElem.value),
    (author = authorFormElem.value),
    (pages = pagesFormElem.value),
    (completed = completedFormElem.value)
  );
  console.log(manuscript);
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

// Temp
const testItem1 = new Manuscript(
  (title = "Waiting for Godot"),
  (author = "Samuel Beckett"),
  (pages = 80),
  (completed = true)
);

const testItem2 = new Manuscript(
  (title = "The Mousetrap"),
  (author = "Agatha Christie"),
  (pages = 97),
  (completed = false)
);

const testItem3 = new Manuscript(
  (title = "Hamlet"),
  (author = "William Shakespeare"),
  (pages = 105),
  (completed = false)
);

manuscriptArray.push(testItem1);
manuscriptArray.push(testItem2);
manuscriptArray.push(testItem3);

updateItemsDisplay(manuscriptArray);
