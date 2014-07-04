$(function() {
    $('#new_ticket').S3Uploader(
        {
//            path: 'temp/images/',
            remove_completed_progress_bar: false,
//            progress_bar_target: $('.js-progress-bars'),
            before_add: function(file) {
                if (file.size > 10485760) {
                    alert('Maximum file size is 10 MB');
                    return false;
                } else {
                    return true;
                }
            }
        }
    );

    // error handling
    $('#new_ticket').bind('s3_upload_failed', function(e, content) {
        console.log(content.filename + ' failed to upload:' + content.error_thrown);
        return alert(content.filename + ' failed to upload:' + content.error_thrown);
    });
});