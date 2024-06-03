sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("com.app.centrallibrary.controller.UserLoans", {
        onInit: function() {
        },
        onClickDelete:async function(){
          var osel = this.byId("idUserLoans").getSelectedItem().getBindingContext().getObject();

           
        
          const newUserLoans = new sap.ui.model.json.JSONModel({
            ID:osel.ID,
            books_ID:osel.books.ID,
            users_ID:osel.users.ID,
            Active: false,

          });

          this.getView().setModel(newUserLoans, "newUserLoans");
          const oPayload = this.getView().getModel("newUserLoans").getData()
                  oModel = this.getView().getModel("ModelV2");
                  try {
                    // Assuming your update method is provided by your OData V2 model
                    oModel.update("/BooksLoan(" + oPayload.ID + ")", oPayload, {
                        success: function() {
                            this.getView().byId("idUserLoans").getBinding("items").refresh();
                            // this.oEditBooksDialog.close();
                        }.bind(this),
                        error: function(oError) {
                            // this.oEditBooksDialog.close();
                            sap.m.MessageBox.error("Failed to update book: " + oError.message);
                        }.bind(this)
                    });
                } catch (error) {
                    // this.oEditBooksDialog.close();
                    sap.m.MessageBox.error("Some technical Issue");
                }
            
            
                var oModel = new sap.ui.model.odata.v2.ODataModel({
                    serviceUrl: "https://port4004-workspaces-ws-ljsm6.us10.trial.applicationstudio.cloud.sap/v2/BookSRV",
                    defaultBindingMode: sap.ui.model.BindingMode.TwoWay,
                    // Configure message parser
                    messageParser: sap.ui.model.odata.ODataMessageParser
                })  
      
            
    
    }
      });
    }
  );
  