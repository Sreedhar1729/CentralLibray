sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel"
], function (BaseController, ODataModel) {
    "use strict";

    return BaseController.extend("com.app.centrallibrary.controller.Details", {
        onInit: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.attachRoutePatternMatched(this.onUserDetailsLoad, this);
        },

        onUserDetailsLoad: function (oEvent) {
            const { ID } = oEvent.getParameter("arguments");
            this.id = ID;
            const sRouterName = oEvent.getParameter("name");
            const oObjectPage = this.getView().byId("ObjectPageLayout");

            oObjectPage.bindElement(`/Users(${ID})`);
        },

        onBorrowNewBookPress: async function (oEvent) {
            var oSel = this.byId("idBooksTable").getSelectedItem().getBindingContext().getObject();
            
            var oSelectedItem = oEvent.getSource().getParent();
            console.log(oSelectedItem);
            var oSelectedUser = oSelectedItem.getBindingContext().getObject();
            if(this.byId("idBooksTable").getSelectedItems().length>1){
                MessageToast.show("Please Select only one Book");
                return
            }
            var oSelectedBook=this.byId("idBooksTable").getSelectedItem().getBindingContext().getObject()
            console.log(oSelectedBook)
            console.log(oSel.qunatity);
            var oQuantity = oSel.quantity-1;
            console.log(oQuantity)
    //         if (!oSel) {
    //             sap.m.MessageBox.error("No book selected.");
    //             return;
    //         }
            
            
    //         var oBooksContext = oSel.getBindingContext();
    //         if (!oBooksContext) {
    //             console.error("Binding context not found.");
    //             return;
    //         }
        
    //         var oModel = oBooksContext.getModel();
    //         if (!oModel) {
    //             console.error("Model not found.");
    //             return;
    //         }
        
    //         var sPath = oBooksContext.getPath();

    // // Retrieve the whole entity object
    // var oBook = oModel.getObject(sPath);
    // if (!oBook) {
    //     console.error("Book data not found.");
    //     return;
    // }

    // var oBooks_quna = oBook.quantity;

    // if (typeof oBooks_quna !== 'number') {
    //     console.error("Quantity is not a number.");
    //     return;
    // }

    // // Update the quantity property
    // oBook.quantity = Math.max(0, oBooks_quna - 1);

    // // Update the entity object back to the model
    // oModel.update(sPath, oBook, {
    //     success: function () {
    //         console.log("Quantity updated successfully.");
    //     },
    //     error: function (oError) {
    //         console.error("Error updating quantity:", oError);
    //     }
    // });


            // var oSelectedBook = oSel.getBindingContext().getObject();
            // var oBooks_ID = oSelectedBook.ID;
            
            const userModel = new sap.ui.model.json.JSONModel({
                users_ID: oSelectedUser.ID,
                books_ID: oSelectedBook.ID,
                reservedate: new Date(),
                books:{
                    avl_stock:oQuantity
                }
            });
            this.getView().setModel(userModel, "userModel");

            const oPayload = this.getView().getModel("userModel").getProperty("/"),
                  oModel = this.getView().getModel("ModelV2");

            try {
                await this.createData(oModel, oPayload, "/ReservedBooks");
                sap.m.MessageBox.success("Book reserved");
                // this.getView().byId("idReservedBooksPageTable").getBinding("items").refresh();
                // this.oCreateBooksDialog.close();
                oModel.update("/Books(" + oSelectedBook.ID + ")", oPayload.books,{
                    success:function(){
                        this.getView().byId("idBooksTable").getBinding("items").refresh();
                    }.bind(this),
                    error:function(oError){
                        sap.m.MessageBox("failed"+oError.message);
                    }.bind(this)
                    });
                    
                
            } catch (error) {
                // this.oCreateBooksDialog.close();
                sap.m.MessageBox.error("Some technical Issue");
            }
        },

        createData: function (oModel, oPayload, sPath) {
            return new Promise((resolve, reject) => {
                oModel.create(sPath, oPayload, {
                    refreshAfterChange: true,
                    success: function (oSuccessData) {
                        resolve(oSuccessData);
                    },
                    error: function (oErrorData) {
                        reject(oErrorData);
                    }
                });
            });
        }
    });
});
