# JSON Format
## Sample
```JSON
data = {
	"config":{
		"language":"en"
	},
	"text":{
		"example":{
			"en":"example",
			"de":"Beispiel"
		}
	},
	"initialAmount":1234.56,
	"transactions":{
		"2018-03-11":[
			{"date":"YYYY-MM-DD","charge":"+","amount":1234.56,"title":"MyTransaction","categories":[]},
			{"date":"YYYY-MM-DD","charge":"+","amount":1234.56,"title":"MyTransaction","categories":["food"]}
		],
		"2018-03-12":[
			{"date":"YYYY-MM-DD","charge":"+","amount":1234.56,"title":"MyTransaction","categories":["technology", "amazon"]}
		]
	},
	"recurringTransactions":[
		{
			"recurUnit":"month",
			"recurFrequency":1,
			"amount":160,
			"title":"Recurring transaction",
			"categories":[],
			"startDate":"YYYY-MM-DD"
		}
	]
}
```
