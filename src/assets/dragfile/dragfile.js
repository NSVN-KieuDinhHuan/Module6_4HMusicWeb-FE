
function readURLAudio(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $(".image-upload-wrap-audio").hide();

      $(".file-upload-audio").attr("src", e.target.result);
      $(".file-upload-content-audio").show();

      $(".image-title-audio").html(input.files[0].name);
    };

    reader.readAsDataURL(input.files[0]);
  } else {
    removeUploadAudio();
  }
}

function removeUploadAudio() {
  $(".file-upload-input-audio").replaceWith($(".file-upload-input-audio").val(""));
  $(".file-upload-content-audio").hide();
  $(".image-upload-wrap-audio").show();
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $(".image-upload-wrap").hide();

            $(".file-upload-image").attr("src", e.target.result);
            $(".file-upload-content").show();

            $(".image-title").html(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        removeUpload();
    }
}

function removeUpload() {
    $(".file-upload-input").replaceWith($(".file-upload-input").val(null));
    $(".file-upload-content").hide();
    $(".image-upload-wrap").show();
}

$(".image-upload-wrap").bind("dragover", function () {
    $(".image-upload-wrap").addClass("image-dropping");
});
$(".image-upload-wrap").bind("dragleave", function () {
    $(".image-upload-wrap").removeClass("image-dropping");
});
