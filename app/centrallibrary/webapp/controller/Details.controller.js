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
          var oSelectedItem = oEvent.getSource().getParent();
          var oSelectedBook = oSelectedItem.getBindingContext().getObject();
          var oSel = this.byId("idBooksTable").getSelectedItem();
          var oBooks_ID = oSel.getBindingContext().getProperty("ID");
      
          const userModel = new sap.ui.model.json.JSONModel({
              users_ID : oSelectedBook.ID,
              books_ID: oBooks_ID,
              reservedate: new Date(),
          });
          this.getView().setModel(userModel, "userModel");
      
          const oPayload = this.getView().getModel("userModel").getProperty("/"),
              oModel = this.getView().getModel("ModelV2");
      
          try {
              await this.createData(oModel, oPayload, "/ReservedBooks");
              this.getView().byId("idReservedBooksPageTable").getBinding("items").refresh();
              this.oCreateBooksDialog.close();
          } catch (error) {
              this.oCreateBooksDialog.close();
              sap.m.MessageBox.error("Some technical Issue");
          }
      },
      
      createData: function(oModel, oPayload, sPath) {
          return new Promise((resolve, reject) => {
              oModel.create(sPath, oPayload, {
                  refreshAfterChange: true,
                  success: function(oSuccessData) {
                      resolve(oSuccessData);
                  },
                  error: function(oErrorData) {
                      reject(oErrorData);
                  }
              });
          });
      }
  });
});
