/**
 * jQuery Embed Vimeo
 * Vimeo Embed
 *
 * @author      MarQuis Knox <hire@marquisknox.com>
 * @copyright   2015 MarQuisKnox.com
 * @link		http://marquisknox.com
 * @license     Public Domain
 *
 * @since  	    Thursday, January 08, 2015, 03:02 AM GMT+1
 * @modified    $Date$ $Author$
 * @version     $Id$
 *
 * @category    JavaScript
 * @package     jQuery Embed Vimeo
*/

(function($) {
    'use strict';

    $.fn.embedVimeo = function( options ) {
    	 var settings = $.extend({
    		// These are the defaults.
     	    urls: true,
    	    width: '100%',
    	    height: 345
    	 }, options );
    	 
        return this.each(function() {
            var $el				= $(this);
            var embeddedContent = _embed( $el, settings );

            $el.html( embeddedContent );
        });
    };

    function _embed( $el, options ) {
    	var elContent	= $el.html();			
    	var urlRegEx	= /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(.+)/g;
    	var matches;
			
		// Embed URLs
	    matches = elContent.match( urlRegEx );
	    if ( matches ) {
	        elContent = _embedUrls( matches, $el, options );
	    }

        return elContent;
    }
    
    function _getId( url ) {
        var regExp	= /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
        var match	= url.match( regExp );

        if ( match ) {
            return match[5];
        } else {
            return 'error';
        }
    } 
    
    function _str_replace(search, replace, subject, count) {
    	  //  discuss at: http://phpjs.org/functions/str_replace/
    	  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    	  // improved by: Gabriel Paderni
    	  // improved by: Philip Peterson
    	  // improved by: Simon Willison (http://simonwillison.net)
    	  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    	  // improved by: Onno Marsman
    	  // improved by: Brett Zamir (http://brett-zamir.me)
    	  //  revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    	  // bugfixed by: Anton Ongson
    	  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    	  // bugfixed by: Oleg Eremeev
    	  //    input by: Onno Marsman
    	  //    input by: Brett Zamir (http://brett-zamir.me)
    	  //    input by: Oleg Eremeev
    	  //        note: The count parameter must be passed as a string in order
    	  //        note: to find a global variable in which the result will be given
    	  //   example 1: str_replace(' ', '.', 'Kevin van Zonneveld');
    	  //   returns 1: 'Kevin.van.Zonneveld'
    	  //   example 2: str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars');
    	  //   returns 2: 'hemmo, mars'
    	  // bugfixed by: Glen Arason (http://CanadianDomainRegistry.ca)
    	  //   example 3: str_replace(Array('S','F'),'x','ASDFASDF');
    	  //   returns 3: 'AxDxAxDx'
    	  // bugfixed by: Glen Arason (http://CanadianDomainRegistry.ca) Corrected count
    	  //   example 4: str_replace(['A','D'], ['x','y'] , 'ASDFASDF' , 'cnt');
    	  //   returns 4: 'xSyFxSyF' // cnt = 0 (incorrect before fix)
    	  //   returns 4: 'xSyFxSyF' // cnt = 4 (correct after fix)
    	  
    	  var i = 0,
    	    j = 0,
    	    temp = '',
    	    repl = '',
    	    sl = 0,
    	    fl = 0,
    	    f = [].concat(search),
    	    r = [].concat(replace),
    	    s = subject,
    	    ra = Object.prototype.toString.call(r) === '[object Array]',
    	    sa = Object.prototype.toString.call(s) === '[object Array]';
    	  s = [].concat(s);
    	  
    	  if(typeof(search) === 'object' && typeof(replace) === 'string' ) {
    	    temp = replace; 
    	    replace = new Array();
    	    for (i=0; i < search.length; i+=1) { 
    	      replace[i] = temp; 
    	    }
    	    temp = ''; 
    	    r = [].concat(replace); 
    	    ra = Object.prototype.toString.call(r) === '[object Array]';
    	  }
    	  
    	  if (count) {
    	    this.window[count] = 0;
    	  }

    	  for (i = 0, sl = s.length; i < sl; i++) {
    	    if (s[i] === '') {
    	      continue;
    	    }
    	    for (j = 0, fl = f.length; j < fl; j++) {
    	      temp = s[i] + '';
    	      repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
    	      s[i] = (temp)
    	        .split(f[j])
    	        .join(repl);
    	      if (count) {
    	        this.window[count] += ((temp.split(f[j])).length - 1);
    	      } 
    	    }
    	  }
    	  return sa ? s : s[0];
    }
    

    // Embed any Vimeo URLs that are 
    // not already embedded
    function _embedUrls( matches, $el, options ) {
    	
    	var newContent;
    	
        $.each( matches, function( index, value ) {
            var elContent	= $el.html();        	
    		var videoId		= _getId( value );    		
    		
    		if( videoId.length > 0 ) {
                var template	= '<iframe width="'+ options.width +'" height="'+ options.height +'" src="//player.vimeo.com/video/__VIDEO_ID__" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
                newContent		= _str_replace( '__VIDEO_ID__', videoId, template );                
        		elContent		= elContent.replace( this, newContent );    			
    		}
        });

        return newContent;
    }

}(jQuery));
