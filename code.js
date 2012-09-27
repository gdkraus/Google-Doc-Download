googleDocExportNCSUA11y();

function googleDocExportNCSUA11y() {
	// get the current document URL
    //var originalPath=window.location.protocol + '//' + window.location.host + window.location.pathname;
	
	// split up the current document's URL 
	var pathArray = window.location.pathname.split( '/' );
    
	// get the individual variables in the URL
	var urlVars = getUrlVarsNCSUA11y(window.location.href);

	// start building the new URL
	var newPath=window.location.protocol + '//' + window.location.host;
    
	var docType='';

	// Each of the document types (document, spreadsheet, and presentation) has a slightly different URL formula. The urlFlag and stopProcessing are used to aid in correctly assembling the URL string for each document type.
    var urlFlag = false;
    var stopProcessing = false;
    
	// parse the current URL and build the URL to download the doc based on document type		
	for ( var i = 0; i < pathArray.length; i++ ) {
	
		// determine the document type
        switch(pathArray[i]){
        case 'document':
            docType='document';
            break;
        case 'spreadsheet':
            docType='spreadsheet';
            break;
        case 'presentation':
            docType='presentation';
            break;
        case 'present':
        	docType='converted-presentation';
            break;
        }
        		
		if(docType=='document'){
            if(urlFlag){
                newPath += pathArray[i] + '/export?format=docx&id=' + pathArray[i];
                urlFlag=false;
                stopProcessing = true;
            }
            if(pathArray[i]=='d'){
                urlFlag=true;
            }
        }else if(docType=='presentation'){
            if(urlFlag){
                newPath += pathArray[i] + '/export/pptx?id=' + pathArray[i];
                urlFlag=false;
                stopProcessing = true;
            }
            if(pathArray[i]=='d'){
                urlFlag=true;
            }
		}else if(docType=='converted-presentation'){
	        // this format does not seem to be used any more but I will leave it in here for now for compatibility
            if(pathArray[i]=='present'){
                var idParameter = urlVars['id'];
                newPath += pathArray[i] + '/export?id=' + idParameter + '&format=ppt';
                urlFlag=false;
                stopProcessing = true;
            }
            if(pathArray[i]=='present'){
                urlFlag=true;
            }
        }else if(docType=='spreadsheet'){
            if(pathArray[i]=='ccc'){
                urlFlag=true;
                var keyParameter = urlVars['key'];
                newPath += 'ccc?key=' + keyParameter.substr(0,keyParameter.lastIndexOf('#')) + '&output=xls';
				stopProcessing = true;
            }
        }

		// append the most recently parsed part of the original URL
        if(!stopProcessing){
            
            newPath += pathArray[i];
            newPath += '/';
        }
    }
    // open a new tab with the direct download URL if a correct document type was detected in the original URL
    if(docType!=''){
        window.open(newPath);
    } else {
    	alert('This does not appear to be a Google Doc.');
    }
}

// get a particular value for a variable in the URL
function getUrlVarsNCSUA11y(u) {
    var vars = {};
    var parts = u.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}