/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge","sap/ui/fl/write/api/connectors/ObjectStorageConnector"],function(e,t){"use strict";var i={_itemsStoredAsObjects:true,_items:{},setItem:function(e,t){i._items[e]=t},removeItem:function(e){delete i._items[e]},clear:function(){i._items={}},getItem:function(e){return i._items[e]},getItems:function(){return i._items}};var n=e({},t,{storage:i});return n},true);