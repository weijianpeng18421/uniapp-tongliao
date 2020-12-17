
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/electric/insidePatrolList","pages/electric/inspectionIndex","pages/electric/approvalMain","pages/electric/timeline","pages/common/error","pages/electric/index","pages/electric/inspection","pages/electric/approvalApply","pages/electric/approvalOrder","pages/electric/approvalStock","pages/electric/approvalConstruction","pages/electric/inspectionStart","pages/electric/inspectionHeader","pages/electric/inspectionCheck","pages/electric/inspectionScan","pages/electric/inspectionScanDetail","pages/electric/workTicket","pages/electric/workTicketEdit","pages/electric/operationTicket","pages/electric/operationTicketEdit","pages/electric/overhaul","pages/electric/overhaulQuery","pages/electric/main","pages/index/index","pages/basics/layout","pages/basics/background","pages/basics/text","pages/basics/icon","pages/basics/button","pages/basics/design","pages/basics/tag","pages/basics/avatar","pages/basics/progress","pages/basics/shadow","pages/basics/loading","pages/component/bar","pages/component/nav","pages/component/list","pages/component/card","pages/component/form","pages/component/timeline","pages/component/chat","pages/component/swiper","pages/component/modal","pages/component/steps","pages/plugin/indexes","pages/plugin/animation","pages/plugin/drawer","pages/plugin/verticalnav","pages/basics/network","pages/electric/index","pages/electric/insidePatrolHeader","pages/electric/insidePatrolCheck","pages/electric/chartDefects","pages/electric/chartAnalysis","pages/electric/chartSpecial","pages/electric/chartProject","pages/electric/inspectionMain"],"window":{"navigationBarBackgroundColor":"#0081ff","navigationBarTitleText":"ColorUi for UniApp","navigationStyle":"custom","navigationBarTextStyle":"white"},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"蒙东巡检","compilerVersion":"2.9.8","entryPagePath":"pages/electric/insidePatrolList","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/electric/insidePatrolList","meta":{"isQuit":true},"window":{}},{"path":"/pages/electric/inspectionIndex","meta":{},"window":{}},{"path":"/pages/electric/approvalMain","meta":{},"window":{}},{"path":"/pages/electric/timeline","meta":{},"window":{}},{"path":"/pages/common/error","meta":{},"window":{}},{"path":"/pages/electric/index","meta":{},"window":{}},{"path":"/pages/electric/inspection","meta":{},"window":{}},{"path":"/pages/electric/approvalApply","meta":{},"window":{}},{"path":"/pages/electric/approvalOrder","meta":{},"window":{}},{"path":"/pages/electric/approvalStock","meta":{},"window":{}},{"path":"/pages/electric/approvalConstruction","meta":{},"window":{}},{"path":"/pages/electric/inspectionStart","meta":{},"window":{}},{"path":"/pages/electric/inspectionHeader","meta":{},"window":{}},{"path":"/pages/electric/inspectionCheck","meta":{},"window":{}},{"path":"/pages/electric/inspectionScan","meta":{},"window":{}},{"path":"/pages/electric/inspectionScanDetail","meta":{},"window":{}},{"path":"/pages/electric/workTicket","meta":{},"window":{}},{"path":"/pages/electric/workTicketEdit","meta":{},"window":{}},{"path":"/pages/electric/operationTicket","meta":{},"window":{}},{"path":"/pages/electric/operationTicketEdit","meta":{},"window":{}},{"path":"/pages/electric/overhaul","meta":{},"window":{}},{"path":"/pages/electric/overhaulQuery","meta":{},"window":{}},{"path":"/pages/electric/main","meta":{},"window":{}},{"path":"/pages/index/index","meta":{},"window":{}},{"path":"/pages/basics/layout","meta":{},"window":{}},{"path":"/pages/basics/background","meta":{},"window":{}},{"path":"/pages/basics/text","meta":{},"window":{}},{"path":"/pages/basics/icon","meta":{},"window":{}},{"path":"/pages/basics/button","meta":{},"window":{}},{"path":"/pages/basics/design","meta":{},"window":{}},{"path":"/pages/basics/tag","meta":{},"window":{}},{"path":"/pages/basics/avatar","meta":{},"window":{}},{"path":"/pages/basics/progress","meta":{},"window":{}},{"path":"/pages/basics/shadow","meta":{},"window":{}},{"path":"/pages/basics/loading","meta":{},"window":{}},{"path":"/pages/component/bar","meta":{},"window":{}},{"path":"/pages/component/nav","meta":{},"window":{}},{"path":"/pages/component/list","meta":{},"window":{}},{"path":"/pages/component/card","meta":{},"window":{}},{"path":"/pages/component/form","meta":{},"window":{}},{"path":"/pages/component/timeline","meta":{},"window":{}},{"path":"/pages/component/chat","meta":{},"window":{}},{"path":"/pages/component/swiper","meta":{},"window":{}},{"path":"/pages/component/modal","meta":{},"window":{}},{"path":"/pages/component/steps","meta":{},"window":{}},{"path":"/pages/plugin/indexes","meta":{},"window":{}},{"path":"/pages/plugin/animation","meta":{},"window":{}},{"path":"/pages/plugin/drawer","meta":{},"window":{}},{"path":"/pages/plugin/verticalnav","meta":{},"window":{}},{"path":"/pages/basics/network","meta":{},"window":{}},{"path":"/pages/electric/insidePatrolHeader","meta":{},"window":{}},{"path":"/pages/electric/insidePatrolCheck","meta":{},"window":{}},{"path":"/pages/electric/chartDefects","meta":{},"window":{}},{"path":"/pages/electric/chartAnalysis","meta":{},"window":{}},{"path":"/pages/electric/chartSpecial","meta":{},"window":{}},{"path":"/pages/electric/chartProject","meta":{},"window":{}},{"path":"/pages/electric/inspectionMain","meta":{},"window":{"backgroundColor":"#ddd"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});