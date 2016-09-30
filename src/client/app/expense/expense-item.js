(function() {

    angular
        .module('app.expense')
        .controller('ExpenseItem', ExpenseItem);

    /* @ngInject */
    function ExpenseItem(dataservice, logger) {
        /*jshint validthis: true */
        var vm = this;
        vm.expenses = [];
        vm.title = 'Expenses';

        activate();

        function activate() {
            return getExpenses().then(function() {
                logger.info('Activated Expenses View');
            });
        }

        function getExpenses() {
            return dataservice.getExpenses().then(function(data) {
                vm.expenses = data;
                return vm.expenses;
            });
        }
    }
})();
