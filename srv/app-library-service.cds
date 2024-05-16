using app.library as my from '../db/data-model.cds';

define service AppLibraryService {
	 entity Books as projection on my.Books;
	 entity Authors as projection on my.Authors;
	 entity Users as projection on my.Users;
	 entity BooksLoan as projection on my.BooksLoan;
	 entity ReservedBooks as projection on my.ReservedBooks;
}