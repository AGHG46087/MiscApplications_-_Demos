
var msie = AppUtils.isIE();
var active_num = -1;
var last_num = -1;
var show_thumb_number = false;
var slideshow_flag = false;
var timerID = undefined;
var tStart  = null;
var timeout = null;
var slideshow_time = 10;
var image_list = null;
var images_total = 0;
var create_thumbnails = false;
var active_id = null;
var max_image_width = 0;
var max_image_height = 0;

var base_url = './content/phpigallery/galleries/';
var gallery_dir = 'gallery';

function iGalleryCompleteHandler(originalRequest)
 {
   cleanupNodes();
   Behaviour.apply();
 }
function reloadGallery(iGalleryPathName,iGalleryName)
 {
   var iGalleryPath = "./content/phpigallery/content_iGallery.php";
   var parms = "thumbsContent=thumbs&iGalleryThumbs="+iGalleryPathName+"&iGalleryName="+iGalleryName;
   return ajaxRequest(iGalleryPath, showThumbnailsResponse, ajaxErrorHandler, parms);
 }
function getGalleryThumbnails(iGalleryThumbs, iGalleryName, element)
 {
   gallery_dir = AppUtils.trim(iGalleryName);
   iGalleryThumbs=base_url+gallery_dir;
   var iGalleryPath = "./content/phpigallery/content_iGallery.php";
   var parms = "thumbsContent=thumbs&iGalleryThumbs="+iGalleryThumbs+"&iGalleryName="+gallery_dir;
     // Ensure we call with the "iGalleryCompleteHandler" we do not want to exercise anything else. 
   return ajaxRequest(iGalleryPath, showThumbnailsResponse, ajaxErrorHandler, parms, iGalleryCompleteHandler);
 }
function showThumbnailsResponse(result)
 {
   var element = $("gallery_data");
   if ( element != null )
   {
     element.innerHTML = result.responseText;
     showToolsMenu();
   }
 }
function explodeThumbnailDetails(infoListNode)
 {

   var detailArray = null;
   if( infoListNode != null )
   {
     var thumbnailObj = infoListNode.innerHTML.substring();
     var tempArray = new Array();
     tempArray = thumbnailObj.split(';');

     if ( (thumbnailObj.length > 0) && ( tempArray.length > 4 ) )
     {
       detailArray = new Object();
       detailArray['image'] = tempArray[0];
       detailArray['name'] = imageName(tempArray[1]);
       detailArray['width'] = tempArray[2];
       detailArray['height'] = tempArray[3];
       detailArray['thumb'] = tempArray[4];
     }
   }
   
   return detailArray;
 }

function zero(num)
 {
   if (num < 10)
   {
     num = '0'+num;
   }
   return num;
 }
function nextImageSlideshow()
 {
   var n = ((Math.floor(active_num)+1)<image_list.length) ? Math.floor(active_num)+1 : 0;
   getImage(n, image_list[n]['image'], image_list[n]['name']);

   
   startTimer();
 }
	
function firstImageSlideshow()
 {
   var n = Math.floor(active_num);
   n = (n < 0) ? 0 : n;
		
   getImage(n, image_list[n]['image'], image_list[n]['name']);
		
   startTimer();
 }
function updateTimer()
 {
   if(timerID)
   {
     clearTimeout(timerID);
     clockID  = 0;
   }
   
   if(!tStart)
   {
     tStart = new Date();
   }
   
   var tDate = new Date();
   var tDiff = tDate.getTime() - tStart.getTime();
   
   tDate.setTime(tDiff);
   
   innerhtml("time",zero(slideshow_time-tDate.getSeconds())+" seconds");
   
   timerID = setTimeout("updateTimer()", 1000);
 }
function startTimer()
 {
   clearTimeout(timerID);
   clearTimeout(timeout);
   
   tStart = new Date();
   innerhtml("time",zero(slideshow_time)+" seconds");
   
   updateTimer();
   
   timeout = setTimeout("nextImageSlideshow();", 1000*slideshow_time);
 }
function startSlideshow()
 {
   changeSlideshowTime($("slideshowTimeSelect"));
     // do we even have a single image available, test it and move on
   var list = $('list_0');
   if( list == null )
   { // Figures, there is a bozo in every space of the internet - let him know
     var classOfWindow = AppUtils.getClassOfWindow();
     AppUtils.openThemeDialog(classOfWindow, "Select a Gallery before starting slideshow", true);
     return;
   }
     // We are good, release the hounds
   if (!slideshow_flag)
   {
     clearTimeout(timerID);
     clearTimeout(timeout);
     timeout = null;
     innerhtml("toggle_show","pause slideshow");
     firstImageSlideshow();
     slideshow_flag = true;
   }
   else
   {
     if (timerID) clearTimeout(timerID);
     if (timeout) clearTimeout(timeout);
     timeout = null;
     innerhtml("toggle_show","resume slideshow");
     slideshow_flag = false;
   }
   display("msc_image",'block');
   display("timer",'block');
 }
	
function changeSlideshowTime(obj) {
  slideshow_time = obj.value;
}

function prevImage()
 {
   var p = (Math.floor(active_num)>=0) ? Math.floor(active_num)-1 : -1;
		
   if (p >= 0)
   {
     getImage(p, image_list[p]['image'], image_list[p]['name']);
     setupPreloadOfNextAvailableImage(p, -1)
   }
   if (slideshow_flag)
   {
     startTimer();
   }
     
 }
function nextImage()
 {
   var n = ((Math.floor(active_num)+1)<image_list.length) ? Math.floor(active_num)+1 : false;
		
   if (n != false)
   {
     getImage(n, image_list[n]['image'], image_list[n]['name']);
   }
   if (slideshow_flag)
   {
     startTimer();
   }
 }
function closeImageWin()
 {
   enableDockBar();
   
   active_img = '';
		
   if (slideshow_flag)
   {
     if (timerID) clearTimeout(timerID);
     if (timeout) clearInterval(timeout);
     active_num = 0;
     slideshow_flag = false;
   }
   $('thumbs_ul').style.opacity=1;
   display('timer','none');
   display('msc_image','none');
		
		
   innerhtml('img','');
   innerhtml('image_title','');
   innerhtml('nav_thumbs','');
 }
function showToolsMenu()
 {
   
   var element = $("utilities");
   if (element.style.display != 'block')
   {
     innerhtml('toolshowhide',"Hide tools");
     display('utilities','block');
   }
 }
function toolToggle()
 {
   var obj = $('utilities');
   if (obj.style.display == 'block')
   {
     innerhtml('toolshowhide', "Show tools");
     display('utilities','none');
   }
   else
   {
     innerhtml('toolshowhide',"Hide tools");
     display('utilities','block');
   }
 }
function imageName(img)
 {
   var n = img.split('/');
   var name = n[n.length-1];
   if (!show_thumb_number) name = name.replace(/^[0-9]*_/g,"");
   name = name.replace(/\_/g," ").replace(/\-/g," - ");
   name = name.replace(/\.[A-Za-z0-9]*$/g,"");
   
   return name;
 }
function checkNavigation(num)
 {
   var n = Math.floor(num);
   
   var i_prev = (n>0) ? 'inline' : 'none';
   
   var i_next = ((n+1)<image_list.length) ? 'inline' : 'none';
   
   display('a_prev',i_prev);
   display('a_next',i_next);
 }

function innerhtml(id, content)
 {
   var tempNode = $(id);
   if ( tempNode != null )
   {
     if ( content == null )
     {
       content = "NULL Content Data for id=["+id+"]";
     }
     tempNode.innerHTML = content;
   }
 }

function display(id, flag)
 {
   var tempNode = $(id);
   if ( tempNode != null )
   {
     tempNode.style.display = flag;
   }
 }

function getImage(index, imageSrc, imgName)
 {
   if( 0 <= index )
   {
     setupPreloadOfNextAvailableImage(index, 1);
     
     display('img','block');
     active_id = imageSrc;
//     var imgPath =  base_url+gallery_dir+"/"+active_id+"/"+img;
//     var imgPath = base_url + imageSrc.substring(imageSrc.indexOf('/')+1);
     var imgPath = base_url+gallery_dir+"/"+ imageSrc.substring(imageSrc.indexOf('/')+1);
		
     var imgload = '';
     imgload += '<div id="loaddiv"><img id="loadimg" src="'+imgPath+'" /> <br/><strong>'+imageName(imgName)+'</strong></div>';
			
     innerhtml('img',imgload);
		
     var loadobj = $('loaddiv');
     loadobj.style.display = 'block';
		
     active_num = Math.floor(index);
		
       //// thumbnail handling
     var anchor = $('thimg_'+index);
     var list = $('list_'+index);
		
     var l_anchor = $('thimg_'+last_num);
     var l_list = $('list_'+last_num);

     list.className = 'selected';
		
     if (last_num && last_num != active_num)
     {
       if ( l_list != null )
       {
         l_list.className = 'visited';
       }
     }
		
     last_num = index;
		
       //// image title scripts
     var load_cont = '<small>loading image: <strong>'+imageName(imgName)+'</strong>...</small>';
		
     innerhtml('image_title',load_cont);
		
       //// relocate msc_image
     var msc_image = $('msc_image');
     if (!msie) msc_image.style.position = 'fixed';

       // Show it
     display('msc_image','block');

       // Which arrows do we render now?
     checkNavigation(index);

     var imageDataNode = $("thumbInfoList_"+index);
     if( imageDataNode != null )
     { // Update image to resize and position according to window dimensions and image actual
       var imageData = "";
       imageData = imageDataNode.innerHTML.substring();
       updateImage(index, imageData);
     }
     
       // Lets hide the main navigation for a moment. - remember to undo this in closeImageWin()
     disableDockBar();
     
     var pageSize = AppUtils.getPageSize();
     var bg_div = $('image_bg');
     bg_div.style.width = pageSize.windowWidth+"px";
     bg_div.style.height = (pageSize.windowHeight + 200)+"px";
   }
   else
   {
     alert("element is null");
   }
 }
	
function updateImage(index, result)
 {

   var output = null;
   if ( image_list[index] != null )
   {
     output = image_list[index];
   }
   else
   {
     output = explodeThumbnailDetails(result);
   }
   var num = index;
   var img = output['image'];
   var name = output['name'];
   var w = Math.floor(output['width']);
   var h = Math.floor(output['height']);
   var imgPath = base_url+gallery_dir+"/"+ img.substring(img.indexOf('/')+1);
   
		
   var nw = w;
   var nh = h;
   var link = false;
		
   var iname = '<strong>'+imageName(name) +'</strong> <small>'+w+'x'+h+'px (loading '+num+' of '+images_total+')</small>';
			
   var imgout = '';
		
     //// size code
		
   setMaxSizes();
		
   var resized_img = false;
		
   if (nh > max_image_height)
   {
     nh = max_image_height;
     nw = Math.round((w*max_image_height)/h);
     if (nw > max_image_width)
     {
       dw = nw;
       dh = nh;
       nw = max_image_width;
       nh = Math.round((dh*max_image_width)/dw);
     }
     resized_img = true;
   }
		
   var img_maxsize = (nh > nw) ? nh : nw;
   var fw = nw;
   var fh = nh;
		
   var imgdiv = $('img');
   imgdiv.style.width = Math.round(nw+18)+'px';
   imgdiv.style.height = Math.round(nh+18)+'px';
		
   imgout = '<img id="mainimg" class="imagen" src="'+imgPath+'"  width="'+fw+'" height="'+fh+'" title="'+name+'" alt="'+name+'" />';
   imgout += '<p><a href="'+imgPath+'" target="_blank"><small>Full Image new window</small></a></p>';
   
     //// set image source
   innerhtml('img', imgout);
		
     //// set image title
   innerhtml('image_title', iname);
		
     //// create nav thumbs
   getNavThumbs();
 }
function setupPreloadOfNextAvailableImage(index, direction)
 {
   if ( 0 <= index  )
   {
     var nextIndex = 0;
     if ( direction != null && direction < 0 )
     { // if moving prev, prev index is previous in list, or the end  of list if we reach start
       nextIndex = ((index - 1) >= 0 ) ? (index - 1) : (images_total-1);
     }
     else
     { // If moving next, next index is next in list, or start of list if we reach the end
       nextIndex = ((index + 1) < images_total) ? (index + 1) : 0;
     }

     if ( image_list != null )
     { // We do have our imagelist lets continue
       var imageSrc = image_list[nextIndex]['image'];
       var imgPath = base_url+gallery_dir+"/"+ imageSrc.substring(imageSrc.indexOf('/')+1);
       var imgload = '';
       imgload += '<img id="img_preload" class="bhv_Invisible" src="'+imgPath+'" />';
			
       innerhtml('hidden_preload',imgload);
     }
     
   }
 }
function setMaxSizes()
 {
   
   var pageSize = AppUtils.getPageSize();
   var imageOff = (msie) ? 220 : 190;
   var obj = $('timer');
   if (obj.style.display == 'block')
   { // Make the offset a little bigger(picture smaller) if the timer is displayed
     // this is needed if we want the link at the bottom of the picture to be displayed to users.
     imageOff += 16;
   }
		
   max_image_width = Math.floor(pageSize.widowWidth - 100);
   max_image_height = Math.floor(pageSize.windowHeight - imageOff);
 }
	
	
function getNavThumbs() {
  innerhtml('nav_thumbs','');

  var outimg = "";
  var n = 0;
  var num = ((Math.floor(active_num)-1)>=0) ? Math.floor(active_num)-1 : false;
			
  while (n<5)
  {
    if (num !== false)
    {
      if (num<image_list.length)
      {
        if (image_list[num]['image'])
        {
          var oimage = image_list[num]['image'];
          var oname = image_list[num]['name'];

          outimg += '<div id="navthumb" title="'+oname+'"><a href="javascript:;" ';
          outimg += 'onclick="getImage('+num+',\''+oimage+'\',\''+oname+'\'); return false;">';
          outimg += '&nbsp;<img class="';
          outimg += (num==(active_num)) ? 'sel' : 'th';
          outimg += '" src="';

            // This section although thumbnails ( minitures ), we may be using the
            // original image, the sizing here is specified in CSS
            // a img.th
          if ( parseInt(image_list[num]['thumb'],10) > 0 ) // any positive number will do
          { // We have a thumbnail already for us, use this it will be smaller && faster
            outimg += base_url+gallery_dir+'/_thumbnails/'+ oimage+'" />&nbsp;</a></div>';
          }
          else
          { // No thumbnail available use original image
            outimg += base_url+gallery_dir+'/'+ oimage+'" />&nbsp;</a></div>';
          }
        }
        num++;
        n++;
					
      }
      else
      {
        outimg += '<div id="navthumb">';
        outimg += '&nbsp;<img class="th" src="images/spacer.gif" width="44" height="44" />&nbsp;';
        outimg += '</div>';
        num++;
        n++;
      }
    }
    else
    {
      num++;
      continue;
    }
  }
		
  innerhtml('nav_thumbs',outimg);
}
function processHidenThumbDataInfo(element)
 {
   if ( isDebugMode() )
   {
     console.info("Gallery: Debug");
       // debugger;
   }
   image_list = null; // dispose 
   image_list = new Array();
   var count = 0;
   var index = 0;
   do
   {
     var tempDetail = null;
     var tempNode = $("thumbInfoList_" + count);
     tempDetail = explodeThumbnailDetails(tempNode);
     if( tempDetail != null )
     {
       image_list[index++] = tempDetail;
     }
     count++;
   }while( tempDetail != null );
     // Assign the total number of images
   images_total = image_list.length;
}
var my_iGallery_rules = {
  'span.galleryRules' : function(element){
  },
  '.hidden_thumbdata' : function(element){
    processHidenThumbDataInfo(element);
  },
  '#bar' : function(element){
      // Has a Javascript pair to be evaluated
    element.onclick = function(){
    };
  }
};

Behaviour.register(my_iGallery_rules);

  
