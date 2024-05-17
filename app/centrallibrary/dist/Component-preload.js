//@ui5-bundle com/app/centrallibrary/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"com/app/centrallibrary/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","com/app/centrallibrary/model/models"],function(e,t,i){"use strict";return e.extend("com.app.centrallibrary.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(i.createDeviceModel(),"device")}})});
},
	"com/app/centrallibrary/controller/App.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(n){"use strict";return n.extend("com.app.centrallibrary.controller.App",{onInit:function(){}})});
},
	"com/app/centrallibrary/controller/View1.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(n){"use strict";return n.extend("com.app.centrallibrary.controller.View1",{onInit:function(){}})});
},
	"com/app/centrallibrary/i18n/i18n.properties":'# This is the resource bundle for com.app.centrallibrary\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=CentralLibray\n\n#YDES: Application description\nappDescription=An SAP Fiori application.\n#XTIT: Main view title\ntitle=CentralLibray\n\n#XFLD,42\nflpTitle=CentralLibrary\n\n#XFLD,42\nflpSubtitle=CentralLibrary\n',
	"com/app/centrallibrary/manifest.json":'{"_version":"1.59.0","sap.app":{"id":"com.app.centrallibrary","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:basic","version":"1.13.4","toolsId":"1aae3ea6-379e-43fa-adea-58609f756f5d"},"dataSources":{"mainService":{"uri":"odata/v4/app-library/","type":"OData","settings":{"annotations":[],"odataVersion":"4.0"}}},"crossNavigation":{"inbounds":{"CentralLibraryProject-Display":{"semanticObject":"CentralLibraryProject","action":"Display","title":"{{flpTitle}}","subTitle":"{{flpSubtitle}}","signature":{"parameters":{},"additionalParameters":"allowed"}}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.124.0","libs":{"sap.m":{},"sap.ui.core":{},"sap.f":{},"sap.suite.ui.generic.template":{},"sap.ui.comp":{},"sap.ui.generic.app":{},"sap.ui.table":{},"sap.ushell":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"com.app.centrallibrary.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"synchronizationMode":"None","operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","async":true,"viewPath":"com.app.centrallibrary.view","controlAggregation":"pages","controlId":"app","clearControlAggregation":false},"routes":[{"name":"RouteView1","pattern":":?query:","target":["TargetView1"]}],"targets":{"TargetView1":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"View1","viewName":"View1"}}},"rootView":{"viewName":"com.app.centrallibrary.view.App","type":"XML","async":true,"id":"App"}}}',
	"com/app/centrallibrary/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"com/app/centrallibrary/view/App.view.xml":'<mvc:View controllerName="com.app.centrallibrary.controller.App"\n    xmlns:html="http://www.w3.org/1999/xhtml"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns="sap.m"><App id="app"></App></mvc:View>\n',
	"com/app/centrallibrary/view/View1.view.xml":'<mvc:View controllerName="com.app.centrallibrary.controller.View1"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns="sap.m"><Button text="click me!"></Button></mvc:View>\n'
}});
