let manuscriptsArray = [];

const fullscreenElem = document.querySelector(".fullscreen-container");
const scriptTemplateElem = document.querySelector(".script-template");
const scriptsElem = document.querySelector(".scripts");
const addManuscriptButtonElem = document.querySelector("button.add");

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
  fullscreenElem.style.display = "none";
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

function addManuscript() {
  manuscriptsArray.push(testScript1);
  console.log("pressed");
  updateScriptsDisplay();
}

// Temp
const testScript1 = new Manuscript(
  (title = "Waiting for Godot"),
  (author = "Samuel Beckett"),
  (pages = 20),
  (completed = true)
);

const testScript2 = new Manuscript(
  (title = "The Pratts"),
  (author = "Wendy Steeds"),
  (pages = 30),
  (completed = false)
);

const testScript3 = new Manuscript(
  (title = "Hamlet"),
  (author = "William Shakespeare"),
  (pages = 15),
  (completed = false)
);

manuscriptsArray.push(testScript1);
manuscriptsArray.push(testScript2);
manuscriptsArray.push(testScript3);

updateScriptsDisplay();
