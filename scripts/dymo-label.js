window.dymo_label = {

	template_xml: null,

	check_framework: function(){

		if ( !dymo || !dymo.label || !dymo.label.framework ) {
			return [false,'Can`t print label: DYMO Framework is not loaded.'];
		}

		var printers = dymo.label.framework.getPrinters();

		if ( !printers || printers.length === 0 ) {
			return [false,'Can`t print label: no label printers found.'];
		}

		var check = dymo.label.framework.checkEnvironment();

		if ( !check.isBrowserSupported ) {
			return [false,'DYMO Framework: your browser is not supported.'];
		}

		if ( !check.isFrameworkInstalled ) {
			return [false,'DYMO Framework is not installed.'];
		}

		if ( !check.isWebServicePresent ) {
			return [false,'DYMO Framework: web service is not present.'];
		}

		deferred.resolve();

		return true;

	},

	load_template: function( url, success ){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if ( this.readyState == 4 && this.status == 200 ) {
				success(this.response);
			}
		};
		xhttp.open('GET', url, true);
		xhttp.send();
		return xhttp;
	},

	get: function(){
		if( this.template_xml ){
			return dymo.label.framework.openLabelXml( this.template_xml );
		}
		return null;
	},

	print: function( label, num_of_copies ) {

		if( !dymo ){
			return null;
		}

		var printers = dymo.label.framework.getPrinters();

		// Gets name of first printer
		var printer_name = printers[0].name;

		if( printer_name && label ){

			var print_params = dymo.label.framework.createLabelWriterPrintParamsXml({
				copies: num_of_copies
			});

			label.print( printer_name, print_params );

			return label;

		}

		return null;
	}

};