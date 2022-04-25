const books = [
  {
    title: 'The Power of Now',
    author: 'Eckart Tolle',
    id: 1,
  },
  {
    title: 'Don Quixote',
    author: 'Miguel de Cervantes',
    id: 2,
  },
  {
    title: 'Moby Dick',
    author: 'Herman Melville',
    id: 3,
  },
];

const bookListSection = document.querySelector('#added-bklist');


// Display and create a button remove
function displayBooksList(bookList) {
  bookListSection.innerHTML = bookList.map((book) => `
  <p class="title">${book.title}</p>
              <p>${book.author}</p>
              <button data-id=${book.id} class="remove">Remove</button>
              <hr>`).join('');
}


//storare
function storeBook(bookList) {
  localStorage.setItem('bookList', JSON.stringify(bookList));
}


function getBookList() {
  const bookListFromLocalStorage = localStorage.getItem('bookList');
  if (bookListFromLocalStorage) {
    return JSON.parse(bookListFromLocalStorage);
  }
  return books;
}

displayBooksList(getBookList());

//add a book

const addedBook = document.querySelector('#added-book');
addedBook.addEventListener('submit', function (newEvent) {
  newEvent.preventDefault();
  const title = newEvent.target.querySelector('#title').value;
  const author = newEvent.target.querySelector('#author').value;
  const bookList = getBookList();
  const id = bookList.length + 1;
  bookList.push({
    title,
    author,
    id,
  });
  this.reset();
  displayBooksList(bookList);
  storeBook(bookList);
});


// remove a book
bookListSection.addEventListener('click', (newEvent) => {
  if (newEvent.target.classList.contains('remove')) {
    const { id } = newEvent.target.dataset;
    const bookList = getBookList();
    const bookListFiltered = bookList.filter((book) => book.id !== +id);
    displayBooksList(bookListFiltered);
    storeBook(bookListFiltered);
  }
});