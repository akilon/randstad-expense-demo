(function() {
    'use strict';

    angular
        .module('app.expense')
        .directive('gridScreen', gridScreen);

    gridScreen.$inject = ['$http', 'dataservice'];
    function gridScreen($http, dataservice) {
        return {
            restrict: 'E',
            controller: gridScreenController,
            link: function(scope, element, attributes) {
                scope.$on('render-expense-item', function(e, expenseid) {
                    dataservice.getExpensesItem().then(function(data) {
                        scope.rows = data.filter(function(a){
                            return a.expenseId === expenseid;
                        });
                        scope.$broadcast('ready-to-render', scope.rows, scope.cols);
                    });
                });
            }
        };
    };

    gridScreenController.$inject = ['$scope','dataservice'];
    function gridScreenController($scope, dataservice){
        $scope.expense = {};
        
        this.setEditor = function(editor) {
            $scope.cols.unshift(editor);
        };
        this.setColumns = function(cols) {
            $scope.cols = cols;
        };
        $scope.save = function(item) {
            if (item) {
                dataservice.getExpenses().then(function(data) {
                    item.fxrate = data.currency.rates[item.currency];
                    item.amountInRM = (item.amount / item.fxrate).toFixed(2);
                    $('.grid-view ul').show();
                    $('.editor-row').remove();
                });
            } else {
                dataservice.getExpenses().then(function(data) {
                    //console.log('data',data);
                    if (!$scope.vm.selectedExpenseId) {
                        var id = data.expensesData.reduce(function(a, b){
                            return Math.max(a, b.id)
                        }, 0);
                        id = id + 1;
                        $scope.vm.expenses.push({
                            'id': id,
                            'name': 'Akilon',
                            'date': (new Date()).toISOString().substring(0, 10),
                            'total': '00.00'
                        });
                        $scope.vm.selectedExpenseId = id;
                    }
                    $scope.expense.fxrate = data.currency.rates[$scope.expense.currency];
                    $scope.expense.amountInRM = ($scope.expense.amount / $scope.expense.fxrate).toFixed(2);
                    $scope.rows.push(angular.copy($scope.expense));
                    $scope.expense = {};
                    $scope.expenseForm.$setPristine();
                    //$('#date').focus();
                });
            }
            
        };
    };



    angular
        .module('app.expense')
        .directive('gridColumns', gridColumns);

    gridColumns.$inject = [];
    function gridColumns() {
        return {
            restrict: 'E',
            require: ['^gridScreen', 'gridColumns'],
            controller: function() {
                var columns = [];
                this.addColumn = function(col) {
                    columns.push(col);
                };
                this.getColumns = function() {
                    return columns;
                };
            },
            link: function(scope, element, attributes, controllers) {
                var gridScreenController  = controllers[0];
                var gridColumnsController = controllers[1];
                gridScreenController.setColumns(gridColumnsController.getColumns());
            }
        };
    };



    angular
        .module('app.expense')
        .directive('gridColumn', gridColumn);

    gridColumn.$inject = [];
    function gridColumn() {
        return {
            restrict: 'E',
            require: '^gridColumns',
            link: function(scope, element, attributes, gridColumnsController) {
                gridColumnsController.addColumn({
                    title: attributes.title,
                    field: attributes.field,
                    type: attributes.type
                });
            }
        };
    };



    angular
        .module('app.expense')
        .directive('grid', grid);

    grid.$inject = [];
    function grid() {
        return {
            restrict: 'E',
            templateUrl: "app/expense/templates/as_table.html",
            replace: true,
            controller: gridController
        };
    };

    gridController.$inject = ['$scope'];
    function gridController($scope){
        $scope.$on('ready-to-render', function(e, rows, cols) {
            $scope.rows = rows;
            $scope.cols = cols;
        });
    }



    angular
        .module('app.expense')
        .directive('withInlineEditor', withInlineEditor);

    withInlineEditor.$inject = [];
    function withInlineEditor() {
        return {
            restrict: 'A',
            require: '^gridScreen',
            link: function(scope, element, attributes, gridScreenController) {
                gridScreenController.setEditor({
                    title: "Edit",
                    field: ""
                });
            }
        };
    };



    angular
        .module('app.expense')
        .directive('editorInitializer', editorInitializer);

    editorInitializer.$inject = ['$compile', '$templateRequest'];
    function editorInitializer($compile, $templateRequest) {
        return {
            restrict: 'E',
            templateUrl: 'app/expense/templates/editor_initializer.html',
            controller: editorInitializerController,
            link: function(scope, element, attributes) {
                scope.$on('edit', function(e, row) {
                    if ($('.grid-view ul').hasClass('editor-row')) return alert('Please save your work before editing a different item');
                    $('.grid-view ul').show();
                    $(element.parents("ul")).hide();
                    $('.editor-row').remove();
                    $templateRequest('app/expense/templates/editor.html').then(function(html){
                        var template = angular.element(html);
                        var editor = $compile(template)(scope);
                        $(editor).insertAfter(element.parents("ul"));
                    });
                });
            }
        };
    };

    editorInitializerController.$inject = ['$scope'];
    function editorInitializerController($scope){
        $scope.edit = function(row) {
            $scope.$broadcast('edit', row);
        };
        $scope.remove = function(row) {
            if(!confirm('Are you sure you want to delete this item?')) return;
            var index = $scope.rows.indexOf(row);
            $scope.rows.splice(index, 1);
        };
    };



    angular
        .module('app.expense')
        .directive('jqdatepicker', jqdatepicker);

    jqdatepicker.$inject = [];
    function jqdatepicker(){
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                element.datepicker({
                    dateFormat: 'DD, d  MM, yy',
                    onSelect: function (date) {
                        scope.date = date;
                        scope.$apply();
                    }
                });
            }
        };
    };

})();