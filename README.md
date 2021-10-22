Código fonte de um servidor NodeJS para o teste de desenvolvedor backend da Gorila Invest.

Para rodar localmente a aplicação utilize o comando abaixo:

~~~
node ./src/main.js
~~~

# Montando uma requisição

O servidor disponibiliza um serviço cuja URL é /calcCDBUnitPrice e espera receber uma requisição GET na qual o conteúdo do body é um objeto JSON no formato:

~~~JSON
{
    "investmentDate":"2016-11-14",
    "cdbRate": 103.5,
    "currentDate":"2016-12-26"
}
~~~

A faixa de datas aceita é entre '2016-11-14' e '2016-12-23'.

É esperado que o serviço retorne um array de objetos no formato:

~~~JSON
[{
	"date": "2016-12-26",
	"unitPrice": XX.XX
},
{
	"date": "2016-12-25",
	"unitPrice": YY.YY
},
{
	"date": "2016-12-24",
	"unitPrice": ZZ.ZZ
}]
~~~

Contendo o preço unitário do CDB desde a data do investimento até a data atual.