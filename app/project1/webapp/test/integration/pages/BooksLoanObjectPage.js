sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'com.app.project1',
            componentId: 'BooksLoanObjectPage',
            contextPath: '/Books/booksloan_id'
        },
        CustomPageDefinitions
    );
});