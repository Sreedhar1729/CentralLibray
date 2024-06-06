sap.ui.define(["./BaseController","sap/ui/core/Fragment","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/model/odata/v2/ODataModel","sap/ui/model/json/JSONModel"],function(e,s,t,o,i,n){"use strict";return e.extend("com.app.centrallibrary.controller.View1",{onInit:function(){debugger;var e=new i("/v2/BookSRV/");this.getView().setModel(e);const s=new n({UserName:" ",Password:" ",mobile:" ",email:" "});this.getView().setModel(s,"localModelU")},onBtnClick:function(){debugger;var e=this.getView().byId("user").getValue();var s=this.getView().byId("pwd").getValue();if(e==="admin"&&s==="admin@123"){debugger;const e=this.getOwnerComponent().getRouter();e.navTo("routeLogin");sap.m.MessageBox.success("Login Successful")}else{alert("Re-Enter your Detail")}},onUserBtnClick:function(){debugger;var e=this.getView().byId("idUserInput").getValue(),s=this.getView().byId("idPasswordInput").getValue();var n=new i("/v2/BookSRV/");this.getView().setModel(n);if(e&&s){n.read("/Users",{filters:[new t("UserName",o.EQ,e),new t("Password",o.EQ,s)],success:async t=>{var o=t.results;var i=o.some(function(t){return t.UserName===e&&t.Password===s});if(i){const e=await this.getOwnerComponent().getRouter();var n=t.results[0].ID;e.navTo("routeUserLogin",{ID:n});sap.m.MessageBox.success("Login Successful")}else{alert("Invalid credentials/ user not exist ")}},error:function(){alert("Invalid credentials")}})}},UserSignUpBtnClick:async function(){const e=this.getView().getModel("localModelU").getProperty("/"),s=this.getView().getModel("ModelV2");try{const t=await this.createData(s,e,"/Users");console.log("Response from createData:",t);const o=t.ID;this.oUserSignUp.close();sap.m.MessageBox.success("created Successfully")}catch(e){this.oUserSignUp.close();sap.m.MessageBox.error("Some technical Issue")}},onAdminButton:async function(){if(!this.oAdminLogin){debugger;this.oAdminLogin=await this.loadFragment("AdminLogin")}this.oAdminLogin.open()},onUserLogin:async function(){if(!this.oUserLogin){this.oUserLogin=await this.loadFragment("UserLogin")}this.oUserLogin.open()},onClDialog:function(){this.oAdminLogin.close()},onUserCanClick:function(){this.oUserLogin.close()},onRegBtnClick:async function(){if(!this.oUserSignUp){this.oUserSignUp=await this.loadFragment("UserSignUp")}this.oUserSignUp.open()},SignupCancelButton:function(){this.oUserSignUp.close()}})});