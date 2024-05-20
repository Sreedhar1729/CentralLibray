sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.app.centrallibrary.controller.View1", {
            onInit: function () {
                debugger;
                // this.getView().byId("_IDGenTable1").getBinding("items");
 

            },
            onBtnClick : function(){
                debugger
                var oUser = this.getView().byId("user").getValue();  //get input value data in oUser variable
                var oPwd = this.getView().byId("pwd").getValue();    //get input value data in oPwd variable
               
                if(oUser==="admin" && oPwd==="admin@123"){    
                    debugger          
                    const oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("routeLogin")
                }else{
                    alert("Re-Enter your Detail");
                }
               
               
            }
        });
    });
