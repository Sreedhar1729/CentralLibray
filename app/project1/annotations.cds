using AppLibraryService as service from '../../srv/app-library-service';
annotate service.Books with @(
    UI: {
        SelectionFields: [ isbn, author, title ],
        FieldGroup #GeneratedGroup: {
            $Type: 'UI.FieldGroupType',
           
            Data: [
                { $Type: 'UI.DataField', Label: 'ISBN', Value: isbn },
                { $Type: 'UI.DataField', Label: 'Title', Value: title },
                { $Type: 'UI.DataField', Label: 'Quantity', Value: quantity },
                { $Type: 'UI.DataField', Label: 'Price', Value: price },
                { $Type: 'UI.DataField', Label: 'Pages', Value: pages },
                { $Type: 'UI.DataField', Label: 'Author', Value: author },
                { $Type: 'UI.DataField', Label: 'Status', Value: status },
                { $Type: 'UI.DataField', Label: 'Available Stock', Value: avl_stock }
            ]
        },
       
        Facets: [
            {
                $Type: 'UI.ReferenceFacet',
                ID: 'GeneratedFacet1',
                Label: 'Book Information',
                Target: '@UI.FieldGroup#GeneratedGroup'
            }
        ],
        LineItem: [
            { $Type: 'UI.DataField', Label: 'ISBN', Value: isbn },
            { $Type: 'UI.DataField', Label: 'Title', Value: title },
            { $Type: 'UI.DataField', Label: 'Quantity', Value: quantity },
            { $Type: 'UI.DataField', Label: 'Price', Value: price },
            { $Type: 'UI.DataField', Label: 'Pages', Value: pages }
        ]
    }
);
 
annotate service.Users with @(
    UI: {
        FieldGroup #UsersGeneralFacet: {
            $Type: 'UI.FieldGroupType',
            Data: [
                { $Type: 'UI.DataField', Label: 'Email', Value: email },
                { $Type: 'UI.DataField', Label: 'Mobile', Value: mobile },
                { $Type: 'UI.DataField', Label: 'User Name', Value: UserName },
                { $Type: 'UI.DataField', Label: 'Password', Value: Password }
            ]
        },
        SelectionFields: [ UserName, email, mobile ],
        Facets: [
            {
                $Type: 'UI.ReferenceFacet',
                ID: 'UsersGeneralFacet',
                Label: 'General Information',
                Target: '@UI.FieldGroup#UsersGeneralFacet'
            }
        ],
        LineItem: [
            { $Type: 'UI.DataField', Label: 'User Name', Value: UserName },
            { $Type: 'UI.DataField', Label: 'Email', Value: email },
            { $Type: 'UI.DataField', Label: 'Mobile', Value: mobile }
        ]
    }
);

