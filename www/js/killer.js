$( document ).ready(function() {


		// check if done is set and true. this means a game is in progress
		var done = window.localStorage.getItem('done');

		// if game is in progress
		if (done == 'true') {

			// ask if player wants to continue existing game
			var conf = confirm('Game in progress. Would you like to continue?');

			// if player wants to continue
			if (conf){
				// load game data
				resumeGame();
			}
			// if player wants to start new game
			else {
				// reset game data 
				resetGame();
				// focus on player field to allow adding new player name
				$('#new-player-name').focus();
			}
		}
		// if no game is in progress
		else {
			// focus on player field to allow adding new player name
			$('#new-player-name').focus();
		}

		// if new player name form has been submitted
    $(document).on('submit','#adding',function(e) {
    	// prevent default behaviour
    	e.preventDefault();

    	// get new player name and trim whitespaces from front and back
    	var newPlayerName = $('#new-player-name').val().trim();
    	// set lifes to 3
    	var life = 3;

    	// if a player name has been provided
    	if (newPlayerName != '') {
    		// add player to list
    		addPlayer(life,newPlayerName);
    		// empty player name field
	    	$('#new-player-name').val('')
	    	// focus on player name field to allow adding another new player
	    	$('#new-player-name').focus();
	    }
    });

		// if delete player has been clicked
    $(document).on('click','.settings',function() {
    	
    	$('#settings-tab').show();

    	var lifes = parseInt(window.localStorage.getItem('lifes'));

    	if (isNaN(lifes)) {
    		lifes = 3;
    	}

    	$('#lifes').val(lifes);
    	$('.settings').hide();
    });

    // if delete player has been clicked
    $(document).on('click','.delete-player',function() {
    	// remove player from list
    	$(this).parent().remove();
    });

    // if game should start 
    $(document).on('click','#done',function() {
    	// start the game
    	startGame();
    });

    // if game should be reset / new game started
    $(document).on('click','#reset',function() {
    		// reset game data
    		resetGame();
    });

    // if the game should be restarted
    $(document).on('click','#restart',function() {

    	// hide the reset button div
   		$('#reset-p').hide();
   		// show the div to allow adding new player name
  		$('#name-p').show();
  		// hide dead player list
  		$('#dead-players').hide();
  		// move dead players to player list
  		$('#dead-players-list .pl').prependTo("#players");
  		// reset display lifes to 3
  		$('.life').html('3');
  		// reset data attribute lifes to 3
  		$('.pl').data('life',3);

  		// set done to false as game hasn't started yet
  		window.localStorage.setItem('done','false');
  		
  		// randomise order
			shakeEventDidOccur();
  		
  		$('.active').removeClass('active');
  		$('.pl').first().addClass('active');

  		window.localStorage.setItem('turn',0);

  		// store player names
  		storePlayerDetails();

  		// start the game
  		startGame();
    
    });

    // if next player button has been clicked
    $(document).on('click','.next-player',function() {

    	// find current active player
    	var current = $('#players .active');
    	// get next player
    	var next    = current.next();

    	// if next player is pl
    	if (next.hasClass('pl')) {
    		// add active class
    		next.addClass('active');
    	}
    	// otherwise ( current is last player and we need to select first player again)
    	else {
    		// select first player
    		$('#players .pl').first().addClass('active');
    	}

    	// remove current player highlight
    	current.removeClass('active');
    	// update scores
    	storePlayerDetails();

    });

    // if add life button has been clicked
    $(document).on('click','.add-life',function() {

    	// get current lifes
    	var lives = parseInt($(this).parent().data('life'));

    	// set over to false as default
     	var over = false;

     	// subtract a life
     	lives = lives + 1;
    	
    	// update data attribute to new lifes
     	$(this).parent().data('life',lives);
     	// update the life display
    	$(this).parent().find('.life').html(lives);

    	// find current active player
    	var current = $('#players .active');
    	// get next player
    	var next    = current.next();

    	// if next player is pl
    	if (next.hasClass('pl')) {
    		// add active class
    		next.addClass('active');
    	}
    	// otherwise ( current is last player and we need to select first player again)
    	else {
    		// select first player
    		$('#players .pl').first().addClass('active');
    	}

    	// remove current player highlight
    	current.removeClass('active');
    	// update scores
    	storePlayerDetails();

    });

    // if remove life button has been clicked
    $(document).on('click','.remove-life',function() {
    	
    	// get current lifes
    	var lives = parseInt($(this).parent().data('life'));

    	// set over to false as default
     	var over = false;

     	// subtract a life
     	lives = lives - 1;
    	
    	// update data attribute to new lifes
     	$(this).parent().data('life',lives);
     	// update the life display
    	$(this).parent().find('.life').html(lives);

    	// if no more lives
    	if (lives == 0) {
    		// remove the highlighter
    		$(this).parent().removeClass('active');
    		// hide add life button
    		$(this).parent().find('.add-life').hide();
    		// hide remove life button
    		$(this).parent().find('.remove-life').hide();
    		// hide next button
    		$(this).parent().find('.next-player').hide();
    		// show dead players div ( just in case it's the first player to die)
    		$('#dead-players').show();
    		// move dead player to dead list
    		$(this).parent().prependTo("#dead-players-list");

    		// if only 1 player left
    		if ($('#players .pl').length == 1) {
    			// mark game as game over
    			over = true;
    		}
    	}

    	// if game is not over
    	if (!over) {

    		// find current active player
	    	var current = $('#players .active');
	    	// get next player
	    	var next    = current.next();

	    	// if next player is pl
	    	if (next.hasClass('pl')) {
	    		// add active class
	    		next.addClass('active');
	    	}
	    	// otherwise ( current is last player and we need to select first player again)
	    	else {
	    		// select first player
	    		$('#players .pl').first().addClass('active');
	    	}

	    	// remove current player highlight
	    	current.removeClass('active');
	    	// update scores
	    	storePlayerDetails();
	    }
	    else {
	    	// winner code goes here.
	    	alert($('#players .pl span.name').html());
	    }
    	

    });
		
		// start a new game
		function startGame() {
			// set done to true 
			window.localStorage.setItem('done','true');

			// hide ability to add new name
    	$('#name-p').hide();
    	// show reset / restart buttons
    	$('#reset-p').show();
    	// show add life
    	$('.add-life').show();
    	// show remove life
    	$('.remove-life').show();
    	// show next
    	$('.next-player').show();
    	// hide delete player button
    	$('.delete-player').hide();
    	// highlight first player
    	$('#players .active').first().removeClass('active');
    	//$('#players .pl').first().addClass('active');
    	// update scores
    	storePlayerDetails();

    	// get turn from local storage
    	var turn = parseInt(window.localStorage.getItem('turn'));

    	// if turn is not a number ie first players turn
    	if(isNaN(turn)) {
    		// highlight first player
				$('#players .pl').first().addClass('active');
			}
			// otherwise
			else {
				turn = turn + 1;
				// select player whos turn it is
				$('#players .pl:nth-child('+turn+')').addClass('active');
			}
		}
		
		// resume an existing game
		function resumeGame() {
			
			// get scores
			var players = window.localStorage.getItem('players').split(',');
			// get turn
			var turn    = parseInt(window.localStorage.getItem('turn'))+1;
			
			// for every player
			for(a in players) {
				// split name and lifes
				var parts = players[a].split('|');
				// add new player to list
				addPlayer(parts[1],parts[0]);	
			}

			// start the game
			startGame();

			// remove highlighted player
			$('#players .active').removeClass('active');
			
			// if tun is not a number select first player
			if(isNaN(turn)) {
				// select first player
				$('#players .pl').first().addClass('active');
			}
			// if turn is a number
			else {
				// select relevant player
				$('#players .pl:nth-child('+turn+')').addClass('active');
			}

		}

		// reset game
		function resetGame() {

			// remove all players
			$('.pl').remove();
			// hide reset buttons
  		$('#reset-p').hide();
  		// show new player field
  		$('#name-p').show();
  		// hide dead player list
  		$('#dead-players').hide();
  		// delete scores
  		window.localStorage.removeItem('players');
  		// delete turn
  		window.localStorage.removeItem('turn');
  		// reset done
  		window.localStorage.setItem('done','false');
		}

		// add a player to the list
		function addPlayer(life,newPlayerName) {
			// by default to living players
			var list = 'players';
			// if player has no live
			life = parseInt(life);
			if (life == 0) {
				// add player to dead players
				console.log('deleted user');
				list = 'dead-players-list';
				$('#dead-players').show();
			}
			// do the bit
			$('#'+list).append('<div class="pl" data-life="'+life+'"><span class="name">'+newPlayerName+'</span> <span class="life">'+life+'</span><button class="add-life" style="display:none;font-size: 20px;">+</button> <button class="remove-life" style="display:none;font-size: 20px;">-</button> <button class="next-player" style="display:none;font-size: 20px;">0</button> <button type="button" class="delete-player" style="font-size: 20px;">Delete</button></div>');
		}

    function storePlayerDetails() {
    	var players = new Array();
    	var i = 0;
    	var turn = 0;
    	$(' .pl span.name').each(function(index,value) {
    		players[index] = $(this).html()+'|'+$(this).parent().data('life');
    		i = index;
    		if ($(this).parent().hasClass('active')) {
    			window.localStorage.setItem('turn',index);
    		}
    	});
/*
    	$('#dead-players-list .pl span.name').each(function(index,value) {
    		var ii = i + index + 1; 
    		players[ii] = $(this).html()+'|'+$(this).parent().data('life');
    	});      	*/
    	window.localStorage.setItem('players',players);
    }

	var myShakeEvent = new Shake({
	    threshold: 15, // optional shake strength threshold
	    timeout: 1000 // optional, determines the frequency of event generation
	});

	myShakeEvent.start();

	window.addEventListener('shake', shakeEventDidOccur, false);

	//function to call when shake occurs
	function shakeEventDidOccur () {
			var done = window.localStorage.getItem('done');
	
			if (done != 'true') {
		    $('.pl').shuffle();
		  }

	}

	(function($){
	 
	    $.fn.shuffle = function() {
	 
	        var allElems = this.get(),
	            getRandom = function(max) {
	                return Math.floor(Math.random() * max);
	            },
	            shuffled = $.map(allElems, function(){
	                var random = getRandom(allElems.length),
	                    randEl = $(allElems[random]).clone(true)[0];
	                allElems.splice(random, 1);
	                return randEl;
	           });
	 
	        this.each(function(i){
	            $(this).replaceWith($(shuffled[i]));
	        });
	 
	        return $(shuffled);
	 
	    };
	 
	})(jQuery);
});


