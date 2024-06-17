sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/app/project1/test/integration/FirstJourney',
		'com/app/project1/test/integration/pages/BooksList',
		'com/app/project1/test/integration/pages/BooksObjectPage',
		'com/app/project1/test/integration/pages/BooksLoanObjectPage'
    ],
    function(JourneyRunner, opaJourney, BooksList, BooksObjectPage, BooksLoanObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/app/project1') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheBooksList: BooksList,
					onTheBooksObjectPage: BooksObjectPage,
					onTheBooksLoanObjectPage: BooksLoanObjectPage
                }
            },
            opaJourney.run
        );
    }
);