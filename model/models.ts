import Device from "sap/ui/Device";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace sapmarco.projectpages.model
 * @returns {JSONModel}
 */
export default function(): JSONModel {
	return new JSONModel(Device).setDefaultBindingMode('OneWay');
}