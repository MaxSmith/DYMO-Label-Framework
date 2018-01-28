# DYMO Label Framework
DYMO Label Framework JavaScript Library:
http://developers.dymo.com/category/dymo-label-framework/

## Example of use

``` 
window.dymo_label.load_template( 'templates/my-label.xml', function( xml_template ){
  
  var number_of_copies = 1;
  var label = window.dymo.label.framework.openLabelXml( xml_template );
  
  label.setObjectText('txtMain', 'Hello World!');
	label.setObjectText('txtStat', 7777);
	label.setObjectText('Barcode', 2018);

  window.dymo_label.print( label, number_of_copies );

});
``` 
