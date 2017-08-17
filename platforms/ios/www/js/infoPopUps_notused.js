//info boxes code, not in use:

//javascript: 

// For "info" boxes with extra info for users -- http://osvaldas.info/elegant-css-and-jquery-tooltip-responsive-mobile-friendly
$( function()
{
    var targets = $( '[rel~=tooltip]' ),
        target  = false,
        tooltip = false,
        title   = false;
 
    targets.bind( 'mouseenter', function()
    {
        target  = $( this );
        tip     = target.attr( 'title' );
        tooltip = $( '<div id="tooltip"></div>' );
 
        if( !tip || tip == '' )
            return false;
 
        target.removeAttr( 'title' );
        tooltip.css( 'opacity', 0 )
               .html( tip )
               .appendTo( 'body' );
 
        var init_tooltip = function()
        {
            if( $( window ).width() < tooltip.outerWidth() * 1.5 )
                tooltip.css( 'max-width', $( window ).width() / 2 );
            else
                tooltip.css( 'max-width', 340 );
 
            var pos_left = target.offset().left + ( target.outerWidth() / 2 ) - ( tooltip.outerWidth() / 2 ),
                pos_top  = target.offset().top - tooltip.outerHeight() - 20;
 
            if( pos_left < 0 )
            {
                pos_left = target.offset().left + target.outerWidth() / 2 - 20;
                tooltip.addClass( 'left' );
            }
            else
                tooltip.removeClass( 'left' );
 
            if( pos_left + tooltip.outerWidth() > $( window ).width() )
            {
                pos_left = target.offset().left - tooltip.outerWidth() + target.outerWidth() / 2 + 20;
                tooltip.addClass( 'right' );
            }
            else
                tooltip.removeClass( 'right' );
 
            if( pos_top < 0 )
            {
                var pos_top  = target.offset().top + target.outerHeight();
                tooltip.addClass( 'top' );
            }
            else
                tooltip.removeClass( 'top' );
 
            tooltip.css( { left: pos_left, top: pos_top } )
                   .animate( { top: '+=10', opacity: 1 }, 50 );
        };
 
        init_tooltip();
        $( window ).resize( init_tooltip );
 
        var remove_tooltip = function()
        {
            tooltip.animate( { top: '-=10', opacity: 0 }, 50, function()
            {
                $( this ).remove();
            });
 
            target.attr( 'title', tip );
        };
 
        target.bind( 'mouseleave', remove_tooltip );
        tooltip.bind( 'click', remove_tooltip );
    });
});

//css

/*Popup box for more instructions -- http://osvaldas.info/elegant-css-and-jquery-tooltip-responsive-mobile-friendly */
#tooltip{
    text-align: center;
    color: #fff;
    background: #111;
    position: absolute;
    z-index: 100;
    padding: 15px;
}
#tooltip:after /* triangle decoration */{
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #111;
    content: '';
    position: absolute;
    left: 50%;
    bottom: -10px;
    margin-left: -10px;
}
#tooltip.top:after{
    border-top-color: transparent;
    border-bottom: 10px solid #111;
    top: -20px;
    bottom: auto;
}
#tooltip.left:after{
    left: 10px;
    margin: 0;
}
#tooltip.right:after{
	right: 10px;
    left: auto;
    margin: 0;
}


/*Standardized green next button
.nextButton{
	background-color:#44c767;
	-moz-border-radius:28px;
	-webkit-border-radius:28px;
	border-radius:28px;
	border:1px solid #18ab29;
	display:inline-block;
	color:#ffffff;
	font-family:Arial;
	font-size:17px;
	padding:16px 31px;
	text-decoration:none;
	float:right;
	bottom:0;
}
.nextButton:hover {
	background-color:#5cbf2a;
}*/

/*Standardized red back button
.backButton{
	/*background-color:#e4685d;
	-moz-border-radius:28px;
	-webkit-border-radius:28px;
	border-radius:28px;
	border:1px solid #e4685d;
	display:inline-block;
	color:#ffffff;
	font-family:Arial;
	font-size:17px;
	padding:16px 31px;
	float:left;
	bottom:0;*/
}/*
.backButton:hover {
	background-color:#eb675e;
}*/

/*Standardized red end button, same as end but floats right
.endButton{
	background-color:#e4685d;
	-moz-border-radius:28px;
	-webkit-border-radius:28px;
	border-radius:28px;
	border:1px solid #e4685d;
	display:inline-block;
	color:#ffffff;
	font-family:Arial;
	font-size:17px;
	padding:16px 31px;
	text-decoration:none;
	float:right;
	bottom:0;
}
.endButton:hover {
	background-color:#eb675e;
}*/
