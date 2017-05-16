app.run(function(FIREBASE_CONFIG) {
    firebase.initializeApp(FIREBASE_CONFIG);
});

app.config(function($routeProvider) {
    $routeProvider
        .when('/items/list', {
            templateUrl: 'partials/item-list.html',
            controller: 'ItemListCtrl'
        })
        .when('/items/new', {
            templateUrl: 'partials/item-new.html',
            controller: 'ItemNewCtrl'

        })
        .when('/item/view/:id', {
            templateUrl: 'partials/item-view.html',
            controller: 'ItemViewCtrl'
        })
        .when('/item/edit/:id', {
            templateUrl: 'partials/item-new.html',
            controller: 'ItemEditCtrl'
        })
        .otherwise('/items/list');
});

app.controller("NavCtrl", function($scope) {
    $scope.cat = "Meow";
    $scope.navItems = [{ name: "Logout" }, { name: "All Items" }, { name: "New Item" }];
});

app.controller("ItemListCtrl", function() {
    console.log("inside ItemListCtrl");
});

app.controller("ItemNewCtrl", function() {
    console.log("inside ItemNewCtrl");
});

app.controller("ItemViewCtrl", function() {
    console.log("inside ItemViewCtrl");
});

app.controller("ItemEditCtrl", function() {
    console.log("inside ItemEditCtrl");
});

app.controller("ItemCtrl", function($http, $q, $scope, FIREBASE_CONFIG) {
    $scope.dog = "Woof";
    $scope.showListView = true;
    $scope.items = [];

    $scope.newItem = function() {
        $scope.showListView = false;
    };

    $scope.allItem = function() {
        $scope.showListView = true;
    };

    var getItemList = function() {
        let itemz = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/items.json`)
                .then((fbItems) => {
                    var itemCollection = fbItems.data;
                    Object.keys(itemCollection).forEach((key) => {
                        itemCollection[key].id = key;
                        itemz.push(itemCollection[key]);
                    });
                    resolve(itemz);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    var getItems = function() {
        getItemList().then((itemz) => {
        $scope.items = itemz;
        }).catch((error) => {
            console.log("get Error", error);
        });
    };

    getItems();

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
        $scope.showListView = true;
        getItems();
      }).catch((error) => {
        console.log("Add error", error);
      });
    };



});
