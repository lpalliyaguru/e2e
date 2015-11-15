e2eApp.service('Helper', function($q, Place){

    var self = {
        manageUploader : function(uploader, $scope){
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
            uploader.onCompleteItem = function(fileItem, response, status, headers) {
                if(!$scope.propertyHasImages) {
                    $scope.slides.shift();
                }
                $scope.propertyHasImages = true;
                $scope.slides.push({
                    image : response.image,
                    text : ''
                });
            };

            uploader.onCompleteAll = function(e) {


            };
        }
    };

    return self;

})