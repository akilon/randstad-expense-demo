(function() {
    'use strict';

    angular
        .module('app.expense')
        .directive('gridScreen', gridScreen);

    gridScreen.$inject = ['$http', 'dataservice'];

    /* @ngInject */
    function gridScreen($http, dataservice) {
        return {
            restrict: 'E',
            controller: function($scope) {
            
                $scope.expense = {};

                // columns, editor
                this.setEditor = function(editor) {
                    $scope.cols.unshift(editor);
                };
                this.setColumns = function(cols) {
                    $scope.cols = cols;
                };
                
                $scope.save = function() {
                    $scope.rows.push(angular.copy($scope.expense));
                    $scope.expense = {};
                };

            },
            link: function(scope, element, attributes) {
                dataservice.getExpensesItem().then(function(data) {
                    
                    scope.rows = data;
                    console.log(scope.rows, scope.cols);
                    scope.$broadcast('ready-to-render', scope.rows, scope.cols);
                });
            }
        };
    };


 angular
        .module('app.expense')
        .directive('gridColumns', gridColumns);

    gridColumns.$inject = [];

    /* @ngInject */
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
                console.log('linked gridColumns');
            }
        };
    };


 angular
        .module('app.expense')
        .directive('gridColumn', gridColumn);

        gridColumn.$inject = [];
    /* @ngInject */
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
                console.log('linked gridColumn', attributes.title);
            }
        };
    };

     angular
        .module('app.expense')
        .directive('grid', grid);

grid.$inject = [];

    /* @ngInject */
    function grid() {
        return {
            restrict: 'E',
            templateUrl: "app/expense/templates/as_table.html",
            replace: true,
            controller: function($scope) {
                $scope.$on('ready-to-render', function(e, rows, cols) {
                    $scope.rows = rows;
                    $scope.cols = cols;
                    console.log('here',rows,cols);
                });
            }
        };
    };


     angular
        .module('app.expense')
        .directive('withInlineEditor', withInlineEditor);

withInlineEditor.$inject = [];

    /* @ngInject */
    function withInlineEditor() {
        return {
            restrict: 'A',
            require: '^gridScreen',
            link: function(scope, element, attributes, gridScreenController) {
                gridScreenController.setEditor({
                    title: "Edit",
                    field: ""
                });
                console.log('linked withInlineEditor');
            }
        };
    };

     angular
        .module('app.expense')
        .directive('editorInitializer', editorInitializer);

    withInlineEditor.$inject = ['$compile', '$templateRequest'];

    /* @ngInject */
    function editorInitializer($compile, $templateRequest) {
        return {
            restrict: 'E',
            templateUrl: 'app/expense/templates/editor_initializer.html',
            controller: function($scope) {
                $scope.edit = function(row) {
                    $scope.$broadcast('edit', row);
                };
                $scope.remove = function(row) {
                    if(!confirm('Are you sure you want to delete this item?')) return;
                    var index = $scope.rows.indexOf(row);
                    $scope.rows.splice(index, 1);
                };
            },
            link: function(scope, element, attributes) {
                scope.$on('edit', function(e, row) {
                    $('.editor-row').remove();
                    $templateRequest('app/expense/templates/editor.html').then(function(html){
                        // Convert the html to an actual DOM node
                        var template = angular.element(html);
                        // And let Angular $compile it
                        var editor = $compile(template)($scope);
                        $(editor).insertAfter(element.parents("tr"))

                    });
                });
            }
        };
    };

})();