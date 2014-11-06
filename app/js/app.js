(function () {
	var app = 
	/**
	* reddit Module
	*
	* This is the reddit module
	*/
	angular.module('reddit', ['angularMoment']);

	app.controller('RedditController', ['$http', '$scope', '$timeout', function($http, $scope, $timeout){
		var redditData = this;


		$http.get('http://www.reddit.com/.json').success(function (data) {
			console.log(data);
			// console.log(data.data.children[1].data.created);
			console.log(data.data.children.length);
			redditData.objs = data.data.children;
			console.log(redditData.objs);

		});



		 $scope.layoutDone = function() {
            //$('a[data-toggle="tooltip"]').tooltip(); // NOT CORRECT!
            $timeout(function() { 
            	console.log("Packing");
            	var pckry = new Packery(container, {
			                	itemSelector: '.item',
			                	gutter: 10
			                }) 
			}, 0); // wait...

        };

        this.myCount = 0;

        this.randomClass = function (numberOfRandom) {

        	var widthNames = ['r-w1', 'r-w2', 'r-w3'];
        	var heightNames = ['r-h1', 'r-h2', 'r-h3'];

        	var randomWidthKey = Math.floor(Math.random()*widthNames.length);
        	var randomHeightKey = Math.floor(Math.random()*heightNames.length);


        	var randomNum = Math.floor(Math.random() * (3 - 0)) + 0;

        	var myNum = 0;

        	this.myCount++;

        	var randomClass1 = "item " + widthNames[randomNum] + " " + heightNames[randomNum];

        	console.log(this.myCount);
        	console.log(randomClass1);
        	
        	// return "item r-h1 r-w1";
        	return randomClass1;

        }

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