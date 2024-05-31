sap.ui.define([
    "./BaseController",
    // "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment, Filter, FilterOperator, ODataModel,JSONModel) {
        "use strict";

        return Controller.extend("com.app.centrallibrary.controller.View1", {
            onInit: function () {
                debugger;

                // // recently added ODATA model
                
                // var oModel = oView.getModel("/BookSRV/UserCredentials"); // Assuming the model is already set on the view
                var oModel = new ODataModel("/v2/BookSRV/");
                this.getView().setModel(oModel);
                 const oLocalModelU = new JSONModel({
                     
                    UserName: " ",
                    Password: " ",
                    mobile: " ",
                    email : " "

                     });
                     this.getView().setModel(oLocalModelU, "localModelU");

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
                            

                            // iterate each record

                            var bValidCredentials = aRecords.some(function (oRecord) {
                                return oRecord.UserName === oUser1 && oRecord.Password === oPswd;
                            });
                            // var oUserName = oData.results[0].ID;

                            if (bValidCredentials) {
                                // Valid credentials
                                const oRouter = await this.getOwnerComponent().getRouter();
                                var oUserName = oData.results[0].ID;
                                oRouter.navTo("routeUserLogin", { ID: oUserName })
                            } 
                            else {
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
            UserSignUpBtnClick: async function () {
                const oPayload = this.getView().getModel("localModelU").getProperty("/"),
                    oModel = this.getView().getModel("ModelV2");
            
                try {
                    const oResponse = await this.createData(oModel, oPayload, "/Users");
                    console.log("Response from createData:", oResponse)
                    const sNewUserId = oResponse.ID; // Assuming ID is returned in the response
            
                    // Now you can use the new user ID as needed
            
                    this.oUserSignUp.close();
                } catch (error) {
                    this.oUserSignUp.close();
                    sap.m.MessageBox.error("Some technical Issue");
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
            //user Signup Page Open
            onRegBtnClick: async function () {
                if (!this.oUserSignUp) {

                    this.oUserSignUp = await this.loadFragment("UserSignUp")
                }
                this.oUserSignUp.open();
            },
            //user Signup Page Close
            SignupCancelButton:function(){
                this.oUserSignUp.close();
            }


        });
    });
