function cycle(){
  $('.data-row:odd').addClass("even").removeClass("odd");
  $('.data-row:even').addClass("odd").removeClass("even");
}

$(document).ready(function(){
  $('#image').click(function(){
    $(this).hide();
  });
  $('#addrow').click(function(){
    $('#fakerow').before($('#fakerow').clone().show());
    cycle();
  });
  $('.cancel').click(function(){
    $(this).parents('tr').remove();
    cycle();
  });
});