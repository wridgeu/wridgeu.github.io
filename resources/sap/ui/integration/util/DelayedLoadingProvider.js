/* !
 * ${ copyright }
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/base/ManagedObject","sap/ui/integration/util/LoadingProvider"],function(e,a,i){"use strict";var t=i.extend("sap.ui.integration.util.DelayedLoadingProvider",{metadata:{library:"sap.ui.integration",properties:{delayed:{type:"boolean",defaultValue:false}}}});t.prototype.destroy=function(){if(this._iLoadingDelayHandler){clearTimeout(this._iLoadingDelayHandler);this._iLoadingDelayHandler=null}a.prototype.destroy.apply(this,arguments)};t.prototype.applyDelay=function(e){if(!e){return}this.setDelayed(true);this._iLoadingDelayHandler=setTimeout(()=>{this.setDelayed(false)},e)};return t});
//# sourceMappingURL=DelayedLoadingProvider.js.map