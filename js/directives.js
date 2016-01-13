e2eApp.directive('radio', function(){
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: function (tElement, tAttrs) {
            var more_class = tAttrs.class ? ' '+tAttrs.class : '';
            return '<label ng-transclude><input type="radio" ng-model="' + tAttrs.model
                + '" value="' + tAttrs.value + '"><div class="custom-radio'+ more_class +'"></div>'
        }
    }
});