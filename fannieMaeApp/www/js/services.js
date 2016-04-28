angular.module('app.services', [])


.factory("busyIndicator",function()
	{
		return busyIndicatorGlobal;
	}
)

.factory("accountsService", function($q)
{
	return function(){
		console.log("In Service Method");
		var deferred = $q.defer();
		var invocationData = {
				adapter : 'DataAdapter',
				procedure : 'getPortfolio2',
				parameters : []
			};

		WL.Client.invokeProcedure(invocationData,{
			onSuccess : $.proxy(function(data)
			{
				console.log("GOT THIS DATA", data);
				deferred.resolve(data.invocationResult.rows);
				//deferred.resolve(data.invocationResult.accounts);
			},this),
			onFailure :  $.proxy(function(error)
			{
				deferred.reject(error);
			},this)
		});
		return deferred.promise;
	};
})

.factory("transactionsService", function($q, $routeParams)
		{
			return function(accountId){
				var deferred = $q.defer();
				var invocationData = {
						adapter : 'DataAdapter',
						procedure : 'getTransactions',
						parameters : [accountId]
					};

				WL.Client.invokeProcedure(invocationData,{
					onSuccess : $.proxy(function(data)
					{
						deferred.resolve(data.invocationResult.array);
					},this),
					onFailure :  $.proxy(function(error)
					{
						deferred.reject(error);
					},this)
				});
				return deferred.promise;
			};
})
