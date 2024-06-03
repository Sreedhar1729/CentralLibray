sap.ui.define(
    [   "./BaseController",
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("com.app.centrallibrary.controller.ReservedBooks", {
        onInit: function() {
          var oTable = this.byId("idReservedBooksPageTable");

          
          var oColumn = oTable.getColumns()[4]; // Index 1 represents the second column
      
          // Hide the column
          oColumn.setVisible(false);

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
        var oSelectedItem = oEvent.getSource().getParent();
          var oSelectedBook1 = oSelectedItem.getBindingContext().getObject();
        if (oSelectedBook1 && oSelectedBook1.books) {
          if (typeof oSelectedBook1.books.avl_stock === 'number') {
              oSelectedBook1.books.avl_stock = Math.max(0, oSelectedBook1.books.avl_stock - 1);
          } else {
              console.error("Quantity is not a number.");
          }
      } else {
          console.error("Selected book or books object is not defined.");
      }

    

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
              this.getView().byId("idReservedBooksPageTable").getSelectedItem().getBindingContext().delete("$auto");
              //this.oCreateBooksDialog.close();
          } catch (error) {
              //this.oCreateBooksDialog.close();
              sap.m.MessageBox.error("Some technical Issue");
          }
      },

      });
    }
  );
  