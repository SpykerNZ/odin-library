let scriptsArray = [];

function Script(title, author, pages, completed) {
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

function updateScriptsDisplay() {
  const scriptTemplateElem = document.querySelector(".script-template");
  const scriptElem = document.querySelector(".scripts");

  scriptsArray.forEach((book) => {
    const clone = scriptTemplateElem.content.cloneNode(true);
    clone.querySelector(".title").textContent = book.title;
    clone.querySelector(".author").textContent = book.author;
    clone.querySelector(".pages").textContent = `${book.pages} Pages`;
    scriptElem.append(clone);
  });
}

const testBook1 = new Script(
  (title = "Six Go Mad In Christchurch"),
  (author = "Jamie Spyker"),
  (pages = 20),
  (read = true)
);

const testBook2 = new Script(
  (title = "The Pratts"),
  (author = "Wendy Steeds"),
  (pages = 30),
  (read = false)
);

scriptsArray.push(testBook1);
scriptsArray.push(testBook2);

updateScriptsDisplay();

// Display the books on the pages
// Use tables or cards to store on the page
// want to have a list of cards to store on the page!

// Need a new book button to allow users to input information about books
// Toggle the read status / remove books
