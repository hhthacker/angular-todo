app.controller("ItemCtrl", function() {

    var postNewItem = function(newItem) {
        return $q((resolve, reject) => {
            $http.post(`${FIREBASE_CONFIG.databaseURL}/items.json`, JSON.stringify(newItem)) //where to post and what to post
                .then((resultz) => {
                    resolve(resultz);
                }).catch((error) => {
                    reject(error);
                });
        });
    };


    $scope.addNewItem = () => {

      $scope.newTask.isCompleted = false;
      postNewItem($scope.newTask).then((response) => {
        $scope.newTask = {};
        getItems();
      }).catch((error) => {
        console.log("Add error", error);
      });
    };

});
