sap.ui.define([
    "./BaseController",
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
            if (this.byId("idBooksTable").getSelectedItems().length > 1) {
                sap.m.MessageToast.show("Please select only one book");
                return;
            }
            var oSelectedBook = this.byId("idBooksTable").getSelectedItem().getBindingContext().getObject();
            // console.log(oSelectedBook);
            // console.log(oSel.quantity); // Corrected typo

            // // Adjusting the quantity
            // var oQuantity = oSel.avl_stock - 1;
            // console.log(oQuantity);

            const userModel = new sap.ui.model.json.JSONModel({
                users_ID: oSelectedUser.ID,
                books_ID: oSelectedBook.ID,
                reservedate: new Date(),
                // books: {
                //     avl_stock: oQuantity // Include the avl_stock in the model
                // }
            });
            this.getView().setModel(userModel, "userModel");

            const oPayload = this.getView().getModel("userModel").getProperty("/"),
                oModel = this.getView().getModel("ModelV2");

            try {
                await this.createData(oModel, oPayload, "/ReservedBooks");
                sap.m.MessageBox.success("Book reserved");

                // // Update the avl_stock field in the Books entity
                // oModel.update("/Books(" + oSelectedBook.ID + ")", oPayload.books, {
                //     success: function () {
                //         this.getView().byId("idBooksTable").getBinding("items").refresh();
                //     }.bind(this),
                //     error: function (oError) {
                //         sap.m.MessageBox.error("Failed to update avl_stock: " + oError.message);
                //     }.bind(this)
                // });

            } catch (error) {
                sap.m.MessageBox.error("Some technical issue occurred");
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
        },
        onNotificationPress: async function () {
            if (!this.oNotificationDialog) {
                this.oNotificationDialog = await this.loadFragment("Notification"); // Load your fragment asynchronously
            }
            this.oNotificationDialog.open();
        },
        onCloseNotification: function () {
            if (this.oNotificationDialog.isOpen()) {
                this.oNotificationDialog.close();
            }
        }
    });
});
