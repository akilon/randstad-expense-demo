(function() {
    'use strict';

    angular
        .module('app.expense')
        .run(appRun);

    appRun.$inject = ['routehelper']

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/expense',
                config: {
                    templateUrl: 'app/expense/expense.html',
                    controller: 'Expense',
                    controllerAs: 'vm',
                    title: 'expense',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> Expense'
                    }
                }
            },
            {
                url: '/expense/:id',
                config: {
                    templateUrl: 'app/expense/expense-item.html',
                    controller: 'ExpenseItem',
                    controllerAs: 'vm',
                    title: 'expense item'
                }
            },
        ];
    }
})();
