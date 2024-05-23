using app.library as my from '../db/data-model.cds';
@path:'/BookSRV'

service AppLibraryService {
	 entity Books as projection on my.Books;
	 entity Users as projection on my.Users;
	 entity BooksLoan as projection on my.BooksLoan;
}