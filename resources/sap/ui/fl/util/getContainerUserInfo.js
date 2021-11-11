/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Utils","sap/base/Log"],function(e,r){"use strict";function t(e){if(!e){return""}return e}return function(){return e.ifUShellContainerThen(function(e){var n=e[0];if(!n){return{}}var i=n.getUser();if(!i){return{}}try{var a=t(i.getEmail());var u;if(a){u=t(/@(.*)/.exec(a)[1])}else{u=""}return{fullName:t(i.getFullName()),firstName:t(i.getFirstName()),lastName:t(i.getLastName()),email:a,domain:u}}catch(e){r.error("Unexpected exception when reading shell user info: "+e.toString())}},["UserInfo"])||{}}});