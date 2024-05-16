namespace app.library;

define entity Books {
    key isbn     : Integer;
        title    : String(50);
        quantity : Integer;
        price    : Decimal(5, 2);
        pages    : Integer;
        // authors: Composition of many Authors on authors.books = $self;
        authors:Association to Authors;

}

define entity Authors{
    key id: Integer;
        author_name: String;
        author_address: String;
        books:Composition of many Books on books.authors = $self;
        // books:Association to  Books;
}

define entity Users{
    key id: Integer;
        user_name: String(30);
        mobile: String;
}

define entity BooksLoan{
    key bookid:Association to many Books;
    duedate:Date;
    status:String;
}

define entity ReservedBooks{

key rbookid:Association to many Books;
    reservedate:Date;
    rstatus:String;
}
