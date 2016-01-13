e2eApp.service('Helper', function($q, Place){

    var self = {
        manageUploader : function($scope, page){
            $scope.uploader.onAfterAddingAll = function(addedFileItems) {
                if(page == 'profile') {
                    $scope.user.profilePic = '/images/stuff/loading.gif'
                }
                else {
                    $scope.uploading = true;
                }

            };
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
                if(page == 'property') {
                    if(!$scope.propertyHasImages) {
                        $scope.slides.shift();
                    }
                    $scope.propertyHasImages = true;
                    $scope.property.asset.images.push(response.image);
                    $scope.slides.push({
                        image : response.image,
                        text : ''
                    });
                }
                else  if(page == 'profile') {
                    $scope.user.profilePic = response.image;
                }

            };

            $scope.uploader.onCompleteAll = function(e) {

                $scope.uploading = false;
            };
        }
    };

    return self;

})