/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/ui/core/Control","sap/ui/core/Core","sap/ui/core/delegate/ScrollEnablement","./WizardProgressNavigator","sap/ui/core/util/ResponsivePaddingsEnablement","sap/ui/Device","./WizardRenderer","sap/ui/core/CustomData","sap/ui/dom/containsOrEquals","sap/base/Log","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/Focusable"],function(t,e,r,i,n,s,o,a,p,u,h,g){"use strict";var l=t.PageBackgroundDesign;var c=t.WizardRenderMode;var S=e.extend("sap.m.Wizard",{metadata:{library:"sap.m",designtime:"sap/m/designtime/Wizard.designtime",interfaces:["sap.f.IDynamicPageStickyContent"],properties:{width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"auto"},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"100%"},showNextButton:{type:"boolean",group:"Behavior",defaultValue:true},finishButtonText:{type:"string",group:"Appearance",defaultValue:"Review"},enableBranching:{type:"boolean",group:"Behavior",defaultValue:false},backgroundDesign:{type:"sap.m.PageBackgroundDesign",group:"Appearance",defaultValue:l.Standard},renderMode:{type:"sap.m.WizardRenderMode",group:"Appearance",defaultValue:c.Scroll}},defaultAggregation:"steps",aggregations:{steps:{type:"sap.m.WizardStep",multiple:true,singularName:"step"},_progressNavigator:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_nextButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},associations:{
/**
					 * This association controls the current activated step of the wizard (meaning the last step)
					 * For example if we have A->B->C->D steps, we are on step A and we setCurrentStep(C) A,B and C are going to be activated. D will still remain unvisited.
					 * The parameter needs to be a Wizard step that is part of the current Wizard
					 * @since 1.50
					 */
currentStep:{type:"sap.m.WizardStep",multiple:false}},events:{stepActivate:{parameters:{index:{type:"int"}}},complete:{parameters:{}}},dnd:{draggable:false,droppable:true}}});S.CONSTANTS={MINIMUM_STEPS:3,MAXIMUM_STEPS:8,ANIMATION_TIME:300,SCROLL_OFFSET:16};s.call(S.prototype,{header:{suffix:"progressNavigator"},content:{suffix:"step-container"}});S.prototype.init=function(){this._iStepCount=0;this._aStepPath=[];this._bScrollLocked=false;this._oScroller=this._initScrollEnablement();this._oResourceBundle=r.getLibraryResourceBundle("sap.m");this._initProgressNavigator();this._initResponsivePaddingsEnablement()};S.prototype.onBeforeRendering=function(){var t=this._getStartingStep();if(!this._isMinStepCountReached()||this._isMaxStepCountExceeded()){h.error("The Wizard is supposed to handle from 3 to 8 steps.")}this._saveInitialValidatedState();if(t&&this._aStepPath.indexOf(t)<0){this._activateStep(t);t._setNumberInvisibleText(1)}};S.prototype.onAfterRendering=function(){if(!this.getCurrentStep()){this.setAssociation("currentStep",this._getStartingStep(),true)}var t=this._getCurrentStepInstance();if(t){this._activateAllPreceedingSteps(t)}this._attachScrollHandler();this._renderPageMode()};S.prototype._renderPageMode=function(t){var e,i,n;if(this.getRenderMode()!==c.Page){return}if(t){e=this._aStepPath.indexOf(t)+1;i=t}else{e=this._getProgressNavigator().getCurrentStep();i=this._aStepPath[e-1]}n=r.createRenderManager();n.renderControl(this._updateStepTitleNumber(i,e));n.flush(this.getDomRef("step-container"));n.destroy()};S.prototype._updateStepTitleNumber=function(t,e){var r=t.getCustomData().filter(function(t){return t.getKey()==="stepIndex"})[0];if(r){r.setValue(e)}else{t.addCustomData(new p({key:"stepIndex",value:e}))}return t};S.prototype.exit=function(){var t=this.getDomRef("step-container");if(t){t.onscroll=null}this._oScroller.destroy();this._oScroller=null;this._aStepPath=null;this._iStepCount=null;this._bScrollLocked=null;this._oResourceBundle=null};S.prototype.validateStep=function(t){if(!this._containsStep(t)){h.error("The wizard does not contain this step");return this}t.setValidated(true);return this};S.prototype.invalidateStep=function(t){if(!this._containsStep(t)){h.error("The wizard does not contain this step");return this}t.setValidated(false);return this};S.prototype.nextStep=function(){var t=this._getProgressNavigator().getProgress()-1;var e=this._aStepPath[t];this.validateStep(e);e._complete();return this};S.prototype.previousStep=function(){var t=this._getProgressNavigator().getProgress()-2;if(t>=0){this.discardProgress(this._aStepPath[t])}return this};S.prototype.getProgress=function(){return this._getProgressNavigator().getProgress()};S.prototype.getProgressStep=function(){return this._aStepPath[this.getProgress()-1]};S.prototype.goToStep=function(t,e){var r=function(){var e=this._getProgressNavigator();e&&e._updateCurrentStep(this._aStepPath.indexOf(t)+1)};if(!this.getVisible()||this._aStepPath.indexOf(t)<0){return this}else if(this.getRenderMode()===c.Page){r.call(this);this._renderPageMode(t);return this}t._setNumberInvisibleText(this.getProgress());var i=this,n={scrollTop:this._getStepScrollOffset(t)},s={queue:false,duration:S.CONSTANTS.ANIMATION_TIME,start:function(){i._bScrollLocked=true},complete:function(){i._bScrollLocked=false;r.call(i);if(e||e===undefined){i._focusFirstStepElement(t)}}};g(this.getDomRef("step-container")).animate(n,s);return this};S.prototype.discardProgress=function(t,e){var r=this.getProgress(),i=this._aStepPath,n=this._aStepPath.indexOf(t),s=this._aStepPath[n],o=n+1;if(o>r||o<=0){h.warning("The given step is either not yet reached, or is not present in the wizard control.");return this}this._getProgressNavigator().discardProgress(o,true);this._updateProgressNavigator();this._restoreInitialValidatedState(o);for(var a=o;a<i.length;a++){i[a]._deactivate();if(i[a].getSubsequentSteps().length>1){i[a].setNextStep(null)}}this.setAssociation("currentStep",t);s.setWizardContext({sButtonText:this._getNextButtonText(),bLast:true});if(t.getSubsequentSteps().length>1&&!e){t.setNextStep(null)}i.splice(o);return this};S.prototype.setCurrentStep=function(t){var e=typeof t==="string"?r.byId(t):t;if(!this.getEnableBranching()){this.setAssociation("currentStep",t,true)}if(e&&this._isStepReachable(e)){this._activateAllPreceedingSteps(e)}else{h.error("The given step could not be set as current step.")}return this};S.prototype.setShowNextButton=function(t){this.setProperty("showNextButton",t,true);this.getSteps().forEach(function(e){e.setWizardContext({bParentAllowsButtonShow:t})});return this};S.prototype.getFinishButtonText=function(){if(this.getProperty("finishButtonText")==="Review"){return this._oResourceBundle.getText("WIZARD_FINISH")}else{return this.getProperty("finishButtonText")}};S.prototype.addStep=function(t){if(this._isMaxStepCountExceeded()){h.error("The Wizard is supposed to handle up to 8 steps.");return this}t.setWizardContext({bParentAllowsButtonShow:this.getShowNextButton()});this._incrementStepCount();return this.addAggregation("steps",t)};S.prototype.setBackgroundDesign=function(t){var e=this.getBackgroundDesign();this.setProperty("backgroundDesign",t,true);this.$().removeClass("sapMWizardBg"+e).addClass("sapMWizardBg"+this.getBackgroundDesign());return this};S.prototype.insertStep=function(t,e){throw new Error("Dynamic step insertion is not yet supported.")};S.prototype.removeStep=function(t){throw new Error("Dynamic step removal is not yet supported.")};S.prototype.removeAllSteps=function(){this._resetStepCount();return this.removeAllAggregation("steps").map(function(t){return t},this)};S.prototype.destroySteps=function(){this._resetStepCount();return this.destroyAggregation("steps")};S.prototype._getStickyContent=function(){return this._getProgressNavigator()};S.prototype._returnStickyContent=function(){if(this.bIsDestroyed){return}this._getStickyContent().$().prependTo(this.$())};S.prototype._setStickySubheaderSticked=function(t){this._bStickyContentSticked=t};S.prototype._getStickySubheaderSticked=function(){return this._bStickyContentSticked};S.prototype._activateAllPreceedingSteps=function(t){if(this._aStepPath.indexOf(t)>=0){this.discardProgress(t,true);return}while(this.getProgressStep()!==t){this.nextStep()}};S.prototype._isNextStepDetermined=function(t,e){if(!this.getEnableBranching()){return true}t=t||this._getCurrentStepInstance();return this._getNextStep(t,e)!==null};S.prototype._isStepReachable=function(t){if(this.getEnableBranching()){var e=this._getStartingStep();while(e!==t){e=e._getNextStepReference();if(e==null){return false}}this.setAssociation("currentStep",t);return true}else{return this.getSteps().indexOf(t)>=0}};S.prototype._initScrollEnablement=function(){return new i(this,null,{scrollContainerId:this.getId()+"-step-container",horizontal:false,vertical:true})};S.prototype._initProgressNavigator=function(){var t=this,e=new n(this.getId()+"-progressNavigator",{stepChanged:this._handleStepChanged.bind(this)});e._setOnEnter(function(e,r){var i=t._aStepPath[r];setTimeout(function(){this._focusFirstStepElement(i)}.bind(t),S.CONSTANTS.ANIMATION_TIME)});this.setAggregation("_progressNavigator",e)};S.prototype._handleNextButtonPress=function(){var t=this._getProgressNavigator(),e=t.getProgress(),r=this.isStepFinal();if(r){this.fireComplete()}else{var i=this.getProgressStep();if(!this._isNextStepDetermined(i,e)){throw new Error("The wizard is in branching mode, and the nextStep association is not set.")}t.incrementProgress();this._handleStepActivated(t.getProgress());this._handleStepChanged(t.getProgress())}};S.prototype._getStepScrollOffset=function(t){var e=this._oScroller.getScrollTop(),r=this._getCurrentStepInstance(),i=this._getNextButton(),n=0,s=0;if(t&&t.$()&&t.$().position()){s=t.$().position().top||0}if(!o.system.phone&&r&&i&&!u(r.getDomRef(),i.getDomRef())){n=i.$().outerHeight()}return e+s-(S.CONSTANTS.SCROLL_OFFSET+n)};S.prototype._focusFirstStepElement=function(t){var e=t.$();if(e&&e.firstFocusableDomRef()){e.firstFocusableDomRef().focus()}};S.prototype._handleStepChanged=function(t){var e=(typeof t==="number"?t:t.getParameter("current"))-2,r=this._aStepPath[e],i=this._getNextStep(r,e),n=o.system.desktop?true:false;this.goToStep(i,n)};S.prototype._handleStepActivated=function(t){var e=t-2,r=this._aStepPath[e],i=this._getNextStep(r,e);this._activateStep(i);this._updateProgressNavigator();this.fireStepActivate({index:t});this.setAssociation("currentStep",this.getProgressStep(),true);this.getProgressStep().setWizardContext({bLast:true,bReviewStep:this.isStepFinal(),sButtonText:this._getNextButtonText()})};S.prototype._isMaxStepCountExceeded=function(){var t=this._getStepCount();if(this.getEnableBranching()){return false}return t>=S.CONSTANTS.MAXIMUM_STEPS};S.prototype._isMinStepCountReached=function(){var t=this._getStepCount();return t>=S.CONSTANTS.MINIMUM_STEPS};S.prototype._getStepCount=function(){return this._iStepCount};S.prototype._incrementStepCount=function(){this._iStepCount+=1;this._getProgressNavigator().setStepCount(this._getStepCount())};S.prototype._decrementStepCount=function(){this._iStepCount-=1;this._getProgressNavigator().setStepCount(this._getStepCount())};S.prototype._resetStepCount=function(){this._iStepCount=0;this._getProgressNavigator().setStepCount(this._getStepCount())};S.prototype._getProgressNavigator=function(){return this.getAggregation("_progressNavigator")};S.prototype._saveInitialValidatedState=function(){if(this._aInitialValidatedState){return}this._aInitialValidatedState=this.getSteps().map(function(t){return t.getValidated()})};S.prototype._restoreInitialValidatedState=function(t){var e=this._aStepPath,r=this.getSteps();for(var i=t;i<e.length;i++){var n=e[i],s=r.indexOf(n),o=this._aInitialValidatedState[s];n.setValidated(o)}};S.prototype._getNextStep=function(t,e){if(!this.getEnableBranching()){return this.getSteps()[e+1]}if(e<0){return this._getStartingStep()}var r=t._getNextStepReference();if(r===null){throw new Error("The wizard is in branching mode, and no next step is defined for "+"the current step, please set one.")}if(!this._containsStep(r)){throw new Error("The next step that you have defined is not part of the wizard steps aggregation."+"Please add it to the wizard control.")}var i=t.getSubsequentSteps();if(i.length>0&&!t._containsSubsequentStep(r.getId())){throw new Error("The next step that you have defined is not contained inside the subsequentSteps"+" association of the current step.")}return r};S.prototype.isStepFinal=function(){var t,e=this._getStepCount(),r=this.getProgress();if(this.getEnableBranching()){t=this._aStepPath[this._aStepPath.length-1]._isLeaf()}else{t=r===e}return t};S.prototype._getNextButtonText=function(){if(this.isStepFinal()){return this.getFinishButtonText()}else{return this._oResourceBundle.getText("WIZARD_STEP")+" "+(this.getProgress()+1)}};S.prototype._getNextButton=function(){var t=this._getCurrentStepInstance();if(t){return t.getAggregation("_nextButton")}else{return null}};S.prototype._updateProgressNavigator=function(){var t=this._getProgressNavigator(),e=this._getStartingStep(),r=this.getSteps(),i=[e.getTitle()],n=[e.getIcon()],s=[e.getOptional()],o=1;if(this.getEnableBranching()){while(!e._isLeaf()&&e._getNextStepReference()!==null){o++;e=e._getNextStepReference();i.push(e.getTitle());s.push(e.getOptional());n.push(e.getIcon())}t.setVaryingStepCount(e._isBranched());t.setStepCount(o)}else{i=r.map(function(t){return t.getTitle()});s=r.map(function(t){return t.getOptional()});n=r.map(function(t){return t.getIcon()})}t.setStepTitles(i);t._aStepOptionalIndication=s;t.setStepIcons(n)};S.prototype._getStartingStep=function(){return this.getSteps()[0]};S.prototype._attachScrollHandler=function(){var t=this.getDomRef("step-container");t.onscroll=this._scrollHandler.bind(this)};S.prototype._scrollHandler=function(t){if(this._bScrollLocked){return}var e=t.target.scrollTop,r=this._getProgressNavigator(),i=this._aStepPath[r.getCurrentStep()-1].getDomRef();if(!i){return}var n=i.clientHeight,s=i.offsetTop,o=100;if(e+o>=s+n&&r._isActiveStep(r._iCurrentStep+1)){r.nextStep()}var a=this.getSteps();for(var p=0;p<a.length;p++){if(e+o<=s){r.previousStep();i=this._aStepPath[r.getCurrentStep()-1].getDomRef();if(!i){break}s=i.offsetTop}}};S.prototype._getCurrentStepInstance=function(){return r.byId(this.getCurrentStep())};S.prototype._containsStep=function(t){return this.getSteps().some(function(e){return e===t})};S.prototype._checkCircularReference=function(t){if(this._aStepPath.indexOf(t)>=0){throw new Error("The step that you are trying to activate has already been visited. You are creating "+"a loop inside the wizard.")}};S.prototype._activateStep=function(t){this._checkCircularReference(t);this._aStepPath.push(t);t._activate()};return S});