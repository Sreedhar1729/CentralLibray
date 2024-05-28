sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("com.app.centrallibrary.controller.Details", {
        onInit: function() {
          const oRouter = this.getOwnerComponent().getRouter();
                oRouter.attachRoutePatternMatched(this.onUserDetailsLoad, this);
            },
            onUserDetailsLoad: function(oEvent ){
                const {id} = oEvent.getParameter("arguments");
                this.id = id;
                const sRouterName = oEvent.getParameter("name");
                const oObjectPage = this.getView().byId("ObjectPageLayout");
   
                oObjectPage.bindElement(`/Users(${id})`);
            
        }
      });
    }
  );
  