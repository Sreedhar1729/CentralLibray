using app.library as my from '../db/data-model.cds';

service AppLibraryService {
	@readonly entity Books as projection on my.Books;
	@readonly entity Users as projection on my.Users;
	@readonly entity BooksLoan as projection on my.BooksLoan;
}