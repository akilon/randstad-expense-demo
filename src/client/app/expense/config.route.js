(function() {
    'use strict';

    angular
        .module('app.expense')
        .run(appRun);

    appRun.$inject = ['routehelper'];

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
                        nav: 2,
                        content: '<i class="fa fa-book"></i> Expense'
                    }
                }
            }
        ];
    }
})();
