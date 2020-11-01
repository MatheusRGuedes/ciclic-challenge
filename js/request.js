// VARIABLES

var nome = "", 
	mensalidade = 0, 
	tempoCont = 0, 
	taxaJuros = 0;


const passValueToNextUrl = function( value ) {
	//para uso do browserSync  --> http://localhost:3000/ciclic2.html?result=
	//para o domínio do github --> https://matheusrguedes.github.io/ciclic-challenge/pages/index.html?result=
	window.location = 'https://matheusrguedes.github.io/ciclic-challenge/pages/index.html?result=' + value;
};


// FUNCTIONS


function verifyData() {
	nome = 			document.querySelector('#nome').value;
	mensalidade = 	document.getElementById('mensalidade').value;
	tempoCont = 	document.getElementById('tempoContribuicao').value;
	taxaJuros = 	document.getElementById('taxaJuros').value;

	if (nome === "" || mensalidade === "" || tempoCont === "" || taxaJuros === "") {
		alert("Dados inválidos");
		return false;
	} 
	if (mensalidade === "0" || tempoCont === "0" || taxaJuros === "0") {
		alert("Insira valores maiores que 0.");
		return false;
	}
	else {
		mensalidade = 	mensalidade.split(".").join("").replace(",", ".");
		tempoCont = 	parseFloat( tempoCont ) * 12;
		taxaJuros = 	parseFloat( taxaJuros.replace(",", '.') );

		if ( taxaJuros < 1 )
			taxaJuros /= 100;
	}

	return true;
}


function sendHttpRequest( method, url, data ) {

	const isValid = verifyData();

	if ( isValid ) {

		//precision retorna o result com 5 digitos, por exemplo
		var myJason = {
			"expr": mensalidade + "*" + "(((1+" + taxaJuros + ")^" + tempoCont + "-1)/" + taxaJuros + ")"
		};

		var request = new XMLHttpRequest();

		//se data for true concatena com a valor de expr 
		request.open( method, url + (data ? '' : encodeURIComponent(myJason["expr"])) );

		request.responseType = 'text';

		if ( data ) {
			request.setRequestHeader('Content-type', 'application/json');
			request.send( JSON.stringify( myJason ) );
		} else {
			request.send( null );
		}

		//evento ao baixar os dados
		request.onload = () => {
			var responseData = JSON.parse(request.response);

			//console.log( responseData );

			passValueToNextUrl( 
				`${nome} 
				${mensalidade} 
				${data ? isNaN(responseData.result) ? "0" : responseData.result : responseData} 
				${tempoCont}`
			);
		}
	}
}


//3º parâmetro refere-se ao objeto json ser enviado no send()
function getData() {
	sendHttpRequest( 'GET', 'https://api.mathjs.org/v4/?expr=');
}

function sendData() {
	sendHttpRequest( 'POST', 'https://api.mathjs.org/v4/', true );
}





/*
				- validação mais complexa
				- continuar estudando a partir do segundo JSON de js jason (w3schools)
				- criar o footer



				-------------------  Consulta  --------------------


				XMLHttpRequest.readyState

				0		UNSENT				Cliente foi criado. open()ainda não ligou.
				1		OPENED				open() tem sido chamado.
				2		HEADERS_RECEIVED	send() foi chamado e os cabeçalhos e status estão disponíveis.
				3		LOADING				responseText mantém dados parciais.
				4		DONE               	Operação concluída


				XMLHttpRequest.status  (codigo de status)

				0		antes de solicitar				
				200		dados transferidos com sucesso (LOADING E DONE)
				

				XMLHttpRequest = new XMLHttpRequest()

				- API, permite fazer solicitações de rede para recuperar recursos de um servidor (XHR)


				XMLHttpRequest Converção

				- Parse 	-> string para objeto
				- Stringify	-> objeto para string


				XMLHttpRequest.responseType

				- avisa ao XHR q o servidor deve retornar TEXT e será convertido por objeto (json) ou text


				XMLHttpRequest.Open

				- Caracterização da solicitação
				- abre/inicia uma nova solicitação/requisicao ou uma reinicializa uma nova solicitacao existente


				XMLHttpRequest.setRequestHeader
				
				- Definirá uma informação de "cabeçalho" para a próxima XMLHttpRequest
				- Uma informação sobre os dados no corpo da solicitação, informando que tipo de dados esta incluído
				- Content Type é mais recomendável para POST
					- request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
					- request.setRequestHeader('Content-type', 'application/json');
					- request.setRequestHeader("Accept", "**")
				- Exemplo: <meta name="........" content="............."/>
				
			*/
