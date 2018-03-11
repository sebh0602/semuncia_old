# JSON Format
## Sample
```JSON
data = {
	"config":{
		"language":"en"
	},
	"initialAmount":1234.56,
	"transactions":{
		"2018-03-11":[
			{"date":"YYYY-MM-DD","charge":"+","amount":1234.56,"title":"MyTransaction"},
			{"date":"YYYY-MM-DD","charge":"+","amount":1234.56,"title":"MyTransaction"}
		],
		"2018-03-12":[
			{"date":"YYYY-MM-DD","charge":"+","amount":1234.56,"title":"MyTransaction"}
		]
	},
	"recurringTransactions":[
		{
			"recurUnit":"month",
			"recurFrequency":1,
			"amount":160,
			"title":"Recurring transaction",
			"startDate":"YYYY-MM-DD"
		}
	]
}
```
