(function() {
    'use strict';

    
    angular
        .module('app.expense')
        .controller('Expense', Expense);

    Expense.$inject = ['$scope', 'dataservice', 'logger'];
    /* @ngInject */
    function Expense($scope, dataservice, logger) {
        /*jshint validthis: true */
        var vm = this;
        vm.expenses = [];
        vm.glcodes = [];
        vm.currency = {};
        vm.currencyRates = {};
        vm.title = 'Expense';
        vm.showItems = false;
        vm.selectedExpenseId = '';

        

        vm.toggleItemPage = function(expense){
            vm.showItems = true;
            $scope.rows = [];
            vm.selectedExpenseId = '';
            if (expense) {
                $scope.$broadcast('render-expense-item', expense.id);
                vm.selectedExpenseId = expense.id;
            }
        };


        activate();

        function activate() {
            return getExpenses().then(function() {
                logger.info('Activated Expenses View');
            });
        }

        function getExpenses() {
            return dataservice.getExpenses().then(function(data) {
                vm.expenses = data.expensesData;
                vm.glcodes = data.glcodes.map(function(a){ return a.name;});
                vm.currency = Object.keys(data.currency.rates).map(function (key) { return key; });
                vm.currencyRates = data.currency;
                return vm.expenses;
            });
        }
    }
})();
