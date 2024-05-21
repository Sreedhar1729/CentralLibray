sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Filter,FilterOperator) {
        "use strict";

        return Controller.extend("com.app.centrallibrary.controller.Login", {
            onInit: function () {
                debugger;
                this.getView().byId("_IDGenTable1").getBinding("items");
 

            },
            onGoPress: function () {
                debugger

                //  filter operator
                const oView = this.getView(),
                oISBN = oView.byId("_IDGenInput1"), 
                sISBN = oISBN.getValue(),
                oAuthor=oView.byId("_IDGenInput2"),
                sAuthor=oAuthor.getValue(),
                oStatus = oView.byId("_IDGenInput3"),
                sStatus=oStatus.getValue(),
                oTable=oView.byId("_IDGenTable1"),
                aFilters = [];

                sISBN ? aFilters.push(new Filter ("isbn", FilterOperator.EQ, sISBN)) : "";
                sAuthor ? aFilters.push(new Filter ("author", FilterOperator.EQ, sAuthor)) : "";
                sStatus ? aFilters.push(new Filter ("status", FilterOperator.EQ, sStatus)) : "";
                oTable.getBinding("items").filter(aFilters);
             
            },
              
        });
    });


       // var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                // var selectedProductId = oEvent.getSource().getBindingContext().getProperty("ProductID");
                // oRouter.navTo("detail", {
                //     productId: selectedProductId
                // });