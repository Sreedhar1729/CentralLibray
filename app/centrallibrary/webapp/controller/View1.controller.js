sap.ui.define([
    "./BaseController",
    // "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/odata/v2/ODataModel"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment, Filter, FilterOperator, ODataModel) {
        "use strict";

        return Controller.extend("com.app.centrallibrary.controller.View1", {
            onInit: function () {
                debugger;

                // // recently added ODATA model
                var oView = this.getView();
                // var oModel = oView.getModel("/BookSRV/UserCredentials"); // Assuming the model is already set on the view
                var oModel = new ODataModel("/v2/BookSRV/");
                this.getView().setModel(oModel);
                // const oLocalModel = new sap.ui.json.JSONModel(
                //     {

                //     }
                // )

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
            onUserBtnClick: function () {
                debugger

                var oUser1 = this.getView().byId("idUserInput").getValue(),
                    oPswd = this.getView().byId("idPasswordInput").getValue();
                var oModel = new ODataModel("/v2/BookSRV/");
                this.getView().setModel(oModel);

                if (oUser1 && oPswd) {
                    // fetching records
                    oModel.read("/Users", {
                        filters: [
                            new Filter("UserName", FilterOperator.EQ, oUser1),
                            new Filter("Password", FilterOperator.EQ, oPswd)

                        ],
                        success: async (oData) => {
                            var aRecords = oData.results;
                            var oUserName = oData.results[0].id;

                            // iterate each record

                            var bValidCredentials = aRecords.some(function (oRecord) {
                                return oRecord.UserName === oUser1 && oRecord.Password === oPswd;
                            });
                            if (bValidCredentials) {
                                // Valid credentials
                                const oRouter = await this.getOwnerComponent().getRouter();
                                oRouter.navTo("routeUserLogin", { id: oUserName })
                            } else {
                                // Invalid credentials
                                alert("Invalid credentials/ user not exist ");
                                // Handle accordingly, e.g., show an error message
                            }

                        },
                        error: function () {
                            alert("Invalid credentials");

                        }
                    })
                }
            },

            onAdminButton: async function () {
                if (!this.oAdminLogin) {
                    debugger
                    this.oAdminLogin = await this.loadFragment("AdminLogin")
                }
                this.oAdminLogin.open();
            },
            onUserLogin: async function () {
                if (!this.oUserLogin) {
                    this.oUserLogin = await this.loadFragment("UserLogin")
                }
                this.oUserLogin.open();
            },
            onClDialog: function () {
                this.oAdminLogin.close();

            },
            onUserCanClick: function () {
                this.oUserLogin.close();
            },
            //user Signup Page
            onRegBtnClick: async function () {
                if (!this.oUserSignUp) {

                    this.oUserSignUp = await this.loadFragment("UserSignUp")
                }
                this.oUserSignUp.open();
            },
            SignupCancelButton:function(){
                this.oUserSignUp.close();
            }


        });
    });
