$(function() {
	
	var resolution = 32;
	var rate = 0;
	var videoOver = false;
	
	
	// Buttons
	$('#load').live('click', loadVideo);
	
	$('#up')
		.live('mousedown', function() {
			doCommand(0);
		})
		.live('mouseup', function() {
			doCommand(1);
		})
	;
	$('#down')
		.live('mousedown', function() {
			doCommand(2);
		})
		.live('mouseup', function() {
			doCommand(3);
		})
	;
	$('#left')
		.live('mousedown', function() {
			doCommand(4);
		})
		.live('mouseup', function() {
			doCommand(5);
		})
	;
	$('#right')
		.live('mousedown', function() {
			doCommand(6);
		})
		.live('mouseup', function() {
			doCommand(7);
		})
	;
	
	// Keys
	$('#video')
		.live('mouseover', function() {
			videoOver = true;
		})
		.live('mouseout', function() {
			videoOver = false;
		})
	;
	
	$(window)
		.keydown( function(e) {
			if( videoOver ) {
				switch( e.keyCode ) {
					case 38: doCommand(0); break;
					case 40: doCommand(2); break;
					case 37: doCommand(4); break;
					case 39: doCommand(6); break;
				}
			}
		})
		.keyup( function(e) {
			if( videoOver ) {
				switch( e.keyCode ) {
					case 38: doCommand(1); break;
					case 40: doCommand(3); break;
					case 37: doCommand(5); break;
					case 39: doCommand(7); break;
				}
			}
		})
	;
	
	// Send command to camera
	function doCommand( cmd )
	{
		var url = buildURL( 'decoder_control', '&command='+ cmd );
		$('#hiddenIframe').attr('src', url);
	}
	
	// Build URL
	function buildURL( file, arg )
	{
		var arg = arg ? arg : '';
		return 'http://'+ $('#host').val() +':'+ $('#port').val() +'/'+ file +'.cgi?user='+ $('#user').val() +'&pwd='+ $('#pass').val() + arg;
	}
	
	// load video stream
	function loadVideo() {
		var width = resolution == 32 ? 640 : 320;
		var height = resolution == 32 ? 480 : 240;
		
		// size divs
		$('#main').css({
			width: width,
			height: height
		});
		
		// set video
		var url = buildURL('videostream', '&resolution='+ resolution +'&rate='+ rate);
		console.log( 'Video url: '+ url );
		$('#video').attr('src', url);
	}

});