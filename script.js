function cycle(){
  $('.data-row:odd').addClass("even").removeClass("odd");
  $('.data-row:even').addClass("odd").removeClass("even");
}
// from http://www.mediacollege.com/internet/javascript/number/round.html
function roundNumber(number,decimals) {
  var newString;// The new rounded number
  decimals = Number(decimals);
  if (decimals < 1) {
    newString = (Math.round(number)).toString();
  } else {
    var numString = number.toString();
    if (numString.lastIndexOf(".") == -1) {// If there is no decimal point
      numString += ".";// give it one at the end
    }
    var cutoff = numString.lastIndexOf(".") + decimals;// The point at which to truncate the number
    var d1 = Number(numString.substring(cutoff,cutoff+1));// The value of the last decimal place that we'll end up with
    var d2 = Number(numString.substring(cutoff+1,cutoff+2));// The next decimal, after the last one we want
    if (d2 >= 5) {// Do we need to round up at all? If not, the string will just be truncated
      if (d1 == 9 && cutoff > 0) {// If the last digit is 9, find a new cutoff point
        while (cutoff > 0 && (d1 == 9 || isNaN(d1))) {
          if (d1 != ".") {
            cutoff -= 1;
            d1 = Number(numString.substring(cutoff,cutoff+1));
          } else {
            cutoff -= 1;
          }
        }
      }
      d1 += 1;
    } 
    if (d1 == 10) {
      numString = numString.substring(0, numString.lastIndexOf("."));
      var roundedNum = Number(numString) + 1;
      newString = roundedNum.toString() + '.';
    } else {
      newString = numString.substring(0,cutoff) + d1.toString();
    }
  }
  if (newString.lastIndexOf(".") == -1) {// Do this again, to the new string
    newString += ".";
  }
  var decs = (newString.substring(newString.lastIndexOf(".")+1)).length;
  for(var i=0;i<decimals-decs;i++) newString += "0";
  //var newNumber = Number(newString);// make it a number if you like
  return newString; // Output the result to the form field (for your purpose)
}
//function update_total() {
//  var total = 0;
//  $('.price').each(function(i){
//    price = $(this).html().replace("$","");
//    if (!isNaN(price)) total += Number(price);
//  });
//
//  total = roundNumber(total,2);
//
//  $('#subtotal').html("$"+total);
//  $('#total').html("$"+total);
//  
//  update_balance();
//}
//
//function update_balance() {
//  var due = $("#total").html().replace("$","") - $("#paid").val().replace("$","");
//  due = roundNumber(due,2);
//
//  $('.due').html("$"+due);
//}
//
//function update_price() {
//  var row = $(this).parents('.item-row');
//  var price = row.find('.cost').val().replace("$","") * row.find('.qty').val();
//  price = roundNumber(price,2);
//  isNaN(price) ? row.find('.price').html("N/A") : row.find('.price').html("$"+price);
//  
//  update_total();
//}
//
//function bind() {
//  $(".cost").blur(update_price);
//  $(".qty").blur(update_price);
//}
function update_line () {
  var row = $(this).parents('.data-row');
  var linetotal_value =  row.find('.qty-value').val() * row.find('.price-value').val();
  linetotal_value = roundNumber(linetotal_value,2);
  row.find('.linetotal').val(linetotal_value);
  update_subtotal();
}
function update_subtotal () {
  var subtotal_value = 0;
  $('#data .linetotal').map(function(){
    if (!isNaN(parseFloat($(this).val()))) {
      subtotal_value += parseFloat($(this).val());
    }
  });
  subtotal_value = roundNumber(subtotal_value,2);
  $('#data #subtotal-value').val(subtotal_value);
  update_finaltotal();
}
function update_finaltotal () {  
  if (isNaN(parseFloat($('#data #tax-value').val()))) {
    var zero = 0;
    zero = roundNumber(zero,2);
    $('#data #tax-value').val(zero);
  }
  var finaltotal = parseFloat($('#data #subtotal-value').val()) + parseFloat($('#data #tax-value').val());
  finaltotal = roundNumber(finaltotal,2);
  $('#data #total-value').val(finaltotal);  
}
$(document).ready(function(){
  $('#image').click(function(){
    $(this).hide();
  });
  $('#addrow').click(function(){
    $('#fakerow').before($('#fakerow').clone().show());
    cycle();
    update_subtotal();
  });
  $('.cancel').live('click',function(){
    $(this).parents('tr').remove();
    cycle();
    update_subtotal();
  });
  $('#data .qty-value').live('blur',update_line);
  $('#data .price-value').live('blur',update_line);
  $('#data .linetotal').live('change',function(){
      update_subtotal(); 
  });
  $('#data #tax-value').live('change',function(){ 
    update_finaltotal();
  });
});
