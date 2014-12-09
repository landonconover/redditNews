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
			//get the front page posts. How many and The after ID if you want to limit
		    frontPage: function(limit, after, sub) {

		    	var getURL = 'http://www.reddit.com/';
		    	//if a sub is set
		    	getURL = sub? getURL = getURL + 'r/' + sub +'/.json?limit='+limit : getURL + '.json?limit='+limit;
		    	
		    	//get posts afer a post id. Found at data.after IF after is set.
		    	getURL = after ? getURL = getURL + '&after=' + after : getURL;
		    	
		    	console.log(getURL);

		      return $http.get(getURL);  //1. this returns promise
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

		// This runs when you press the next posts button
		$scope.getNextPosts = function(lastId){

			getRedditData.frontPage('25', $scope.lastItemId).then(function(d) {
			    $scope.redditData = d.data.data.children;
			    console.log(d);

			    $scope.lastItemId = d.data.data.after;
			  });
		};

		// This runs when you press the next posts button
		$scope.changeSub = function(subReddit){

			console.log(subReddit);

			$scope.currentSub = subReddit;

			if (!subReddit) {
				$scope.currentSub = "";
			};

			getRedditData.frontPage('25', $scope.lastItemId, $scope.currentSub).then(function(d) {
			    $scope.redditData = d.data.data.children;
			    console.log('THIS IS FROM THE SERVICE');
			    console.log(d);

			    $scope.lastItemId = d.data.data.after;
			  });
		};

		//get data for inital page load
		getRedditData.frontPage('25').then(function(d) {
		    $scope.redditData = d.data.data.children;
		    console.log('THIS IS FROM THE SERVICE');
		    console.log(d);

		    //set last item id so we can get the next posts
		    $scope.lastItemId = d.data.data.after;
		  });

		// run this function when the ng-repeat is done.
		 $scope.layoutDone = function() {
            // $('a[data-toggle="tooltip"]').tooltip(); // NOT CORRECT!

            // angular is dumb and it breaks without the 0ms timeout
            $timeout(function() { 

            	var container = document.querySelector('#gridContainer');
            	//run pckry
            	var pckry = new Packery( container, {
            	  // options
            	  itemSelector: '.myItem'
            	});
			}, 0); // wait...

        };




	}]); //end controller

	//this is a directive to watch the ng-repeat when it is done run the layoutDone() function
	app.directive('newsPack', function() {
	    return function(scope, element, attrs) {


            if (scope.$last) { // all are rendered
            	//run the function found in this directive. NOTE: It is not using the naitve eval() but it still feels dirty
                scope.$eval(attrs.newsPack);
            }
        };
	}); 

	//this directive sets the class based on info about the post
	app.directive('applyClass', function() {
  	    return function(scope, element, attrs) {

  	    	//data is set as an attr on the element
  	    	var title = attrs.title;
  	    	var ups = attrs.ups;
  	    	var selfText = attrs.selfText;

  	    	//get rid of the gruff
  	    	title = title.replace(/(^\s*)|(\s*$)/gi,"");
			title = title.replace(/[ ]{2,}/gi," ");
			title = title.replace(/\n /,"\n");
			var titleLength = title.split(' ').length;

			if (selfText) {
				selfText = selfText.replace(/(^\s*)|(\s*$)/gi,"");
				selfText = selfText.replace(/[ ]{2,}/gi," ");
				selfText = selfText.replace(/\n /,"\n");
				var selfTextLength = selfText.split(' ').length;
			};

			//Add classes to make the divs bigger based on if they are popular or have long titles or long selfTexts
  	    	if (ups > 3000) {
				element.addClass('w-2'); 
			};

			if (ups > 4000) {
				element.addClass('h-2'); 
			};

			if (selfTextLength > 20) {
				element.addClass('h-2'); 
			};

			if (selfTextLength > 50) {
				element.addClass('w-2'); 
			};

			if (titleLength > 10) {
				element.addClass('w-2'); 
			};

			if (titleLength > 20) {
				element.addClass('h-2'); 
			};
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