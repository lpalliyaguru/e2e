e2eApp.service('Helper', function($q, Place){

    var self = {
        manageUploader : function($scope){
            /*uploader.onWhenAddingFileFailed = function(item /!*{File|FileLikeObject}*!/, filter, options) {
                console.info('onWhenAddingFileFailed', item, filter, options);
            };
            uploader.onAfterAddingFile = function(fileItem) {
                console.info('onAfterAddingFile', fileItem);
            };
            uploader.onAfterAddingAll = function(addedFileItems) {
                //uploader.uploadAll();
            };

            uploader.onProgressItem = function(fileItem, progress) {
                console.info('onProgressItem', fileItem, progress);
            };
            uploader.onProgressAll = function(progress) {
                console.info('onProgressAll', progress);
            };
            uploader.onSuccessItem = function(fileItem, response, status, headers) {
                console.info('onSuccessItem', fileItem, response, status, headers);
            };
            uploader.onErrorItem = function(fileItem, response, status, headers) {
                console.info('onErrorItem', fileItem, response, status, headers);
            };
            uploader.onCancelItem = function(fileItem, response, status, headers) {
                console.info('onCancelItem', fileItem, response, status, headers);
            };*/
            $scope.uploader.onCompleteItem = function(fileItem, response, status, headers) {
                if(!$scope.propertyHasImages) {
                    $scope.slides.shift();
                }
                $scope.propertyHasImages = true;
                console.log(response.image);
                $scope.property.images.push(response.image);
                $scope.slides.push({
                    image : response.image,
                    text : ''
                });
            };

            $scope.uploader.onCompleteAll = function(e) {


            };
        }
    };

    return self;

})