class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

class UI {
	addBookToList(book) {
		const list = document.querySelector("#book-list");
		// Create row
		const row = document.createElement("tr");
		// Insert columns to row
		row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><i class="fa-sharp fa-solid fa-xmark delete"></i></td>`;

		list.appendChild(row);
	}

	deleteBook(target) {
		target.parentElement.parentElement.remove();
	}

	clearFields() {
		document.querySelector("#title").value = "";
		document.querySelector("#author").value = "";
		document.querySelector("#isbn").value = "";
	}

	showAlert(message, className) {
		// Create a div
		const div = document.createElement("div");
		// Add classes
		div.className = `alert ${className}`;
		// Add text
		div.appendChild(document.createTextNode(message));
		// Get a parent and insert div
		const container = document.querySelector(".container");
		const form = document.querySelector("#book-form");
		container.insertBefore(div, form);
		// Delete
		setTimeout(function () {
			document.querySelector(".alert").remove();
		}, 2800);
	}
}

class LocalStore {
	static getBooks() {
		let books;
		if (localStorage.getItem("books") === null) {
			books = [];
		} else {
			books = JSON.parse(localStorage.getItem("books"));
		}

		return books;
	}

	static reloadBooks(book) {
		const books = LocalStore.getBooks();
		books.push(book);
		localStorage.setItem("books", JSON.stringify(books));
	}

	static displayBooks() {
		const books = LocalStore.getBooks();
		books.forEach((book) => {
			const ui = new UI();
			ui.addBookToList(book);
		});
	}

	static removeBook(isbn) {
		const books = LocalStore.getBooks();
		books.forEach((book, index) => {
			if (book.isbn === isbn) {
				books.splice(index, 1);
			}
		});
		localStorage.setItem("books", JSON.stringify(books));
	}
}

// DOM Load event
document.addEventListener("DOMContentLoaded", LocalStore.displayBooks());

// Event Listener Add Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
	// Form values
	const title = document.querySelector("#title").value,
		author = document.querySelector("#author").value,
		isbn = document.querySelector("#isbn").value;

	// Instantiate Book
	const book = new Book(title, author, isbn);

	// Instantiate UI
	const ui = new UI();

	if (title === "" || author === "" || isbn === "") {
		// Error Alert
		ui.showAlert("Please, fill in all fields.", "error");
	} else {
		ui.addBookToList(book);

		LocalStore.reloadBooks(book);

		ui.showAlert("Book Added", "success");

		ui.clearFields();
	}

	e.preventDefault();
});

// Event Listener Delete
document.querySelector("#book-list").addEventListener("click", function (e) {
	const ui = new UI();
	console.log(e.target);
	if (e.target.classList.contains("delete")) {
		ui.deleteBook(e.target);
		LocalStore.removeBook(e.target.parentElement.previousElementSibling.textContent);
		ui.showAlert("Book deleted!", "removed");
	}
	e.preventDefault();
});
