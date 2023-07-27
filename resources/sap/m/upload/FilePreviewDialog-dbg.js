/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"sap/ui/core/Element",
	"sap/ui/core/HTML",
	"sap/ui/richtexteditor/RichTextEditor",
	"sap/m/Button",
	"sap/m/Image",
	"sap/m/PDFViewer",
	"sap/m/Dialog",
	"sap/m/IllustratedMessage",
	"sap/m/IllustratedMessageType",
	"sap/m/Carousel"
], function (Element, HTML, RichTextEditor, Button, Image,
			PDFViewer, Dialog, IllustratedMessage, IllustratedMessageType, Carousel) {
	"use strict";

	// get resource translation bundle;
	var oLibraryResourceBundle = sap.ui.getCore().getLibraryResourceBundle("sap.m");

	/**
	 * Media types that can be previewed.
	 * @enum {string}
	 */
	var PreviewableMediaType = {
		Png: "image/png",
		Bmp: "image/bmp",
		Jpeg: "image/jpeg",
		Gif: "image/gif",
		Txt: "text/plain",
		Pdf: "application/pdf",
		ChromePdf: "application/x-google-chrome-pdf",
		Mpeg: "video/mpeg",
		Mp4: "video/mp4",
		Quicktime: "video/quicktime",
		MsVideo: "video/x-msvideo"
	};

	/**
	 * The file preview dialog.
	 *
   * @class Dialog with a carousel to preview files uploaded using the UploadSet control.
	 * @param {sap.m.upload.UploadSetTableItem} oPreviewItem The initial active UploadSetTableItem to be previewed.
   * @private
   * @extends sap.ui.core.Element
   * @name sap.m.upload.FilePreviewDialog
   */
	var FilePreviewDialog = Element.extend("sap.m.upload.FilePreviewDialog", {

		constructor: function (oPreviewItem) {
			if (!oPreviewItem) {
				return;
			}
			var aItems = oPreviewItem.getParent().getAggregation("items");
			if (!aItems || aItems.length === 0 ) {
				return;
			}
			var oCarousel = this._createCarousel(oPreviewItem, aItems);
			this._oDialog = this._createDialog(oCarousel, aItems);
		},

		/**
     * Opens the {@link sap.m.upload.FilePreviewDialog}.
     */
		open: function () {
			if (!this._oDialog) {
				return;
			}
			this._oDialog.open();
		},

		/**
     * Creates a {@link sap.m.Carousel} of uploaded files.
     *
		 * @param {sap.m.upload.UploadSetTableItem} oPreviewItem The initial active UploadSetTableItem to be previewed.
		 * @param {array} aItems The collection of UploadSetTableItems to be included in the Carousel.
		 * @return {sap.m.Carousel} The {@link sap.m.Carousel} control.
     * @private
     */
		_createCarousel: function (oPreviewItem, aItems) {
			var sActivePageId = "";
			var aPages = aItems.map(function(oItem) {
				var sMediaType = oItem.getMediaType();
				var oPage = null;

				switch (sMediaType.toLowerCase()) {
					case PreviewableMediaType.Png:
					case PreviewableMediaType.Bmp:
					case PreviewableMediaType.Jpeg:
					case PreviewableMediaType.Gif: {
						oPage = new Image({
							src: oItem.getUrl()
						});
						break;
					}
					case PreviewableMediaType.Txt: {
						var oRequest = new XMLHttpRequest();
						oRequest.open("GET", oItem.getUrl(), false);
						oRequest.send(null);
						var sText = oRequest.responseText;

						oPage = new RichTextEditor({
							height: "100%",
							width: "100%",
							value: sText,
							editable: false
						});
						break;
					}
					case PreviewableMediaType.Pdf:
					case PreviewableMediaType.ChromePdf: {
						oPage = new PDFViewer({
							source: oItem.getUrl(),
							showDownloadButton: false
						});
						break;
					}
					case PreviewableMediaType.Mpeg:
					case PreviewableMediaType.Mp4:
					case PreviewableMediaType.Quicktime:
					case PreviewableMediaType.MsVideo: {
						oPage = new HTML({
							content: "<video controls width='100%' height='100%' src='" + oItem.getUrl() + "'>"
						});
						break;
					}
					default : {
						oPage = new IllustratedMessage({
							illustrationType: IllustratedMessageType.NoData,
							title: oItem.getFileName(),
							description: "No preview available for this file.",
							enableVerticalResponsiveness: true
						});
						break;
					}
				}

				sActivePageId = oItem.getId() === oPreviewItem.getId() ? oPage.getId() : sActivePageId;

				return oPage;
			});

			var oCarousel = new Carousel({
				showPageIndicator: true,
				pages: [
					aPages
				],
				activePage: sActivePageId,
				height: "85vh",
				pageChanged: function(oEvent) {
					var iIndex = aPages.findIndex(function(oPage) {
						return oPage.sId === oEvent.getParameter("newActivePageId");
					});
					var sNewDialogTitle = aItems[iIndex].getFileName();
					oEvent
						.getSource()
						.getParent()
						.setProperty("title", sNewDialogTitle);
				}
			});

			return oCarousel;
		},

		/**
     * Creates a {@link sap.m.Dialog} with {@link sap.m.Carousel} for previewing uploaded files.
     *
		 * @param {sap.m.Carousel} oCarousel The Carousel control.
		 * @param {array} aItems The collection of UploadSetTableItems included in the Carousel.
		 * @return {sap.m.Dialog} The {@link sap.m.Dialog} control.
     * @private
     */
		_createDialog: function(oCarousel, aItems) {
			var that = this;
			var oActiveItem = this._getActiveUploadSetTableItem(oCarousel, aItems);
			var oDialog = new Dialog({
				title: oActiveItem.getFileName(),
				content: oCarousel,
				horizontalScrolling: true,
				verticalScrolling: true,
				buttons: [
					new Button({
						text: oLibraryResourceBundle.getText("UPLOAD_SET_TABLE_FILE_PREVIEW_DIALOG_DOWNLOAD"),
						press: function () {
							that._getActiveUploadSetTableItem(oCarousel, aItems).download(true);
						}
					}),
					new Button({
						text: oLibraryResourceBundle.getText("UPLOAD_SET_TABLE_FILE_PREVIEW_DIALOG_CLOSE"),
						press: function () {
							that._oDialog.close();
						}
					})
				]
			});

			return oDialog;
		},

		/**
     * Creates a {@link sap.m.Carousel} of uploaded files.
     *
		 * @param {sap.m.Carousel} oCarousel The Carousel control.
		 * @param {array} aItems The collection of UploadSetTableItems included in the Carousel.
		 * @return {sap.m.upload.UploadSetTableItem} The currently active UploadSetTableItem.
     * @private
     */
		_getActiveUploadSetTableItem: function (oCarousel, aItems) {
			var sActivePageId = oCarousel.getActivePage();
			var aPages = oCarousel.getPages();
			var iIndex = aPages.findIndex(function (oPage) {
				return oPage.sId === sActivePageId;
			});
			return aItems[iIndex];
		}
	});

  return FilePreviewDialog;
});