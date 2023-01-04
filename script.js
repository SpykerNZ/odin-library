let manuscriptsArray = [];

const fullscreenElem = document.querySelector(".fullscreen-container");
const scriptTemplateElem = document.querySelector(".script-template");
const scriptsElem = document.querySelector(".scripts");
const addManuscriptButtonElem = document.querySelector("button.add");

const titleFormElem = document.querySelector(".add-script  input.title");
const authorFormElem = document.querySelector(".add-script  input.author");
const pagesFormElem = document.querySelector(".add-script  input.pages");
const completedFormElem = document.querySelector(
  ".add-script  input.completed"
);

// Display Functions
function updateScriptsDisplay() {
  scriptsElem.innerHTML = "";
  manuscriptsArray.forEach((book) => {
    const clone = scriptTemplateElem.content.cloneNode(true);
    clone.querySelector(".title").textContent = book.title;
    clone.querySelector(".author").textContent = book.author;
    clone.querySelector(".pages").textContent = `${book.pages} Pages`;
    scriptsElem.append(clone);
  });
}

// Open Form
function openNewManuscriptForm() {
  fullscreenElem.style.display = "block";
}

function closeNewManuscriptForm() {
  clearNewManuscriptForm();
  fullscreenElem.style.display = "none";
}

function clearNewManuscriptForm() {
  titleFormElem.value = "";
  authorFormElem.value = "";
  pagesFormElem.value = "";
  completedFormElem.value = "";
}

function addNewManuscriptForm() {
  const manuscript = new Manuscript(
    (title = titleFormElem.value),
    (author = authorFormElem.value),
    (pages = pagesFormElem.value),
    (completed = completedFormElem.value)
  );
  console.log(manuscript);
  manuscriptsArray.push(manuscript);
  updateScriptsDisplay();
  closeNewManuscriptForm();
  clearNewManuscriptForm();
}

// Library Functions
function Manuscript(title, author, pages, completed) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.completed = completed;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.completed ? "have completed" : "not completed yet"
    }`;
  };
}

// Temp
const testScript1 = new Manuscript(
  (title = "Waiting for Godot"),
  (author = "Samuel Beckett"),
  (pages = 80),
  (completed = true)
);

const testScript2 = new Manuscript(
  (title = "The Mousetrap"),
  (author = "Agatha Christie"),
  (pages = 97),
  (completed = false)
);

const testScript3 = new Manuscript(
  (title = "Hamlet"),
  (author = "William Shakespeare"),
  (pages = 105),
  (completed = false)
);

manuscriptsArray.push(testScript1);
manuscriptsArray.push(testScript2);
manuscriptsArray.push(testScript3);

updateScriptsDisplay();
