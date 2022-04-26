// Form local storage availability checker function
function isStorageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
      // 1) everything except Firefox
      // 2) Firefox
      // test name field too, because code might not be present
      // 3) everything except Firefox
      // 4) Firefox
      // 5) acknowledge QuotaExceededError only if there's something already stored
      e.code === 22 || e.code === 1014 || e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') && (storage && storage.length !== 0);
  }
}

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const form = document.querySelector('#added-book');
const bookList = document.querySelector('#added-bklist');

let books = [];

// If there's local data available,
if (isStorageAvailable('localStorage')) {
  const data = JSON.parse(localStorage.getItem('bookList'));
  // and if it's not empty, update it
  if (data) {
    books = JSON.parse(localStorage.getItem('bookList'));
  }
}

const addData = () => {
  const book = {
    id: Math.floor(Math.random() * 1000000),
    title: title.value,
    author: author.value,
  };
  books.push(book);
  if (isStorageAvailable('localStorage')) {
    localStorage.setItem('bookList', JSON.stringify(books));
  }
};
const printBooks = () => {
  bookList.innerHTML = '';
  books.forEach((dataFromStorage) => {
    bookList.innerHTML += `<div>
    <h1>${dataFromStorage.title}</h1>
    <h2>${dataFromStorage.author}</h2>
    <button id="${dataFromStorage.title}" onclick="removeButton('${dataFromStorage.id}')">Remove</button>
    <hr>
    </div>`;
  });
};

const removeButton = (id) => {
  books = books.filter((book) => book.id !== parseInt(id, 10));

  localStorage.setItem('bookList', JSON.stringify(books));
  printBooks();
};

form.onsubmit = () => {
  addData();
  printBooks();
  form.reset();
};

printBooks();
removeButton();