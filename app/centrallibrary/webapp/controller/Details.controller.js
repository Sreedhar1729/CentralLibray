sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel"
  ],
  function (BaseController, ODataModel) {
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
      
      onBorrowNewBookPress: async function () {

        // var s = this.byId("idBooksTable").getSelectedItem();
         
        // if (s) {
        //  var  oisbn = s.getBindingContext().getObject().isbn;
        //  var  ouserid = z.getBindingContext().getObject().id;
        //   // var otitle =  s.getBindingContext().getObject().title;
        // //  var  oauthor =s.getBindingContext().getObject().author;
        //   // var oqunatity = s.getBindingContext().getObject().quantity;

        //   const oReservedBook = new sap.ui.model.json.JSONModel({
        //     books_id: oisbn,
        //     users_id: ouserid,
        //     id: "1",
        //     reservedate : new Date(),
  
  
        //   });
        //   this.getView().setModel(oReservedBook, "oReserve")
  
  
         


      },
      createData: function (oModel, oPayload, sPath) {
        return new Promise((resolve, reject) => {
          oModel.create(sPath, oPayload, {
            refreshAfterChange: true,
            success: function (oSuccessData) {
              resolve(oSuccessData);
            },
            error: function (oErrorData) {
              reject(oErrorData)
            }
          })
        });
      }
    });
  }
);







// var s = this.byId("_IDGenTable1").getSelectedItem();
// if (s) {
//     // var oBook = s.getBindingContext().getObject().ID;
//     var oAuthorName = s.getBindingContext().getObject().author
//     var oBookname = s.getBindingContext().getObject().title
//     var oStock = s.getBindingContext().getObject().quantity
//     var oISBN = s.getBindingContext().getObject().isbn
//     var oPrice = s.getBindingContext().getObject().price
//     var oPage = s.getBindingContext().getObject().pages;
//     var oStatus = s.getBindingContext().getObject().status;

//      var newBookModel = new JSONModel({
//         author: oAuthorName,
//         title: oBookname,
//         quantity: oStock,
//         isbn: oISBN,
//         price:oPrice,
//         pages:oPage,
//         status:oStatus
//     });
