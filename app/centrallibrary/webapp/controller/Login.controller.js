sap.ui.define([
    "./BaseController",
    "sap/m/Token",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox",
    "sap/m/ColumnListItem",
    'sap/m/Input',
    "sap/ui/model/odata/v2/ODataModel"


],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Token, Filter, FilterOperator, JSONModel, Fragment, MessageBox, ColumnListItem, Input,oDataModel) {
        "use strict";

        return Controller.extend("com.app.centrallibrary.controller.Login", {
            
            onInit: function () {
                
                var oViewModel = new JSONModel({
                    busy: false,
                    delay: 0
                });

            
                
                // this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);
    
                // this.setModel(oViewModel, "detailView");
    
                // this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this));
            
    

                debugger;
                 
                //  tokens added(Multi-input)
                const oView = this.getView(),
                    oMulti1 = this.oView.byId("_IDGenMultiInput1"),
                    oMulti2 = this.oView.byId("_IDGenMultiInput2"),
                    oMulti3 = this.oView.byId("_IDGenMultiInput3");

                let validae = function (arg) {
                    if (true) {
                        var text = arg.text;
                        return new sap.m.Token({ key: text, text: text });
                    }
                }
                oMulti1.addValidator(validae);
                oMulti2.addValidator(validae);
                oMulti3.addValidator(validae);



                const oLocalModel = new JSONModel({
                    isbn: "",
                    title: "",
                    quantity: "",
                    price: "",
                    pages: "",
                    author: "",
                    status: "In Stock"

                });

                this.getView().setModel(oLocalModel, "localModel");


            },
            onGoPress: function () {
                debugger

                //  filter operator
                const oView = this.getView(),
                    oISBN = oView.byId("_IDGenMultiInput1"),
                    sISBN = oISBN.getTokens(),
                    oAuthor = oView.byId("_IDGenMultiInput2"),
                    sAuthor = oAuthor.getTokens(),
                    oStatus = oView.byId("_IDGenMultiInput3"),
                    sStatus = oStatus.getTokens(),
                    oTable = oView.byId("_IDGenTable1"),
                    aFilters = [];

                // passing the multitokens

                sISBN.filter((ele) => {
                    ele ? aFilters.push(new Filter("isbn", FilterOperator.EQ, ele.getKey())) : " ";
                })
                sAuthor.forEach(ele => {
                    if (ele) {
                        aFilters.push(new Filter("author", FilterOperator.EQ, ele.getKey()));
                    }
                });

                sStatus.filter((ele) => {
                    ele ? aFilters.push(new Filter("status", FilterOperator.EQ, ele.getKey())) : " ";
                })

                oTable.getBinding("items").filter(aFilters);

            },
            setHeaderContext: function () {
                var oView = this.getView();
                oView.byId("Bookstitle").setBindingContext(
                    oView.byId("_IDGenTable1").getBinding("items").getHeaderContext().refresh());
                this.getView().refresh();
            },
            onCreateBtnPress: async function () {
                debugger
                if (!this.oCreateBooksDialog) {

                    this.oCreateBooksDialog = await this.loadFragment("CreateBooks");

                }

                this.oCreateBooksDialog.open();
            },
            // closing popup
            onCloseDialog: function () {
                if (this.oCreateBooksDialog.isOpen()) {
                    this.oCreateBooksDialog.close()
                }
            },
            // clearing filter values
            onClearFilterPress: function () {
                const oView = this.getView(),
                    oISBN = oView.byId("_IDGenMultiInput1").destroyTokens(),
                    oAuthor = oView.byId("_IDGenMultiInput2").destroyTokens(),
                    oStatus = oView.byId("_IDGenMultiInput3").destroyTokens();
            },

            //  adding book details(using createDatamehtod)
            onCreateBook: async function () {
                const oPayload = this.getView().getModel("localModel").getProperty("/"),
                    oModel = this.getView().getModel("ModelV2");
                try {
                    await this.createData(oModel, oPayload, "/Books");
                    this.getView().byId("_IDGenTable1").getBinding("items").refresh();
                    this.oCreateBooksDialog.close();
                } catch (error) {
                    this.oCreateBooksDialog.close();
                    sap.m.MessageBox.error("Some technical Issue");
                }
                location.refresh()
            },



            onDeleteBtnPress: async function () {
                var aSelectedItems = this.byId("_IDGenTable1").getSelectedItems();
                if (aSelectedItems.length > 0) {
                    var aISBNs = [];
                    aSelectedItems.forEach(function (oSelectedItem) {
                        var sISBN = oSelectedItem.getBindingContext().getObject().isbn;
                        aISBNs.push(sISBN);
                        oSelectedItem.getBindingContext().delete("$auto");
                    });

                    Promise.all(aISBNs.map(function (sISBN) {
                        return new Promise(function (resolve, reject) {
                            resolve(sISBN + " Successfully Deleted");
                        });
                    })).then(function (aMessages) {
                        aMessages.forEach(function (sMessage) {
                            MessageToast.show(sMessage);
                        });
                    }).catch(function (oError) {
                        MessageToast.show("Deletion Error: " + oError);
                    });

                    this.getView().byId("_IDGenTable1").removeSelections(true);
                    this.getView().byId("_IDGenTable1").getBinding("items").refresh();
                } else {
                    MessageToast.show("Please Select Rows to Delete");
                };
                location.refresh()
            },
            // for Editing the Book
            
            onEditBtnPress: async function () {
                var oSelected = this.byId("_IDGenTable1").getSelectedItem();
            
                if (oSelected) {
                    var oID = oSelected.getBindingContext().getProperty("ID");
                    var oAuthorName = oSelected.getBindingContext().getProperty("author");
                    var oBookname = oSelected.getBindingContext().getProperty("title");
                    var oStock = oSelected.getBindingContext().getProperty("quantity");
                    var oISBN = oSelected.getBindingContext().getProperty("isbn");
                    var oPrice = oSelected.getBindingContext().getProperty("price");
                    var oPage = oSelected.getBindingContext().getProperty("pages");
                    var oStatus = oSelected.getBindingContext().getProperty("status");
            
                    var newBookModel = new sap.ui.model.json.JSONModel({
                        ID:oID,
                        author: oAuthorName,
                        title: oBookname,
                        quantity: oStock,
                        isbn: oISBN,
                        price: oPrice,
                        pages: oPage,
                        status: oStatus
                    });
            
                    this.getView().setModel(newBookModel, "newBookModel");
            
                    if (!this.oEditBooksDialog) {
                        this.oEditBooksDialog = await this.loadFragment("EditBook"); // Load your fragment asynchronously
                    }
            
                    this.oEditBooksDialog.open();
                }
            },
            
            onSave: function() {
                var oPayload = this.getView().getModel("newBookModel").getData();
                var oDataModel = this.getOwnerComponent().getModel("ModelV2");// Assuming this is your OData V2 model
                console.log(oDataModel.getMetadata().getName());

                try {
                    // Assuming your update method is provided by your OData V2 model
                    oDataModel.update("/Books(" + oPayload.ID + ")", oPayload, {
                        success: function() {
                            this.getView().byId("_IDGenTable1").getBinding("items").refresh();
                            this.oEditBooksDialog.close();
                        }.bind(this),
                        error: function(oError) {
                            this.oEditBooksDialog.close();
                            sap.m.MessageBox.error("Failed to update book: " + oError.message);
                        }.bind(this)
                    });
                } catch (error) {
                    this.oEditBooksDialog.close();
                    sap.m.MessageBox.error("Some technical Issue");
                }
            
            
                var oDataModel = new sap.ui.model.odata.v2.ODataModel({
                    serviceUrl: "https://port4004-workspaces-ws-ljsm6.us10.trial.applicationstudio.cloud.sap/v2/BookSRV",
                    defaultBindingMode: sap.ui.model.BindingMode.TwoWay,
                    // Configure message parser
                    messageParser: sap.ui.model.odata.ODataMessageParser
                })  
        },
        

            onClose: function() {
                if (this.oEditBooksDialog.isOpen()) {
                    this.oEditBooksDialog.close();
                }
            },
            

            ActiveLoans: function () {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("routeUserLoans")
            },
            Issue:function()
            {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("routeIssuedBooks")
               },

               // reserved loan navigation
               Reserved:function(){
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("routeReservedBooks")
               },
               onISB:async function(){
                if (!this.oIssueBooksDialog) {
                    this.oIssueBooksDialog = await this.loadFragment("Issue"); // Load your fragment asynchronously
                }
        
                this.oIssueBooksDialog.open();
               },
               onIssueClose:function(){
                if (this.oIssueBooksDialog.isOpen()) {
                    this.oIssueBooksDialog.close();
                }

               },
               onIssueSave:function(){

                var oIssueBook = new sap.ui.model.json.JSONModel({

                    
                })



               }
        });
    });
