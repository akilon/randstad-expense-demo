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
            getCurrency: getCurrency,

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
                    fxrate: 0.24185,
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
                    fxrate: 0.24185,
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
                    fxrate: 0.24185,
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
                    fxrate: 0.24185,
                    amountInRM: 100.00
                }
            ];

            return $q.when(items);
        };

        function getCurrency() {
            return $q.when($http.get('http://api.fixer.io/latest?base=MYR'));
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
