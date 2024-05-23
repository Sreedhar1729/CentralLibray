sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "./BaseController"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Fragment) {
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
               
               
            },
            onAdminButton: async function(){
                if (!this.oAdminLogin) {
                    this.oAdminLogin = await Fragment.load({
                        id: this.getView().getId(),
                        name: "com.app.centrallibrary.fragments.AdminLogin",
                        controller: this
                    });
                    this.getView().addDependent(this.oAdminLogin);  
                
            }
            this.oAdminLogin.open();
        }
        });
    });
