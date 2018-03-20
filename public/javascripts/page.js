function showDiv(item, id) {
  $('.pagenav').removeClass('active');
  $(item).addClass('active');
  $('.pagemain').hide();
  $('#'+id).show();
}