var g_lastKey = 0;
var g_bold = false;
var g_italic = false;
var g_underline = false;

(function ($){
$('#cursor').attr('autocomplete', 'off');
$('#editor').bind('click', function(){$('#cursor').focus();});
$('#virtualCursor').bind('click', function(){$('#cursor').focus();});

var getStyleText = function(){
var innerStyleText = '';
if(g_bold){innerStyleText = innerStyleText + "font-weight: bold;";}
if(g_italic){innerStyleText = innerStyleText + "font-style: italic;";}
if(g_underline){innerStyleText = innerStyleText + "text-decoration: underline;";}

if(innerStyleText.length > 0)
{
return 'style="' + innerStyleText + '"';
}
else
{
return '';
}
}

// NOTE: Not sure this is necessary. - PS - 2010-11-07
$('#cursor').bind('keyup', function(event){
var keyCode = event.keyCode || -1;
var keyWhich = event.which || -1;
$('#keyup_theKeyCode').text(keyCode);
$('#keyup_theWhich').text(keyWhich);
$('#keyup_cursorText').text($('#cursor').text());
var keyValue = event.keyCode || event.which;
var text = null;
var textpoint = null;
if(keyValue >= 32)
{
}
else
{
switch(keyValue)
{
// NOTE: Backspace must be handled here. Only FF can handle it in keypress event. Everybody else in keyup. - PS - 2010-11-07
case 8:
{
var backelement = $('#displayCursor').prev();
if(backelement.length == 1)
{
backelement.remove();
textpoint = '';
}
}
break;
}
if(textpoint !== null)
{
if(textpoint.length > 0){$(textpoint).insertBefore('#displayCursor');}
g_lastKey = keyValue;
event.preventDefault();
event.stopPropagation();
}
}
//event.preventDefault();
//event.stopPropagation();
});

$('#cursor').bind('keypress', function(event){
var keyCode = event.keyCode || -1;
var keyWhich = event.which || -1;
$('#keypress_theKeyCode').text(keyCode);
$('#keypress_theWhich').text(keyWhich);
$('#keypress_cursorText').text($('#cursor').text());
var keyValue = event.keyCode || event.which;
var text = null;
var textpoint = null;
if(keyValue >= 32)
{
text = String.fromCharCode(keyValue);
var inlineStyle = getStyleText();
if(inlineStyle.length > 0)
{
  textpoint = '<span ' + inlineStyle + '>' + text + '</span>';
}
else
{
  textpoint = '<span>' + text + '</span>';
}
$(textpoint).insertBefore('#displayCursor');
g_lastKey = keyValue;
//event.preventDefault();
//event.stopPropagation();
}
else
{
switch(keyValue)
{
case 13:
if(g_lastKey !== 10){textpoint = '<br />';}
break;
case 10:
// TODO: This doesn't work on the iPod touch, for some reason. Don't know why. - PS - 2010-11-07
if(g_lastkey !== 13){textpoint = '<br />';}
break;
}
if(textpoint !== null)
{
if(textpoint.length > 0){$(textpoint).insertBefore('#displayCursor');}
g_lastKey = keyValue;
event.preventDefault();
event.stopPropagation();
}
}
return false;});

$('#bold').bind('click', function(){g_bold = $('#bold').attr('checked');$('#cursor').focus();});
$('#italic').bind('click', function(){g_italic = $('#italic').attr('checked');$('#cursor').focus();});
$('#underline').bind('click', function(){g_underline = $('#underline').attr('checked');$('#cursor').focus();});

$('#cursor').focus();
})(window.jQuery);