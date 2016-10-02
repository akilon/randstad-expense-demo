(function() {
    'use strict';

    angular
        .module('app.expense')
        .filter('propsFilter', propsFilter);

    propsFilter.$inject = ['items', 'props'];
    function propsFilter(items, props) {
        var out = [];

        if (angular.isArray(items)) {
        var keys = Object.keys(props);
            
        items.forEach(function(item) {
            var itemMatches = false;

            for (var i = 0; i < keys.length; i++) {
            var prop = keys[i];
            var text = props[prop].toLowerCase();
            if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                itemMatches = true;
                break;
            }
            }

            if (itemMatches) {
            out.push(item);
            }
        });
        } else {
        // Let the output be the input untouched
        out = items;
        }

        return out;
    };

    

    angular
        .module('app.expense')
        .controller('Expense', Expense);

    Expense.$inject = ['$scope', 'dataservice', 'logger'];
    /* @ngInject */
    function Expense($scope, dataservice, logger) {
        /*jshint validthis: true */
        var vm = this;
        vm.expenses = [];
        vm.title = 'Expenses';
        vm.showItems = false;
        vm.selectedExpenseId = '';
        vm.toggleItem = function(expense){
            vm.showItems = true;
            console.log(expense);
            //vm.selectedExpenseId = expense.id;
            $scope.$broadcast('render-expense-item', expense.id);
        };
        vm.personselected = '';
        vm.people = [
            { name: 'Adam',      email: 'adam@email.com',      age: 12, country: 'United States' },
            { name: 'Amalie',    email: 'amalie@email.com',    age: 12, country: 'Argentina' },
            { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
            { name: 'Adrian',    email: 'adrian@email.com',    age: 21, country: 'Ecuador' },
            { name: 'Wladimir',  email: 'wladimir@email.com',  age: 30, country: 'Ecuador' },
            { name: 'Samantha',  email: 'samantha@email.com',  age: 30, country: 'United States' },
            { name: 'Nicole',    email: 'nicole@email.com',    age: 43, country: 'Colombia' },
            { name: 'Natasha',   email: 'natasha@email.com',   age: 54, country: 'Ecuador' },
            { name: 'Michael',   email: 'michael@email.com',   age: 15, country: 'Colombia' },
            { name: 'Nicolás',   email: 'nicolas@email.com',    age: 43, country: 'Colombia' }
        ];

        activate();

        function activate() {
            return getExpenses().then(function() {
                logger.info('Activated Expenses View');
            });
        }

        function getExpenses() {
            return dataservice.getExpenses().then(function(data) {
                vm.expenses = data.expensesData;
                vm.glcodes = data.glcodes;
                return vm.expenses;
            });
        }
    }
})();
