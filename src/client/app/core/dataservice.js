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
            getExpenses: getExpenses,
            getExpensesItem: getExpensesItem,
            getCurrency: getCurrency,

            ready: ready
        };

        return service;

        function getExpenses() {
            var sample = { 
                expensesData : [
                    { id: 1, name: 'Akilon', date: '2016-10-10', branch_code: '1A', bank_code: '123', bank_acc: '54321', bank_accholder: 'Akilon Krishnan', total: '00.00' },
                    { id: 2, name: 'Akilon', date: '2016-11-15', branch_code: '1A', bank_code: '123', bank_acc: '54321', bank_accholder: 'Akilon Krishnan', total: '00.00'  }
                ],
                glcodes : [
                    { id: 4165, name: 'Mobile' },
                    { id: 4190, name: 'Postage' },
                    { id: 4191, name: 'Couriers' },
                    { id: 4200, name: 'Stationery' },
                    { id: 4311, name: 'Intl. Fares' },
                    { id: 4312, name: 'Intl. Hotel' },
                    { id: 4313, name: 'Intl. Expenses' },
                    { id: 4321, name: 'Local Fares' },
                    { id: 4001, name: 'Local Hotel' },
                    { id: 4002, name: 'Local Expenses' },
                    { id: 4003, name: 'Staff Incentives' },
                    { id: 4004, name: 'Staff Gifts' },
                    { id: 4005, name: 'Candidate Gifts' },
                    { id: 4006, name: 'Ent - Clients' },
                    { id: 4007, name: 'Ent - Staff' },
                    { id: 4008, name: 'Subscriptions' },
                    { id: 4009, name: 'Memberships' }
                ],
                currency: {
                    "base": "MYR",
                    "date": "2016-09-30",
                    "rates": {
                            "AUD": 0.31761,
                            "BGN": 0.42381,
                            "BRL": 0.78465,
                            "CAD": 0.31832,
                            "CHF": 0.23568,
                            "CNY": 1.6136,
                            "CZK": 5.8553,
                            "DKK": 1.6147,
                            "GBP": 0.18658,
                            "HKD": 1.8754,
                            "HRK": 1.63,
                            "HUF": 67.13,
                            "IDR": 3156.4,
                            "ILS": 0.91003,
                            "INR": 16.115,
                            "JPY": 24.506,
                            "KRW": 266.48,
                            "MYR": 1,
                            "MXN": 4.7107,
                            "NOK": 1.9473,
                            "NZD": 0.33304,
                            "PHP": 11.705,
                            "PLN": 0.93595,
                            "RON": 0.96509,
                            "RUB": 15.28,
                            "SEK": 2.0848,
                            "SGD": 0.33013,
                            "THB": 8.385,
                            "TRY": 0.72757,
                            "USD": 0.24185,
                            "ZAR": 3.3639,
                            "EUR": 0.21669
                        }
                    }
            };
            return $q.when(sample);
        };
/*
{ id: 4165, name: 'Mobile' },
{ id: 4190, name: 'Postage' },
{ id: 4191, name: 'Couriers' },
{ id: 4200, name: 'Stationery' },
{ id: 4311, name: 'Intl. Fares' },
{ id: 4312, name: 'Intl. Hotel' },
{ id: 4313, name: 'Intl. Expenses' },
{ id: 4321, name: 'Local Fares' },
{ id: 4001, name: 'Local Hotel' },
{ id: 4002, name: 'Local Expenses' },
{ id: 4003, name: 'Staff Incentives' },
{ id: 4004, name: 'Staff Gifts' },
{ id: 4005, name: 'Candidate Gifts' },
{ id: 4006, name: 'Ent - Clients' },
{ id: 4007, name: 'Ent - Staff' },
{ id: 4008, name: 'Subscriptions' },
{ id: 4009, name: 'Memberships' }
*/

        function getExpensesItem(){
            var items = [
                {
                    id: 1,
                    expenseId: 1,
                    date: "10/10/2016",
                    costCenter: "1A",
                    glcode: "Stationery",
                    desc: "Marker Pens for whiteboard",
                    currency: "USD",
                    amount: 20.00,
                    gst: 6,
                    fxrate: 0.24185,
                    amountInRM: 100.00
                },
                {
                    id: 2,
                    expenseId: 1,
                    date: "10/10/2016",
                    costCenter: "1A",
                    glcode: "Intl. Hotel",
                    desc: "Hotel stay in Cyberjaya",
                    currency: "USD",
                    amount: 100.00,
                    gst: 6,
                    fxrate: 0.24185,
                    amountInRM: 400.00
                },
                {
                    id: 3,
                    expenseId: 2,
                    date: "11/15/2016",
                    costCenter: "1A",
                    glcode: "Mobile",
                    desc: "Mobile claims for November",
                    currency: "USD",
                    amount: 100.00,
                    gst: 6,
                    fxrate: 0.24185,
                    amountInRM: 400.00
                },
                {
                    id: 4,
                    expenseId: 2,
                    date: "17/11/2016",
                    costCenter: "1A",
                    glcode: "Staff Gifts",
                    desc: "Staff birthday celebration",
                    currency: "USD",
                    amount: 50.00,
                    gst: 6,
                    fxrate: 0.24185,
                    amountInRM: 200.00
                },
                {
                    id: 5,
                    expenseId: 2,
                    date: "11/20/2016",
                    costCenter: "1A",
                    glcode: "Postage",
                    desc: "Post contract to client",
                    currency: "USD",
                    amount: 150.00,
                    gst: 6,
                    fxrate: 0.24185,
                    amountInRM: 600.00
                }
            ];

            return $q.when(items);
        };

        function getCurrency() {
            return $q.when($http.get('http://api.fixer.io/latest?base=MYR'));
        };


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
