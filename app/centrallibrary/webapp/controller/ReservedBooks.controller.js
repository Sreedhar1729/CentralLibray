sap.ui.define(
    [   "./BaseController",
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("com.app.centrallibrary.controller.ReservedBooks", {
        onInit: function() {
        },
        RDEL:async function(oEvent)
        {
          //console.log(this.byId("idReservedBooksPageTable").getSelectedItem().getBindingContext().getObject());
          if(this.byId("idReservedBooksPageTable").getSelectedItems().length>1){
            MessageToast.show("Please Select only one Book");
            return
        }
        var oSelectedBook=this.byId("idReservedBooksPageTable").getSelectedItem().getBindingContext().getObject()
        console.log(oSelectedBook)
    
        const userModel = new sap.ui.model.json.JSONModel({
            books_ID : oSelectedBook.books.ID,
            users_ID: oSelectedBook.users.ID,
            duedate: new Date(),
            loandate:new Date(),
            Active:true,
        });
        this.getView().setModel(userModel, "userModel");
    
        const oPayload = this.getView().getModel("userModel").getProperty("/"),
            oModel = this.getView().getModel("ModelV2");
            try {
              await this.createData(oModel, oPayload, "/BooksLoan");
              sap.m.MessageBox.success("Book Accepted");
              //this.getView().byId("idReservedBooksPageTable").getBinding("items").refresh();
              //this.oCreateBooksDialog.close();
          } catch (error) {
              //this.oCreateBooksDialog.close();
              sap.m.MessageBox.error("Some technical Issue");
          }
      },

      });
    }
  );
  