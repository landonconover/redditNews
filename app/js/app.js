(function () {
	var app = 
	/**
	* reddit Module
	*
	* This is the reddit module
	*/
	angular.module('reddit', ['angularMoment']);

	app.factory('getRedditData', ['$http', function($http) {

		return {
		    frontPage: function() {
		      return $http.get('http://www.reddit.com/.json?limit=100&after=t3_10omtd/');  //1. this returns promise
		    }
		  };

		// var myService = {
		//     frontPage: function() {
		//       // $http returns a promise, which has a then function, which also returns a promise
		//       var promise = $http.get('http://www.reddit.com/.json').then(function (response) {
		//         // The then function here is an opportunity to modify the response
		//         console.log(response);
		//         console.log(response.data.data.children);
		//         // The return value gets picked up by the then in the controller.
		//         return response.data.data.children;
		//       });
		//       // Return the promise to the controller
		//       return promise;
		//     }
		//   };
		//   return myService;


  }]);

	app.controller('RedditController', ['$http', '$scope', '$timeout', 'getRedditData', function($http, $scope, $timeout, getRedditData){
		var redditData = this;


		getRedditData.frontPage().then(function(d) {
		    redditData.myData = d.data.data.children;
		    console.log('THIS IS FROM THE SERVICE');
		    console.log(d);
		  });

		this.displayClass = function(title, ups, selfText){
			var myClass = "myItem";
			// console.log(title);

			title = title.replace(/(^\s*)|(\s*$)/gi,"");
			title = title.replace(/[ ]{2,}/gi," ");
			title = title.replace(/\n /,"\n");

			selfText = selfText.replace(/(^\s*)|(\s*$)/gi,"");
			selfText = selfText.replace(/[ ]{2,}/gi," ");
			selfText = selfText.replace(/\n /,"\n");

			var titleLength = title.split(' ').length;
			var selfTextLength = selfText.split(' ').length;

			console.log('______________________');
			console.log(selfText);
			console.log(selfTextLength);

			// if (titleLength > 10) {
			// 	myClass += " w-2";
			// };

			// if (titleLength > 20) {
			// 	myClass += " h-2";
			// };

			if (ups > 3000) {
				myClass += " w-2";
			};

			if (ups > 4000) {
				myClass += " h-2";
			};

			if (selfTextLength > 20) {
				myClass += " h-2";
			};

			if (selfTextLength > 50) {
				myClass += " w-2";
			};

			console.log(myClass);

			return myClass;
		}


		 $scope.layoutDone = function() {
            // $('a[data-toggle="tooltip"]').tooltip(); // NOT CORRECT!

            $timeout(function() { 

            	var container = document.querySelector('#gridContainer');
            	
            	var pckry = new Packery( container, {
            	  // options
            	  itemSelector: '.myItem'
            	});
			}, 0); // wait...

        };


	}]); //end controller

	app.directive('newsPack', function() {
	    return function(scope, element, attrs) {


            if (scope.$last) { // all are rendered
                scope.$eval(attrs.newsPack);
            }
        };
	}); 

	angular.module('ng').filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });
	

})();