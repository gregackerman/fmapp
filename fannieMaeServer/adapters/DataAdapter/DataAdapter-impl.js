/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/**
 *  WL.Server.invokeHttp(parameters) accepts the following json object as an argument:
 *
 *  {
 *  	// Mandatory
 *  	method : 'get' , 'post', 'delete' , 'put' or 'head'
 *  	path: value,
 *
 *  	// Optional
 *  	returnedContentType: any known mime-type or one of "json", "css", "csv", "plain", "xml", "html"
 *  	returnedContentEncoding : 'encoding',
 *  	parameters: {name1: value1, ... },
 *  	headers: {name1: value1, ... },
 *  	cookies: {name1: value1, ... },
 *  	body: {
 *  		contentType: 'text/xml; charset=utf-8' or similar value,
 *  		content: stringValue
 *  	},
 *  	transformation: {
 *  		type: 'default', or 'xslFile',
 *  		xslFile: fileName
 *  	}
 *  }
 */

/*
 function getPortfolio() {
 	var input = {
 	    method : 'get',
 	    returnedContentType : 'json',
 	    path : "/mwdserverstub/rest/portfolio/portfolio.json"
 	};

 	return WL.Server.invokeHttp(input);
 }
*/

function getPortfolio() {
  var input = {
    method: 'get',
    returnedContentType: 'json',
    path: "/portfolio/_all_docs?include_docs=true"
  };

  return WL.Server.invokeHttp(input);
}

function getPortfolio2() {
  var input = {
    method: 'get',
    returnedContentType: 'json',
    path: "/portfolio2/_all_docs?include_docs=true"
  };

  return WL.Server.invokeHttp(input);
/*
  var response = { 'rows': [
    { 'doc' : {
      "AssetID": "AST000000000081008",
      "AssetName": "AMTM",
      "LastScan": "2015-07-16T04:00:00.000Z",
      "TQI": 2.64208494332676,
      "Transferability": 3.0472079877741,
      "Changeability": 2.8411992775988,
      "Robustness": 2.70439534708639,
      "Efficiency": 2.24010264050728,
      "Security": 2.01291339326915,
      "Critical Findings": 3710,
      "LinesOfCode": 281631,
      "Portfolio": "CMFT",
      "SubPortfolio": "CMFT - Finance",
      "DevStatus": "Target State",
      "SDLC": null,
      "Vendor": null,
      "BaseLines": "1",
      "$$hashKey": "object:288"}
    }
  ] };
  return response;
  */
}

function getTransactions(accountId) {
  var input = {
    method: 'get',
    returnedContentType: 'json',
    path: "/mwdserverstub/rest/accounts/" + accountId + "/transactions.json"
  };

  return WL.Server.invokeHttp(input);
}
