app.controller("ItemViewCtrl", function($routeParams, $scope, ItemFactory, ToolFactory) {
	$scope.selectedItem = {};
	$scope.tools = [];

	ItemFactory.getSingleItem($routeParams.id).then((results) => {
		console.log("results", results);
		$scope.selectedItem = results.data;
	}).catch((error) => {
		console.log("getSingleItem", error);
	});

	ToolFactory.getToolList($routeParams.id).then((results) => {
		console.log("results", results);
		$scope.tools = results.data;
	}).catch((error) => {
		console.log("error in getToolList", error);
	});

});