$(function() {
/* file uploader */
    $('#s3_uploader').S3Uploader(
        {
            remove_completed_progress_bar: true,
            progress_bar_target: $('.js-progress-bars'),
            before_add: function(file) {
                if (file.size > 10485760) {
                    alert('Maximum file size is 10 MB');
                    return false;
                } else if(file.type.split('/')[0] !== "image" ){           //  file.type = "image/png", "video/avi", etc
                    alert('Invalid file type. We only accept image formats JPG, GIF, BMP and PNG.');
                    return false;
                } else {
                    return true;
                }
            }
        }
    )

    // error handling
        .bind('s3_upload_failed', function(e, content) {
        return alert(content.filename + ' failed to upload:' + content.error_thrown);
    })
    // callback
        .bind("s3_upload_complete", function(e, content) {
        var txt = "![Image of "+ content.filename + "](" + content.url + ")";
        var textarea = $("#ticket_description");
        textarea.val(textarea.val() + "\n" + txt);
    });


    $('#select_file').on('click',function(){
        $('#s3_uploader').children("#file").click();
    });


/*    drag and drop to textarea  */
    var obj = $(".dragandrophandler");
    obj.on('dragenter', function (e)
    {
        e.stopPropagation();
        e.preventDefault();
        $(this).css('border', '2px solid #0B85A1');
    });
    obj.on('dragover', function (e)
    {
        e.stopPropagation();
        e.preventDefault();
    });
    obj.on('drop', function (e)
    {

        $(this).css('border', '2px dotted #0B85A1');
        e.preventDefault();
        var files = e.originalEvent.dataTransfer.files;

        //pass these files to file uploader
        $("#file").val(files)
    });
});