sap.ui.define([
    "./BaseController",
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment,Filter,FilterOperator) {
        "use strict";

        return Controller.extend("com.app.centrallibrary.controller.View1", {
            onInit: function () {
                debugger;
                // // recently added ODATA model
                // var oModel = new ODataModel("/v2/odata/v4/Books");
                // this.getView().setModel(oModel);
                // // this.getView().byId("_IDGenTable1").getBinding("items");
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
                    // var oModel= this.getView().getModel();

                    // var aUsers = oModel.getProperty("/UserCredentials");
                    // var aFilters = [ new Filter("username",FilterOperator.EQ, oUser1),
                    // new Filter("password",FilterOperator.EQ,oPswd)];

                    // oModel.read("/UserCredentials",{
                    //     filters:aFilters,
                    //     success:function(oData){
                    //         if(oData.results.length>0){
                    //             var userid = oData.results[0].id;
                    //         }
                    //     }
                    // })

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
