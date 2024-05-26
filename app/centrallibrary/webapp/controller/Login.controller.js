sap.ui.define([
    "./BaseController",
    "sap/m/Token",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox",
    "sap/m/ColumnListItem",
    'sap/m/Input'
    

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Token, Filter, FilterOperator, JSONModel, Fragment, MessageBox,ColumnListItem,Input) {
        "use strict";

        return Controller.extend("com.app.centrallibrary.controller.Login", {
            onInit: function () {
                
                debugger;
                // this.oTable = this.byId("_IDGenTable1");
                // this.oReadOnlyTemplate = this.byId("_IDGenTable1").removeItem(0);
                // // this.rebindTable(this.oReadOnlyTemplate, "Navigation");
                // this.oEditableTemplate = new ColumnListItem({
                //     cells: [
                //         new Input({
                //             value: "{isbn}"
                //         }), new Input({
                //             value: "{title}"
                        
                //         }), new Input({
                //             value: "{price}",
                            
                //         }), new Input({
                //             value: "{author}",
                            
                //         })
                //     ]
                // });


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
                    isbn:"",
                    title:"",
                    quantity:"",
                    price:"",
                    pages:"",
                    author:"",
                    status:""

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
                    oView.byId("_IDGenTable1").getBinding("items").getHeaderContext()).refresh();
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
                    await this.createData(oModel,oPayload,"/Books");
                    this.getView().byId("_IDGenTable1").getBinding("items").refresh();
                    this.oCreateBooksDialog.close();
                } catch (error) {
                    this.oCreateBooksDialog.close();
                    sap.m.MessageBox.error("Some technical Issue");
                }
                location.reload()
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
location.reload()
},
           
            onEditBtnPress: async function(){
                        },

                        ActiveLoans:function(){
                            const oRouter = this.getOwnerComponent().getRouter();
                            oRouter.navTo("routeUserLoans")
                        }
        });
    });

 