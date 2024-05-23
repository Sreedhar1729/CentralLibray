sap.ui.define([
    "./BaseController",
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("com.app.centrallibrary.controller.View1", {
            onInit: function () {
                debugger;
                // this.getView().byId("_IDGenTable1").getBinding("items");
            },

            onBtnClick: function () {
                debugger
                var oUser = this.getView().byId("user").getValue();  //get input value data in oUser variable
                var oPwd = this.getView().byId("pwd").getValue();    //get input value data in oPwd variable

                if (oUser === "admin" && oPwd === "admin@123") {
                    debugger
                    const oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("routeLogin")
                } else {
                    alert("Re-Enter your Detail");
                }
            },
            onUserBtnClick:function(){

                var oUser1 =this.getView().byId("idUserInput").getValue(),
                    oPswd = this.getView().byId("idPasswordInput").getValue();
                    if(oUser1 ==="user" && oPswd ==="user"){
                        const oRouter = this.getOwnerComponent().getRouter();
                        oRouter.navTo("routeUserLogin")
                    }
                    else{
                        alert("Invalid credentials/ user not exist ");
                    }

            },

            onAdminButton: async function () {
                if (!this.oAdminLogin) {
                    debugger
                    this.oAdminLogin = await this.loadFragment("AdminLogin")
                }
                this.oAdminLogin.open();
            },
            onUserLogin:async function(){
                if(!this.oUserLogin){
                    this.oUserLogin = await this.loadFragment("UserLogin")
                }
                this.oUserLogin.open();
            }
        });
    });
