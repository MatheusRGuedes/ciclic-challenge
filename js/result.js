const url = window.location.href;

const equalIndex = url.indexOf('=') + 1;
		
const paragraths = document.querySelectorAll('#resultBox p');

const textsArray = [
	`Olá x !`,
	`Juntando R$x todo mês,`,
	`você terá R$x em x anos.`
];


function addTextToParagrath( text, index ) {
	paragraths[index].innerHTML = text;
}

function searchVariables ( value ) {
	// tira a sequencia de char q foi formado pelos espaços no valor passado à função passValue() 
	return decodeURIComponent( value.substring( equalIndex ));
}

//array com cada indice um valor informado
var variables = searchVariables( url ).split( ' ' );


// JQUERY para imports
$(document).ready(function(){
	
	(async function() {

		await $.get("layout.html", function(data) {

	       	$("#index").prepend(data);
					
			$("#resultBox").prependTo(".data-container");

			textsArray.forEach(addTextToParagrath);

			$(document).on('click', '#btn', function() {
			    window.location.href = document.referrer;
			});
		});
	})();
});




function preencherValores() {
						
	console.log(textsArray);

	var indexArray = [];

	// adicionar os valores da url abaixo

	for ( text of textsArray ) {
		var indexArr = textsArray.indexOf(text);

		for ( var pos = 0; pos < text.length; pos++ ) {
			if ( indexArr == 0 && text[pos] === 'x' ) {
				//indexArray.push(pos);
				textsArray[indexArr] = textsArray[indexArr].replace('x', variables[0]);

				break;
			} 
			else if ( (indexArr == 1 || indexArr == 2) && text[pos] === 'x') {
				//indexArray.push(pos);
				if ( indexArr == 1 ) {

					textsArray[indexArr] = textsArray[indexArr].replace('x', formatNumber(variables[1]));

					break;
				}

				else {
					if ( textsArray[indexArr].indexOf('x') === 12 )
						textsArray[indexArr] = textsArray[indexArr].replace('x', nFormatter(parseFloat(variables[2]), 2));
					else {
						textsArray[indexArr] = textsArray[indexArr].replace('x', parseFloat(variables[3]) / 12);
							
						break;
					}
				} 
			}
		}
	}

	console.log(textsArray);
}

preencherValores();




function formatNumber( value ) {
	var intPart = parseInt(value);
	var length = intPart.toString().length;
	var decPart = value.substring(length + 1, length + 3); //pega duas casas decimais
			
	if (decPart)
		return intPart + "," + decPart;
	else 
		return intPart;
}

function nFormatter(num, digits) {
	var si = [
		{ value: 1, symbol: "" },       //centena
		{ value: 1E3, symbol: "k" },    //mil
		{ value: 1E6, symbol: "M" },    //milhão
		{ value: 1E9, symbol: "B" },    //bilhão
		{ value: 1E12, symbol: "T" },   //trilhão
		{ value: 1E15, symbol: "Qa" },	//quadrilhão
		{ value: 1E18, symbol: "Qi" }   //quintilhão
	];
	var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
	var i;
	for (i = si.length - 1; i > 0; i--) {
		if (num >= si[i].value) {
			break;
		}
	}
	return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

/*var tests = [
	{ num: 1234, digits: 1 },
	{ num: 100000000, digits: 1 },
  	{ num: 299792458, digits: 1 },
	{ num: 759878, digits: 1 },
	{ num: 759878, digits: 0 },
	{ num: 123, digits: 1 },
	{ num: 123.456, digits: 1 },
	{ num: 123.456, digits: 2 },
	{ num: 123.456, digits: 4 }
];
var i;
for (i = 0; i < tests.length; i++) {
	console.log("nFormatter(" + tests[i].num + ", " + tests[i].digits + ") = " + nFormatter(tests[i].num, tests[i].digits));
}*/
