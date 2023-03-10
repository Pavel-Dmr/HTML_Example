/*
 * PhotoDesk JavaScript Library v1.0.0
 * http://tympanus.net/codrops/2010/07/01/interactive-photo-desk/
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Version: 1.0.0 (2010-08-04)
 */

(function($) {

    $.fn.photoDesk = function(options) {
        var settings = $.extend({}, $.fn.photoDesk.defaults, options);
        return this.each(function() {
            new PhotoDesk($(this), settings)
        });
    };
    $.fn.photoDesk.defaults = {
        photoW: 184,
        photoH: 205,
        showShuffle: true,
        showViewAll: true,
        onDelete: function(obj) {return true;}
    }

    function PhotoDesk($container, $settings) {
        /**
         * idx:
         * index of photo that is currently hold
         * idxLarge:
         * index of photo that is currently on full mode
         * mouseup:
         * flag to use on the mouseup and mousedown events,
         * to help preventing the browser default selection of elements
         */
        var idx,idxLarge    = -1;
        var mouseup         = false;
        var isDragged       = false;

        /**
         * the photos and options container
         */
        var photosSize         = $container.find('.pd_photo').length;

        $container.append(
            $shuffle = $('<a href="#" class="pd_shuffle">Shuffle</a>'),
            $desk = $('<a href="#" class="pd_backdesk" style="display:none;">Back to Desk</a>'),
            $view = $('<a href="#" class="pd_viewall">View All</a>')
        );

        if (!$settings.showShuffle) {
            $shuffle.hide()
        }
        if (!$settings.showViewAll) {
            $view.hide()
        }

        /**
         * navigation current step
         */
        var navPage            = 0;
        /**
         * spreads the photos on the table..
         */

        var ie                 = false;
        if ($.browser.msie) {
            ie = true;
        }

        var minW, minH, maxW, maxH;

        $('<img />').attr('src','images/paperball.png');
        /**
        * display all the photos on the desk, with a random rotation,
         * and also make them draggable.
         * on mouse down, we want the photo to enlarge in a few pixels,
         * and to rotate 0 degrees
         */
        var cntPhotos = 0;
        $container.find('.pd_photo').each(function(i){
            var $photo     = $(this);
            $('<img />').load(function(){
                ++cntPhotos;
                var $image     = $(this);

                var r = Math.floor(Math.random()*201)-100;//*41
                var maxzidx = parseInt(findHighestZIndex()) + 1;
                calcPosition();
                var param    = {
                    'width'   : $settings.photoW + 'px',
                    'height'  : $settings.photoH + 'px',
                    'top'     : (Math.floor(Math.random() * (maxH - minH + 1)) + minH) +'px',
                    'left'    : (Math.floor(Math.random() * (maxW - minW + 1)) + minW) +'px',
                    'z-index' : maxzidx
                };

                $photo.css(param);
                if(!ie) {
                    $photo.transform({'rotate'    : r + 'deg'});
                } else {
                    var ieR = (r / 90);
                    var ieScaling = 1 - (Math.abs(ieR) / 2);
                    $photo.css({
                        'filter'    : "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', " +
                                      "M11=" + ieScaling + ", M12=" + -ieR + ", M21=" + ieR + ", M22=" + ieScaling + ")"
                    });
                }
                $photo.show();
                if(cntPhotos == photosSize) {
                    bindEvents();
                }
            }).attr('src',$photo.find('img').attr('src'));
            if (!$photo.has('.pd_hold').length) {
                $photo.html('<div class="pd_hold">' + $photo.html() + '</div>');
            }
            if (!$photo.has('.delete').length) {
                $photo.append('<span class="delete"></span>');
            }
        });
        $container.find('.pd_photo img').css({
            width: $settings.photoW + 'px',
            height: $settings.photoH + 'px'
        });
        /**
         * grab a photo
         */
        function mouseDown($photo){
            mouseup     = true;
            idx         = $photo.index() + 1;
            var maxzidx = parseInt(findHighestZIndex()) + 1;
            $photo.css('z-index',maxzidx);
            var param = {
                'width'  : '+=40px',
                'height' : '+=40px'
            };
            if(!ie) {
                param.rotate = '0deg';
                param.shadow = '5px 5px 15px #222';
            } else {
                $photo.css({'filter': "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', " +
                                      "M11=1, M12=0, M21=0, M22=1)"});
            }
            $photo.stop(true,true).animate(param,100).find('img').stop(true,true).animate({
                'width'  : '+=40px',
                'height' : '+=40px'
            },100);
        }

        /**
         * we do the mouseup on the document to prevent the
         * case when we release the mouse outside of a photo.
         * also, we want the photo to get smaller again,
         * rotate some random degrees, and also move it some pixels
         */
        $(document).bind('mouseup',function(e){
            if(mouseup){
                mouseup      = false;
                var $photo   = $container.find('.pd_photo:nth-child('+idx+')');
                var r        = Math.floor(Math.random()*101)-50;
                var $photoT  = parseFloat($photo.css('top'),10);
                var $photoL  = parseFloat($photo.css('left'),10);
                var newTop   = $photoT + r;
                var newLeft  = $photoL + r;
                var param = {
                    'width'  : '-=40px',
                    'height' : '-=40px',
                    'top'    : newTop + 'px',
                    'left'   : newLeft + 'px'
                };
                if(!ie) {
                    param.rotate = r + 'deg';
                    param.shadow = '0 0 5px #000';
                } else {
                    var ieR = (r / 90);
                    var ieScaling = 1 - (Math.abs(ieR) / 2);
                    param.filter = "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', " +
                        "M11=" + ieScaling + ", M12=" + -ieR + ", M21=" + ieR + ", M22=" + ieScaling + ")";
                }
                $photo.stop(true,true).animate(param,200).find('img').stop(true,true).animate({
                    'width'  : '-=40px',
                    'height' : '-=40px'
                },200);
            }
            e.preventDefault();
        });

        /**
         * removes the photo element from the DOM,
         * after showing the paper image..
         */
        $container.find('.delete').bind('click',function(){
            if ($settings.onDelete() == false) {
                return;
            }
            var $photo       = $(this).parent();
            var $photoT      = parseFloat($photo.css('top'),10);
            var $photoL      = parseFloat($photo.css('left'),10);
            var $photoZIndex = $photo.css('z-index');
            var trashWidth   = ($settings.photoW > 120) ? $settings.photoW : 120;
            var trashHeight  = ($settings.photoH > 120) ? $settings.photoH : 120;
            var $trash = $('<div />',{
                'className' : 'pd_paperball',
                'style'     : 'top:' + parseInt($photoT + $settings.photoH/2) + 'px;' +
                              'left:' + parseInt($photoL + $settings.photoW/2) +'px;' +
                              'width:0px;height:0px;z-index:' + $photoZIndex
            }).appendTo($container);

            $trash.animate({
                'width'  : trashWidth + 'px',
                'height' : trashHeight + 'px',
                'top'    : $photoT + 'px',
                'left'   : $photoL + 'px'
            },500,function(){
                var $this = $(this);
                setTimeout(function(){
                    $this.remove();
                },800);
            });
            $photo.animate({
                'width'  : '0px',
                'height' : '0px',
                'top'    : $photoT + $settings.photoH/2 + 'px',
                'left'   : $photoL + $settings.photoW/2 +'px'
            },1000,function(){
                --photosSize;
                $(this).remove();
            });
        });

        function stack(){
            navPage         = 0;
            var cnt_photos  = 0;
            var windowsW    = $(window).width();
            var windowsH    = $(window).height();
            $container.find('.pd_photo').each(function(i){
                var $photo     = $(this);
                $photo.css('z-index',parseInt(findHighestZIndex()) + 1000 + i)
                .stop(true)
                .animate({
                    'top'  : parseInt((windowsH-100)/2 - $settings.photoH/2) + 'px',
                    'left' : parseInt((windowsW-100)/2 - $settings.photoW/2) + 'px'
                },800,function(){
                    $desk.show();
                    var $photo = $(this);
                    ++cnt_photos;
                    var $nav     = $('<a class="pd_next_photo" style="display:none;"></a>');
                    $nav.bind('click',function(){
                        navigate();
                        $(this).remove();
                    });
                    $photo.prepend($nav);
                    $photo.draggable('destroy')
                    .find('.delete')
                    .hide()
                    .andSelf()
                    .find('.pd_hold')
                    .unbind('mousedown')
                    .bind('mousedown',function(e){
                        return false;
                    });

                    $photo.unbind('mouseenter')
                    .bind('mouseenter',function(){
                        $nav.show();
                    })
                    .unbind('mouseleave')
                    .bind('mouseleave',function(){
                        $nav.hide();
                    });
                    $shuffle.unbind('click');
                    $view.unbind('click');
                    if(cnt_photos == photosSize)
                        enlarge(findElementHighestZIndex());
                });
            });
        }

        function enlarge($photo){
            var windowsW = $(window).width();
            var windowsH = $(window).height();
            var param = {
                'width'  : '+=200px',
                'height' : '+=200px',
                'top'    : parseInt((windowsH-100)/2 - ($settings.photoH+200)/2) + 'px',
                'left'   : parseInt((windowsW-100)/2 - ($settings.photoW+200)/2) + 'px'
            };
            if (!ie) {
                param.rotate = '0deg';
                param.shadow = '5px 5px 15px #222';
            } else {
                $photo.css({'filter': "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', " +
                    "M11=1, M12=0, M21=0, M22=1)"});
            }
            $photo.animate(param,500,function(){
                idxLarge = $(this).index();
            }).find('img').animate({
                'width'    : '+=200px',
                'height': '+=200px'
            },500);
        }

        /**
         * back to desk
         */
        function disperse(){
            var windowsW = $(window).width();
            var windowsH = $(window).height();

            $container.find('.pd_photo').each(function(i){
                var $photo         = $(this);
                //if it is the current large photo:
                if($photo.index() == idxLarge){
                    var param = {
                        'top'    : parseInt((windowsH-100)/2 - $settings.photoH/2) + 'px',
                        'left'   : parseInt((windowsW-100)/2 - $settings.photoW/2) + 'px',
                        'width'  : $settings.photoW + 'px',
                        'height' : $settings.photoH + 'px'
                    };
                    if (!ie) {
                        param.shadow = '1px 1px 5px #555';
                    }
                    $photo.stop(true).animate(param,500, function(){
                        shuffle();
                        $view.show();
                    }).find('img').animate({
                        'width'  : $settings.photoW + 'px',
                        'height' : $settings.photoH + 'px'
                    },500);
                }
            });
            $container.find('.pd_next_photo').remove();
            bindEvents();
        }

        function bindEvents(){
            $shuffle.unbind('click').bind('click',function(e){
                if(photosSize == 0) return;
                shuffle();
                e.preventDefault();
            });
            $view.unbind('click').bind('click',function(e){
                var $this = $(this);
                if(photosSize == 0) return;
                stack();
                $this.hide();
                e.preventDefault();
            });
            $desk.unbind('click').bind('click',function(e){
                var $this = $(this);
                if(photosSize == 0) return;
                disperse();
                $this.hide();
                e.preventDefault();
            });

            $container.find('.pd_photo').each(function(i){
                var $photo = $(this);
                $photo.draggable({
                    containment    : $container,
                    start: function () {
                        isDragged = true;
                    }
                }).find('.delete')
                .show()
            }).find('.pd_hold').unbind('mousedown').bind('mousedown',function(e){
                var $photo     = $(this).parent();
                mouseDown($photo);
                e.preventDefault();
            });
        }

        function navigate(){
            if(photosSize == 0) return;

            var $photo        = $container.find('.pd_photo:nth-child('+parseInt(idxLarge+1)+')');
            var r             = Math.floor(Math.random()*201)-100;//*41
            calcPosition();
            var param = {
                'top'    : (Math.floor(Math.random() * (maxH - minH + 1)) + minH) +'px',
                'left'   : (Math.floor(Math.random() * (maxW - minW + 1)) + minW) +'px',
                'width'  : $settings.photoW + 'px',
                'height' : $settings.photoH + 'px'
            };
            if(!ie) {
                param.rotate = r + 'deg';
                param.shadow = '1px 1px 5px #555';
            } else {
                var ieR = (r / 90);
                var ieScaling = 1 - (Math.abs(ieR) / 2);
                param.filter = "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', " +
                    "M11=" + ieScaling + ", M12=" + -ieR + ", M21=" + ieR + ", M22=" + ieScaling + ")";
            }
            $photo.stop(true).animate(param,500,function(){
                ++navPage;
                var $photo = $(this);

                $container.append($photo.css('z-index',1));
                if(navPage < photosSize)
                    enlarge(findElementHighestZIndex());
                else{ //last one
                    $desk.hide();
                    $view.show();
                    bindEvents();
                }
            }).find('img').animate({
                'width'  : $settings.photoW + 'px',
                'height' : $settings.photoH + 'px'
            },500);
        }

        function shuffle(){
            $container.find('.pd_photo').each(function(i){
                var $photo = $(this);
                var r        = Math.floor(Math.random()*301)-100;//*41
                calcPosition();
                var param = {
                    'top'  : (Math.floor(Math.random() * (maxH - minH + 1)) + minH) +'px',
                    'left' : (Math.floor(Math.random() * (maxW - minW + 1)) + minW) +'px'
                };
                if(!ie) {
                   param.rotate = r + 'deg';
                } else {
                    var ieR = (r / 180);
                    var ieScaling = 1 - (Math.abs(ieR) / 2);
                    param.filter = "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', " +
                        "M11=" + ieScaling + ", M12=" + -ieR + ", M21=" + ieR + ", M22=" + ieScaling + ")";
                }
                $photo.animate(param,800);
            });
        }

        function findHighestZIndex(){
            var photos = $container.find('.pd_photo');
            var highest = 0;
            photos.each(function(){
                var $photo = $(this);
                var zindex = $photo.css('z-index');
                if (parseInt(zindex) > highest) {
                    highest = zindex;
                }
            });
            return highest;
        }

        function findElementHighestZIndex(){
            var photos = $container.find('.pd_photo');
            var highest = 0;
            var $elem;
            photos.each(function(){
                var $photo = $(this);
                var zindex = $photo.css('z-index');
                if (parseInt(zindex) > highest) {
                    highest = zindex;
                    $elem    = $photo;
                }
            });
            return $elem;
        }

        function calcPosition() {
            minW = $container.position().left;
            minH = $container.position().top;
            maxW = (minW + $container.width()) - $settings.photoW;
            maxH = (minH + $container.height()) - $settings.photoH;
        }
        // Array Remove - By John Resig (MIT Licensed)
        Array.prototype.remove = function(from, to) {
            var rest = this.slice((to || from) + 1 || this.length);
            this.length = from < 0 ? this.length + from : from;
            return this.push.apply(this, rest);
        };
        $container.find('a').fancybox({
            onStart: function () {
                var showPreview = !mouseup && !isDragged;
                isDragged = false;
                return showPreview;
            },
            hideOnContentClick: true,
            titlePosition: 'over',
            showCloseButton: false
        });
    }
})(jQuery);