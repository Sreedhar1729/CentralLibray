namespace app.library;

define entity Books {
    key isbn     : String;
        title    : String(50);
        quantity : Integer;
        price    : Decimal(5, 2);
        pages    : Integer;
        // authors: Composition of many Authors on authors.books = $self;
        author: String;
        status: String;

}

define entity Users{
    key id: Integer;
        user_name: String(30);
        mobile: String;
        
}

define entity BooksLoan{
    users:Association to Users;
    books:Association to Books;
    duedate:Date;
    loandate:Date;
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
