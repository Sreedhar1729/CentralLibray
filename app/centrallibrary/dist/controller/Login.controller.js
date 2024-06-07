sap.ui.define(["./BaseController","sap/m/Token","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/model/json/JSONModel","sap/ui/core/Fragment","sap/m/MessageBox","sap/m/ColumnListItem","sap/m/Input","sap/ui/model/odata/v2/ODataModel","sap/ui/core/routing/History"],function(e,t,o,s,i,n,a,r,l,g,d){"use strict";return e.extend("com.app.centrallibrary.controller.Login",{onInit:function(){const e=this.getOwnerComponent().getRouter();e.getRoute("routeLogin").attachPatternMatched(this.onObjectMatched,this);var t=new i({busy:false,delay:0});debugger;const o=this.getView(),s=this.oView.byId("_IDGenMultiInput1"),n=this.oView.byId("_IDGenMultiInput2"),a=this.oView.byId("_IDGenMultiInput3");let r=function(e){if(true){var t=e.text;return new sap.m.Token({key:t,text:t})}};s.addValidator(r);n.addValidator(r);a.addValidator(r);const l=new i({isbn:"",title:"",quantity:"",avl_stock:"",price:"",pages:"",author:"",status:"In Stock"});this.getView().setModel(l,"localModel")},onGoPress:function(){debugger;const e=this.getView(),t=e.byId("_IDGenMultiInput1"),i=t.getTokens(),n=e.byId("_IDGenMultiInput2"),a=n.getTokens(),r=e.byId("_IDGenMultiInput3"),l=r.getTokens(),g=e.byId("_IDGenTable1"),d=[];i.filter(e=>{e?d.push(new o("isbn",s.EQ,e.getKey())):" "});a.forEach(e=>{if(e){d.push(new o("author",s.EQ,e.getKey()))}});l.filter(e=>{e?d.push(new o("status",s.EQ,e.getKey())):" "});g.getBinding("items").filter(d)},setHeaderContext:function(){var e=this.getView();e.byId("Bookstitle").setBindingContext(e.byId("_IDGenTable1").getBinding("items").getHeaderContext().refresh());this.getView().refresh()},onCreateBtnPress:async function(){debugger;if(!this.oCreateBooksDialog){this.oCreateBooksDialog=await this.loadFragment("CreateBooks")}this.oCreateBooksDialog.open()},onCloseDialog:function(){if(this.oCreateBooksDialog.isOpen()){this.oCreateBooksDialog.close()}},onClearFilterPress:function(){const e=this.getView(),t=e.byId("_IDGenMultiInput1").destroyTokens(),o=e.byId("_IDGenMultiInput2").destroyTokens(),s=e.byId("_IDGenMultiInput3").destroyTokens()},onCreateBook:async function(){const e=this.getView().getModel("localModel").getProperty("/"),t=this.getView().getModel("ModelV2");try{await this.createData(t,e,"/Books");this.getView().byId("_IDGenTable1").getBinding("items").refresh();this.oCreateBooksDialog.close()}catch(e){this.oCreateBooksDialog.close();sap.m.MessageBox.error("Some technical Issue")}location.refresh()},onDeleteBtnPress:async function(){var e=this.byId("_IDGenTable1").getSelectedItems();if(e.length>0){var t=[];e.forEach(function(e){var o=e.getBindingContext().getObject().isbn;t.push(o);e.getBindingContext().delete("$auto")});Promise.all(t.map(function(e){return new Promise(function(t,o){t(e+" Successfully Deleted")})})).then(function(e){e.forEach(function(e){MessageToast.show(e)})}).catch(function(e){MessageToast.show("Deletion Error: "+e)});this.getView().byId("_IDGenTable1").removeSelections(true);this.getView().byId("_IDGenTable1").getBinding("items").refresh()}else{MessageToast.show("Please Select Rows to Delete")}location.refresh()},onEditBtnPress:async function(){var e=this.byId("_IDGenTable1").getSelectedItem();if(e){var t=e.getBindingContext().getProperty("ID");var o=e.getBindingContext().getProperty("author");var s=e.getBindingContext().getProperty("title");this.oStock=e.getBindingContext().getProperty("quantity");var i=e.getBindingContext().getProperty("isbn");var n=e.getBindingContext().getProperty("price");var a=e.getBindingContext().getProperty("pages");var r=e.getBindingContext().getProperty("status");this.oavl_quan=e.getBindingContext().getProperty("avl_stock");if(this.oavl_quan==undefined){this.oavl_quan=this.oStock}var l=new sap.ui.model.json.JSONModel({ID:t,author:o,title:s,quantity:this.oStock,isbn:i,price:n,pages:a,status:r,avl_stock:this.oavl_quan});this.getView().setModel(l,"newBookModel");if(!this.oEditBooksDialog){this.oEditBooksDialog=await this.loadFragment("EditBook")}this.oEditBooksDialog.open()}},onSave:function(){console.log(this.oStock);console.log(this.oavl_quan);var e=this.getView().getModel("newBookModel").getData();e.quantity;if(e.quantity>this.oStock){var t=e.quantity-this.oStock;e.avl_stock=this.oavl_quan+t}else e.quantity<this.oStock;{var o=this.oStock-e.quantity;e.avl_stock=this.oavl_quan-o}var s=this.getOwnerComponent().getModel("ModelV2");console.log(s.getMetadata().getName());try{s.update("/Books("+e.ID+")",e,{success:function(){this.getView().byId("_IDGenTable1").getBinding("items").refresh();this.oEditBooksDialog.close()}.bind(this),error:function(e){this.oEditBooksDialog.close();sap.m.MessageBox.error("Failed to update book: "+e.message)}.bind(this)})}catch(e){this.oEditBooksDialog.close();sap.m.MessageBox.error("Some technical Issue")}var s=new sap.ui.model.odata.v2.ODataModel({serviceUrl:"https://port4004-workspaces-ws-ljsm6.us10.trial.applicationstudio.cloud.sap/v2/BookSRV",defaultBindingMode:sap.ui.model.BindingMode.TwoWay,messageParser:sap.ui.model.odata.ODataMessageParser})},onClose:function(){if(this.oEditBooksDialog.isOpen()){this.oEditBooksDialog.close()}},ActiveLoans:function(){const e=this.getOwnerComponent().getRouter();e.navTo("routeUserLoans")},Issue:function(){const e=this.getOwnerComponent().getRouter();e.navTo("routeIssuedBooks")},Reserved:function(){const e=this.getOwnerComponent().getRouter();e.navTo("routeReservedBooks")},onISB:async function(e){var t=this.byId("_IDGenTable1").getSelectedItem();var o=t.getBindingContext().getProperty("avl_stock");if(o==0){sap.m.MessageBox.success("Availability stock is ZERO!!")}else{if(t){var s=t.getBindingContext().getProperty("ID")}var i=this.byId("_IDGenTable1").getSelectedItem().getBindingContext().getObject();console.log(i);var n=e.getSource().getParent();var a=n.getBindingContext();if(typeof i.avl_stock==="number"){i.avl_stock=Math.max(0,i.avl_stock-1);delete i["@$ui5.context.isSelected"];var r=this.getView().getModel("ModelV2");try{await r.update("/Books("+i.ID+")",i);this.byId("_IDGenTable1").getBinding("items").refresh();console.log();console.log("success")}catch(e){console.error("Error updating book avl_stock:",e)}}var l=new Date;var g=l.getFullYear();var d=String(l.getMonth()+1).padStart(2,"0");var c=String(l.getDate()).padStart(2,"0");var u=g+"-"+d+"-"+c;l.setDate(l.getDate()+20);var h=l.getFullYear();var p=String(l.getMonth()+1).padStart(2,"0");var I=String(l.getDate()).padStart(2,"0");var v=h+"-"+p+"-"+I;var B=new sap.ui.model.json.JSONModel({users_ID:" ",books_ID:s,duedate:v,loandate:u,Active:true});this.getView().setModel(B,"newLoanModel");if(!this.oIssueBooksDialog){this.oIssueBooksDialog=await this.loadFragment("Issue")}this.oIssueBooksDialog.open()}},onIssueClose:function(){if(this.oIssueBooksDialog.isOpen()){this.oIssueBooksDialog.close()}},onIssueSave:async function(){const e=this.getView().getModel("newLoanModel").getProperty("/");const t=this.getView().getModel("ModelV2");try{await this.createData(t,e,"/BooksLoan");var o=this.getView().byId("idUserLoans");console.log("Dialog:",this.oIssueBooksDialog);this.oIssueBooksDialog.close();sap.m.MessageBox.success("Book Issued Successfully")}catch(e){console.error("Error occurred while saving:",e);sap.m.MessageBox.error("Failed to save the data. Please try again later.");console.log("Dialog:",this.oIssueBooksDialog);this.oIssueBooksDialog.close()}},adLog:async function(){const e=d.getInstance();const t=e.getPreviousHash();if(t!==undefined){window.history.go(-1)}else{const e=this.getOwnerComponent().getRouter();e.navTo("RouteView1",{},true)}}})});