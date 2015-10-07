$(function(){
    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', '');
    $('.tree li.parent_li > span').on('click', function (e) {
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            $(this).attr('title', '').find(' > i').addClass('glyphicon-plus').removeClass('glyphicon-minus');
        } else {
            children.show('fast');
            $(this).attr('title', '').find(' > i').addClass('glyphicon-minus').removeClass('glyphicon-plus');
        }
        e.stopPropagation();
    });
    
    $("span").click(function(){
    	$("span").removeClass("doc_selected");
    	$(this).addClass("doc_selected");
    	  });
});

$(document).ready(function(){
	changeHeaderNav('document');
	showDoc("1_1");
})

function SetCwinHeight(obj) 
{ 
var cwin=obj; 
if (document.getElementById) 
{ 
if (cwin && !window.opera) 
{ 
if (cwin.contentDocument && cwin.contentDocument.body.offsetHeight) 
cwin.height = cwin.contentDocument.body.offsetHeight + 20; //FF NS 
else if(cwin.Document && cwin.Document.body.scrollHeight) 
cwin.height = cwin.Document.body.scrollHeight + 10;//IE 
} 
else 
{ 
if(cwin.contentWindow.document && cwin.contentWindow.document.body.scrollHeight) 
cwin.height = cwin.contentWindow.document.body.scrollHeight;//Opera 
} 
} 
} 

function showDoc(docType){
	document.getElementById('ifrm').src="../views/doc/" + docType + ".html";
	
}