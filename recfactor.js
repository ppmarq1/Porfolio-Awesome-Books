// Book Class: Represents a book
class Book {
    constructor(title, author, idnumber) {
        this.title = title;
        this.author = author;
        this.idnumber = idnumber;
    }

}


//UI Class: Handle UI tasks 
class UI  {
    static displayBooks() {
        const StoreBooks = [
            {
                title: 'The Power of Now',
                author: 'Eckart Tolle',
                idnumber: 1,
              },
              {
                title: 'Ulisses',
                author: 'Michael Bay',
                idnumber: 2,
              },
              {
                title: 'Moby Dick',
                author: 'Chinhua Achebe',
                idnumber: 3,
              },
            ];

        const books = StoreBooks;
        books.forEach((book) => UI.addBookToList(book));    
    }

        static addBookToList(book) {
            const list = document.querySelector('#book-list');

            const row = document.createElement('tr');

             row.innerHTML = '
             <td>${book.title}</td>
             <td>${book.author}</td>
             <td>${book.idnumber}</td>
                  
             
             '
                
            }

}
//Store Clas: Handles storage

//Display Books

// Add a Book

// Remove a Book

