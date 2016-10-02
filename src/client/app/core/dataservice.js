(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$location', '$q', 'exception', 'logger'];

    /* @ngInject */
    function dataservice($http, $location, $q, exception, logger) {
        var isPrimed = false;
        var primePromise;

        var service = {
            getAvengersCast: getAvengersCast,
            getAvengerCount: getAvengerCount,
            getAvengers: getAvengers,
            getExpenses: getExpenses,
            getExpensesItem: getExpensesItem,
            getGLcodes: getGLcodes,

            ready: ready
        };

        return service;

        function getExpenses() {
            var sample = { 
                expensesData : [
                    { id: 1, name: 'Akilon', date: '2016-10-10', branch_code: '1A', bank_code: '123', bank_acc: '54321', bank_accholder: 'Akilon Krishnan', total: '00.00' },
                    { id: 2, name: 'Akilon', date: '2016-09-10', branch_code: '1A', bank_code: '123', bank_acc: '54321', bank_accholder: 'Akilon Krishnan', total: '00.00'  }
                ],
                glcodes : [
                    { id: 4165, name: 'Staff Reimbursement Mobile Claim - Mobile phone charges' },
                    { id: 4190, name: 'Postage' },
                    { id: 4191, name: 'Couriers' },
                    { id: 4200, name: 'Stationery' },
                    { id: 4311, name: 'International Fares - Oversea Air-ticket' },
                    { id: 4312, name: 'International Accomodation - Oversea hotel' },
                    { id: 4313, name: 'International Expenses - Oversea Transports and Meals Expense' },
                    { id: 4321, name: 'Local Fares - Taxi claim (client & candidate visit)' },
                    { id: 4001, name: 'Local Accomodation' },
                    { id: 4002, name: 'Local Expenses - OT meal' },
                    { id: 4003, name: 'Staff Incentives' },
                    { id: 4004, name: 'Staff flowers / Gifts - Gift / Bday cake for staff' },
                    { id: 4005, name: 'Candidate Flowers / Gifts - Meals with Candidates' },
                    { id: 4006, name: 'Entertainment - Clients (Meals with Client)' },
                    { id: 4007, name: 'Entertainment - Staff (Meals with Team / Staff)' },
                    { id: 4008, name: 'Subscriptions' },
                    { id: 4009, name: 'Memberships' }
                ]
            };
            return $q.when(sample);
        };

        function getExpensesItem(){
            var items = [
                {
                    id: 1,
                    expenseId: 1,
                    date: "2016-10-10",
                    costCenter: "1A",
                    glcode: "glcode",
                    desc: "Some Description",
                    currency: "USD",
                    amount: 100.00,
                    gst: 6,
                    fxrate: "",
                    amountInRM: 100.00
                },
                {
                    id: 2,
                    expenseId: 1,
                    date: "2016-10-10",
                    costCenter: "1A",
                    glcode: "glcode",
                    desc: "Some Description",
                    currency: "USD",
                    amount: 100.00,
                    gst: 6,
                    fxrate: "",
                    amountInRM: 100.00
                },
                {
                    id: 3,
                    expenseId: 2,
                    date: "2016-10-10",
                    costCenter: "1A",
                    glcode: "glcode",
                    desc: "Some Description2222",
                    currency: "USD",
                    amount: 100.00,
                    gst: 6,
                    fxrate: "",
                    amountInRM: 100.00
                },
                {
                    id: 4,
                    expenseId: 2,
                    date: "2016-10-10",
                    costCenter: "1A",
                    glcode: "glcode",
                    desc: "Some Description2222",
                    currency: "USD",
                    amount: 100.00,
                    gst: 6,
                    fxrate: "",
                    amountInRM: 100.00
                }
            ];

            return $q.when(items);
        };

        function getGLcodes(callback) {
            var result = [
                { id: 4165, name: 'Staff Reimbursement Mobile Claim - Mobile phone charges' },
                { id: 4190, name: 'Postage' },
                { id: 4191, name: 'Couriers' },
                { id: 4200, name: 'Stationery' },
                { id: 4311, name: 'International Fares - Oversea Air-ticket' },
                { id: 4312, name: 'International Accomodation - Oversea hotel' },
                { id: 4313, name: 'International Expenses - Oversea Transports and Meals Expense' },
                { id: 4321, name: 'Local Fares - Taxi claim (client & candidate visit)' },
                { id: 4001, name: 'Local Accomodation' },
                { id: 4002, name: 'Local Expenses - OT meal' },
                { id: 4003, name: 'Staff Incentives' },
                { id: 4004, name: 'Staff flowers / Gifts - Gift / Bday cake for staff' },
                { id: 4005, name: 'Candidate Flowers / Gifts - Meals with Candidates' },
                { id: 4006, name: 'Entertainment - Clients (Meals with Client)' },
                { id: 4007, name: 'Entertainment - Staff (Meals with Team / Staff)' },
                { id: 4008, name: 'Subscriptions' },
                { id: 4009, name: 'Memberships' }
            ];
            return $q.when(result);
        };

        /*
        function getExpensesItem(){
            var items = [
                {
                    "product": "Widget",
                    "description": "Amazing widgets of outstanding durability",
                    "cost": 20
                },
                {
                    "product": "Pants",
                    "description": "Slacks for an 80s dinner party",
                    "cost": 40
                },
                {
                    "product": "Cow",
                    "description": "Brilliant bovine",
                    "cost": 60
                }
            ];
            return $q.when(items);
        }
        */

        function getAvengers() {
            return $http.get('/api/maa')
                .then(getAvengersComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getAvengers')(message);
                    $location.url('/');
                });

            function getAvengersComplete(data, status, headers, config) {
                return data.data[0].data.results;
            }
        }

        function getAvengerCount() {
            var count = 0;
            return getAvengersCast()
                .then(getAvengersCastComplete)
                .catch(exception.catcher('XHR Failed for getAvengerCount'));

            function getAvengersCastComplete (data) {
                count = data.length;
                return $q.when(count);
            }
        }

        function getAvengersCast() {
            var cast = [
                {name: 'Robert Downey Jr.', character: 'Tony Stark / Iron Man'},
                {name: 'Chris Hemsworth', character: 'Thor'},
                {name: 'Chris Evans', character: 'Steve Rogers / Captain America'},
                {name: 'Mark Ruffalo', character: 'Bruce Banner / The Hulk'},
                {name: 'Scarlett Johansson', character: 'Natasha Romanoff / Black Widow'},
                {name: 'Jeremy Renner', character: 'Clint Barton / Hawkeye'},
                {name: 'Gwyneth Paltrow', character: 'Pepper Potts'},
                {name: 'Samuel L. Jackson', character: 'Nick Fury'},
                {name: 'Paul Bettany', character: 'Jarvis'},
                {name: 'Tom Hiddleston', character: 'Loki'},
                {name: 'Clark Gregg', character: 'Agent Phil Coulson'}
            ];
            return $q.when(cast);
        }

        function prime() {
            // This function can only be called once.
            if (primePromise) {
                return primePromise;
            }

            primePromise = $q.when(true).then(success);
            return primePromise;

            function success() {
                isPrimed = true;
                logger.info('Primed data');
            }
        }


        ready.$inject = ['nextPromises'];

        function ready(nextPromises) {
            var readyPromise = primePromise || prime();

            return readyPromise
                .then(function() { return $q.all(nextPromises); })
                .catch(exception.catcher('"ready" function failed'));
        }

    }
})();
