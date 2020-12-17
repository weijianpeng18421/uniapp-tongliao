if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


      if( navigator.userAgent && (navigator.userAgent.indexOf('LyraVM') > 0 || navigator.userAgent.indexOf('AlipayIDE') > 0) ) {
        var AFAppX = self.AFAppX.getAppContext ? self.AFAppX.getAppContext().AFAppX : self.AFAppX;
      } else {
        importScripts('https://appx/af-appx.worker.min.js');
        var AFAppX = self.AFAppX;
      }
      self.getCurrentPages = AFAppX.getCurrentPages;
      self.getApp = AFAppX.getApp;
      self.Page = AFAppX.Page;
      self.App = AFAppX.App;
      self.my = AFAppX.bridge || AFAppX.abridge;
      self.abridge = self.my;
      self.Component = AFAppX.WorkerComponent || function(){};
      self.$global = AFAppX.$global;
      self.requirePlugin = AFAppX.requirePlugin;
    

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../colorui/components/cu-custom?hash=a11fdcdff8ea970c65f185a8731cafe48f67047c');
require('../../components/modal/signModal?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/modal/selectMod?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../pages/basics/home?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../pages/component/home?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../pages/plugin/home?hash=b7fb545f33a8a1e7af9ebc6492b7beb88760c6cd');
require('../../pages/electric/insidePatrolList?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/electric/inspectionIndex?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/electric/approvalMain?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/electric/timeline?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/common/error?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/electric/index?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/electric/inspection?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/electric/purchaseApproval?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/electric/enquiryApproval?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/electric/deliveryApproval?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/electric/constructionApproval?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/electric/inspectionStart?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/electric/inspectionHeader?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/electric/inspectionCheck?hash=0dd50ec3057b1569dd68c5dd2748a6ff4856d8fb');
require('../../pages/electric/inspectionScan?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/electric/inspectionScanDetail?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/electric/purchaseApproval?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/electric/workTicket?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/electric/workTicketEdit?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/electric/operationTicket?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/electric/operationTicketEdit?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/electric/overhaul?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/electric/overhaulQuery?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/electric/main?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/index/index?hash=a40f6226dd91c7d08d152315679f252551471cbe');
require('../../pages/basics/layout?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/basics/background?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/basics/text?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/basics/icon?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/basics/button?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/basics/design?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/basics/tag?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/basics/avatar?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/basics/progress?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/basics/shadow?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/basics/loading?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/component/bar?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/component/nav?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/component/list?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/component/card?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/component/form?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/component/timeline?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/component/chat?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/component/swiper?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/component/modal?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/component/steps?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/plugin/indexes?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/plugin/animation?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/plugin/drawer?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/plugin/verticalnav?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/basics/network?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/electric/index?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}