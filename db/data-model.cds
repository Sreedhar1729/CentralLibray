namespace app.library;

define entity Books {
    key bid              : Integer;
        isbn             : String;
        title            : String(50);
        quantity         : Integer;
        price            : Decimal(5, 2);
        pages            : Integer;
        // authors: Composition of many Authors on authors.books = $self;
        author           : String;
        status           : String;
        avl_stock        : Integer;
        // users    : Association to Users;
        booksloan_id     : Composition of many BooksLoan
                               on booksloan_id.books = $self;
        reservedbooks_id : Composition of many BooksLoan
                               on reservedbooks_id.books = $self;


}

define entity Users {
    key id            : Integer;
        email         : String(30);
        mobile        : String;
        UserName      : String;
        Password      : String;
        booksLoan     : Association to BooksLoan;
        reservedbooks : Association to ReservedBooks;

}

define entity BooksLoan {
    key id       : Integer;
        users    : Association to Users;
        books    : Association to Books;
        duedate  : Date;
        loandate : Date;
        Active   : Boolean;
}

define entity ReservedBooks {
    key id          : Integer;
        users       : Association to Users;
        books       : Association to Books;
        reservedate : Date;


}

// define entity ReservedBooks{
// key reserveid:Integer;
//  rbookid:Composition of Books;
//     reservedate:Date;
//     rstatus:String;
// }


// define entity Authors{
//     key id: Integer;
//         author_name: String;
//         author_address: String;
//         books:Composition of many Books on books.authors = $self;
//         // books:Association to  Books;
// }
