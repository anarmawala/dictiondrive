$('#keyWord-download').keyup(function(e) {
  $('#downloadSubmit').attr('href', ("/" + $('#keyWord-download').val()));
});

$("#downloadSubmit").click(function() {
  $('#down-modal').modal("hide")
});