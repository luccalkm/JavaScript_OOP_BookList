// Book Constructor
function Book(title, author, isbn) {
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}

// UI Constructor
function UI() {}

UI.prototype.addBookToList = function (book) {
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
};

UI.prototype.deleteBook = function (target) {
	target.parentElement.parentElement.remove();
};

UI.prototype.clearFields = function clearFields() {
	document.querySelector("#title").value = "";
	document.querySelector("#author").value = "";
	document.querySelector("#isbn").value = "";
};

UI.prototype.showAlert = function (message, className) {
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
	}, 3000);
};

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
		// Add book to list
		ui.addBookToList(book);
		ui.showAlert("Book Added", "success");

		// Clear fields
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
		ui.showAlert("Book deleted!", "removed");
	}
	e.preventDefault();
});
