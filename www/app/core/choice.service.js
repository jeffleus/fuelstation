(function () {
    'use strict';

    angular.module('app.core')

    .service('ChoiceSvc', function ($http, $resource, ApiEndpoint) {
        var self = this;
        var apiUrl = 'https://rv3fgtr60d.execute-api.us-west-2.amazonaws.com/prod/choices';

        self.alphabetize = _alphabetize;
        self.choice = _choice;
        self.getAllChoices = _getAllChoices;
        self.getType = _getType;
		self.choiceTypes = _choiceTypes;
        self.fbShakeFilter = _fbShakeFilter;
        self.staffFilter = _staffFilter;
        self.initializeChoiceCategories = _initializeChoiceCategories;
        self.postWorkout = _postWorkout;
        self.preWorkout = _preWorkout;
        self.saveChoice = _saveChoice;
        self.snackOnly = _snackOnly;
        self.typeOptions = _typeOptions;
        self.updateChoice = _updateChoice;

        function _initializeChoiceCategories(choices) {
            var allChoices = choices.sort(self.alphabetize);
            self.snacks = self.snackOnly(allChoices);
            self.pre = self.preWorkout(allChoices);
            self.post = self.postWorkout(allChoices);
            self.fbShakes = self.fbShakeFilter(allChoices);
			self.staff = self.staffFilter(allChoices);
			
			self.types = self.choiceTypes(allChoices);
        }

        function _alphabetize(a, b) {
            if (a.name < b.name)
                return -1;
            else if (a.name > b.name)
                return 1;
            else
                return 0;
        }

        function _choice() {
            return {
                get: function(args) {
                    return $http.get(apiUrl + '/' + args.id)
                    .then(function(result){
                        return result.data.choices;
                    });
                },
                delete: function(args) {
                    return $http.delete(apiUrl + '/' + args.id);
                }
            };
        }

        function _getAllChoices() {
            //return $resource(ApiEndpoint.url + 'Choices', {});
            return $http.get(apiUrl)
                .then(function(result){
                    return result.data.choices;
                });
        }

        function _saveChoice(choice){
            return $http.post(apiUrl, choice);
        }

        function _updateChoice(choice){
            return $http.put(apiUrl, choice)
        }

        function _getType(type) {
            if (type === 0) {
                return "Snack only";
            } else if (type === 1) {
                return "Bars";
            } else if (type === 2) {
                return "Chips & Crackers";
            } else if (type === 3) {
                return "Dairy";
            } else if (type === 4) {
                return "Breakfast";
            } else if (type === 5) {
                return "Fruit";
            } else if (type === 6) {
                return "Specialty";
            } else {
				return "Type Not Listed";
			}
        }
		
		function _choiceTypes(data) {
			//group the choices by type and return as a dictionary
			return _.groupBy(data, 'type');
		}

        function _typeOptions() {
			
			var typeDict = {
				0: {
                    label: "Snack only",
                    value: 0
				}, 
				1: {
                    label: "Bars",
                    value: 1
            	}, 
				2: {
                    label: "Chips & Crackers",
                    value: 2
            	}, 
				3: {
                    label: "Dairy",
                    value: 3
            	}, 
				4: {
                    label: "Breakfast",
                    value: 4
            	}, 
				5: {
                    label: "Fruit",
                    value: 5
            	}, 
				6: {
                    label: "Specialty",
                    value: 6
            	}
			};
			
			return _.values(typeDict);
			
//            var opts = [
//                {
//                    label: "Snack only",
//                    value: 0
//            }, {
//                    label: "Pre",
//                    value: 1
//            }, {
//                    label: "Post",
//                    value: 2
//            }, {
//                    label: "FB Shake",
//                    value: 3
//            }
//            ];
//            return opts;
        }

        function _preWorkout(data) {
            return _.where(data, {
                type: 1
            });
        }

        function _postWorkout(data) {
            return _.where(data, {
                type: 2
            });
        }

        function _fbShakeFilter(data) {
            var fbShakes = _.where(data, {
                type: 3
            });
            return fbShakes;
        }

        function _staffFilter(data) {
            var staffItems = _.where(data, {
                isStaff: true
            });
            return staffItems;
        }

        function _snackOnly(data) {
            return _.where(data, {
                type: 0
            });
        }
    });
})();
