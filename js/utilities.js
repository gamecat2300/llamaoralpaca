
$(document).ready(function(){

	$( "#quizArea" ).delegate( ".q-ol-li", "click", function(e){
		var $checkBtn = $(e.target).parent().parent().parent().parent().parent().find( ".q-check-btn" );
		$(".q-next-btn").show();
		$checkBtn.click();
		var rightimages = ['1.jpg', '2.jpg', '3.jpg','4.jpg','5.jpg','6.jpg'];
		var wrongimages = ['1.jpg', '2.jpg', '3.jpg','4.jpg','5.jpg'];
		$('.q-probArea #right').css({'background-image': 'url(../img/right/' + rightimages[Math.floor(Math.random() * rightimages.length)] + ')'});
		$('.q-probArea #wrong').css({'background-image': 'url(../img/wrong/' + wrongimages[Math.floor(Math.random() * wrongimages.length)] + ')'});
	});

	$( "#quizArea" ).delegate( ".q-next-btn", "click", function(e){
		$(".q-next-btn").hide();
	});

	$( "#quizArea" ).delegate( ".helpButton", "click", function(e){
		$( ".help" ).fadeIn( "fast" );
		ga('send', 'event', 'game', 'got_help', 'got_help', 1);
	});

	$(".close").click(function(){
		$( ".help" ).fadeOut( "fast" );
	});

	$( "#quizArea" ).delegate( ".helpButton", "click", function(e){
		$( "#help_button" ).click();
	});

	$(".close").click(function(){
		$( ".help" ).fadeOut( "fast" );
	});

	$("#game_sounds").jPlayer({
		ready: function () {
			$(this).jPlayer();
		},
		swfPath: "js",supplied: "m4a, oga"
	});

	$('#playGame').click(function() {
		$('#frameOne').hide();
  		$('#frameTwo').show();
	});

	$('#playGameButton').on('click', function() {
  		ga('send', 'event', 'game', 'click', 'start_game', 1);
	});

	$('.fancybox').fancybox();
//ANIMATIONS //
	zoom = function(){
		$("h3").letterfx({"fx":"fall","words":true,"timing":175});
		$("h2.small").letterfx({"fx":"smear","letter_end":"rewind","timing":50});
	};



//SOCIAL MEDIA //

//*Twitter * //

//* Facebook *//
	shareFB = function(){
		FB.ui(
	   {
     	method: 'feed',
     	name: 'Llama Or Alpaca',
     	link: 'http://developers.facebook.com/docs/reference/dialogs/',
     	picture: 'http://www.llamaoralpaca.com/img/logo.png',
     	caption: 'Llama or Alpaca is a fun way to see if you know which is which.',
     	description: 'I scored ' + percentage + ' on the game.',
     	message: 'I scored ' + percentage + ' on the game.'
   		}
		);
	};


/*$.fn.halloweenBats({});*/



});