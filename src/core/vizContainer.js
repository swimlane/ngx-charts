import d3 from 'd3';
import {throttle, debounce} from 'common/utils/throttle.js';

export function vizContainer($timeout, $window, $state) {
  "ngInject";

  var link = function ($scope, element, attrs) {
    "ngInject";
    $scope.element = element;

    $scope.pointClick = function (data) {
      if ($state.current.title !== 'Search'){
        // if not on the search page, go to the search page and open the report
        $state.go('search', { appId: $scope.statsReport.report.applicationIds[0], reportId: $scope.statsReport.report.id, filterData: data, searchData: $scope.statsReport.data, originalData: $scope.statsReport.originalData });
      } else {
        $scope.statsReport.addFilter.call($scope.statsReport, data);
      }
    };

    $scope.vizType = null;

    var displayMessage = function(msg) {
      $scope.statusMessage = msg;
    };

    var update = debounce(function() {
      displayMessage('Loading');
      $timeout(function () {
        $scope.statsReport.fetch().then(function (data) {
          updateChart(data);
        }, function (error) {
          displayMessage(error);
        });
      });
    }, 150);

    var updateChart = function(data) {
      let chart = $scope.statsReport.report.chartOptions.chartType;
      let error = chart.countError(data);

      if (data.dataLength === 0) {
        displayMessage('No data to be displayed.');
        return;
      }

      if (error === null) {
        $scope.results = data;
        $scope.statsReport.data = data;
        $scope.vizType = chart.id;
        $scope.statusMessage = undefined;
      } else {
        displayMessage(error);
      }
    };

    var resizeFn = debounce(function (ev) {
      resizeToParent();
    }, 100);

    var resizeToParent = function(){
      let height = 0;
      let width = 0;
      let el = $scope.element.parent().parent();
      let parentDims = el[0].getBoundingClientRect();
      height = parentDims.height;
      width = parentDims.width;
      $scope.view[0] = width;
      $scope.view[1] = Math.max(0, height - 25);

      if ($scope.miniChart){
        $scope.view[0] = $scope.view[0]*4;
        $scope.view[1] = $scope.view[1]*4;
      }
    }

    $timeout(resizeToParent, 100);

    // $scope.$watch('statsReport.report.groupBys', update, true);
    // $scope.$watch('statsReport.report.aggregates', update, true);
    $scope.$watch('statsReport.query.dimensions', function(newVal, oldVal){
      // Don't update on open/close group by dropdown
      let shouldUpdate = true;
      if (newVal.length == oldVal.length){
        for (var i = 0; i < newVal.length; i++) {
          if (newVal[i].opened == true && oldVal[i].opened == false){
            shouldUpdate = false;
          }
        };

        if (!newVal[0] || newVal[0].field.fieldType !== 'date' || newVal[0].groupByType.value != 'groupBy'){
          $scope.statsReport.report.chartOptions.zoom = false;
        } else {
          $scope.statsReport.report.chartOptions.sort.directionD0 = 'labelAscending';
          $scope.statsReport.report.chartOptions.sort.directionD1 = 'labelAscending';
        }
      }

      if (shouldUpdate){
        $scope.preventTriggerOnSort = true;
        update();
      }
    }, true);
    $scope.$watch('statsReport.query.measures', function(newVal, oldVal){
      // Don't update on open/close group by dropdown
      let shouldUpdate = true;
      if (newVal.length == oldVal.length){
        for (var i = 0; i < newVal.length; i++) {
          if (newVal[i].opened == true && oldVal[i].opened == false){
            shouldUpdate = false;
          }
        };
      }

      if (shouldUpdate){
        $scope.preventTriggerOnSort = true;
        update();
      }
    }, true);
    $scope.$watch('statsReport.report.chartOptions.sort', function(newVal, oldVal){
      if (newVal && !$scope.preventTriggerOnSort){
        update();
      }
      $scope.preventTriggerOnSort = false;
    }, true);
    $scope.$watch('statsReport.report.chartOptions.showOtherGroup', function(newVal, oldVal){
      $scope.preventTriggerOnSort = true;
      update();
    }, true);
    $scope.$watch('statsReport.report.chartOptions.chartType', function(newVal, oldVal){
      if (typeof(newVal) === 'object'){
        $scope.preventTriggerOnSort = true;
        update();
      }
    }, true);
    $scope.$watch('statsReport.report.filters', function(newVal, oldVal){
      $scope.preventTriggerOnSort = true;
      update();
    }, true);

    angular.element($window).bind('resize', resizeFn);
  };

  return {
    restrict: 'AE',
    replace: true,
    scope: {
      statsReport: '=',
      view: '=',
      miniChart: '='
    },
    templateUrl: 'common/components/visualizations/viz.tpl.html',
    link: link
  };

}
