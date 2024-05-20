sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.app.centrallibrary.controller.Login", {
            onInit: function () {
                debugger;
                this.getView().byId("_IDGenTable1").getBinding("items");
 

            },
            onGoPress: function () {
                alert("hii");
                console.log("welcome");
                const oView = this.getView();
            }
        });
    });
