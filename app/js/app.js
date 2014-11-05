(function () {
	var app = 
	/**
	* reddit Module
	*
	* This is the reddit module
	*/
	angular.module('reddit', ['angularMoment']);

	app.controller('RedditController', ['$http', function($http){
		var redditData = this;

		redditData.objs = [];

		// this.objs = myData;

		$http.get('http://www.reddit.com/.json').success(function (data) {
			console.log(data);
			console.log(data.data.children[1].data.created);
			redditData.objs = data.data.children;
		});


	}]);

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

	var myData = [
			{
				name: "Landon",
				awesomeness: 5
			},
			{
				name: "Landon",
				awesomeness: 5
			},
			{
				name: "Landon",
				awesomeness: 5
			},
			{
				name: "Landon",
				awesomeness: 5
			},
			{
				name: "Landon",
				awesomeness: 5
			},
			{
				name: "Landon",
				awesomeness: 5
			}
		];

	

})();