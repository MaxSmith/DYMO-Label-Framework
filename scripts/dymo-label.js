window.dymo_label = {

	templates: {},

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

		return true;

	},

	load_template: function( url, success ){
		
		// if loaded
		if( this.templates[url] ){
			success(this.templates[url]);
			return this.templates[url];
		}

		// if not loaded
		var self = this;
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if ( this.readyState == 4 && this.status == 200 ) {
				self.templates[url] = this.response;
				success(this.response);
			}
		};
		xhttp.open('GET', url, true);
		xhttp.send();

		return xhttp;
		
	},

	print: function( label, number_of_copies ) {

		if( !dymo ){
			return null;
		}

		var printers = dymo.label.framework.getPrinters();

		// Gets name of first printer
		var printer_name = printers[0].name;

		if( printer_name && label ){

			var print_params = dymo.label.framework.createLabelWriterPrintParamsXml({
				copies: number_of_copies
			});

			label.print( printer_name, print_params );

			return label;

		}

		return null;
	}

};