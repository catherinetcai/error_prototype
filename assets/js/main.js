
$( document ).ready( function(){	
	var form = $( '#test_form' );

	var validation = form.validate({


		//Not validating every keystroke
		onkeyup: false,

		//If the element has an error, validate it
		onfocusin: function( element ) {
			if( $( element ).hasClass( 'has-error' ) )
				$( element ).valid();
		},

		//Hide popover on focusout. If doesn't have error, validate

		onfocusout: function( element, errorMap ) {
			if($( element ).hasClass( 'has-error' ) ) {
				$( element ).valid();
				$( element ).parent().find( '.popover' ).hide();
				console.log( errorMap );
			}
			else
				$( element ).valid();
		},

		showErrors: function( errorMap, errorList ) {

			//To do: put together an array that tracks all the errors, so that it's possible to, onfocusout, display the first error on the page's popover
			errorTracker = [];

			//When validated, remove the popover
			$.each( this.successList, function( index, value ) {
				$( value ).removeClass( 'has-error' ).popover( 'hide' );
			});

			//Displaying popover on first invalid element, defaults to top
			$.each( errorList, function( index, value ) {
				console.log( value );
				var _popover = $( value.element ).popover({
					trigger: 'manual',
					placement: 'top',
					content: value.message,
					template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
				});

				_popover.data( 'bs.popover' ).options.content = value.message;
				//$(value.element).popover('show');
				$( value.element ).addClass( 'has-error' );
				$( errorList[0].element ).popover( 'show' );
			});
		},


		//Should scroll to the top of the element. To do: make it so it actually scrolls, not jumps.
		invalidHandler: function( form, validator ) {
			if ( !validator.numberOfInvalids() )
				return;
			$( 'html, body' ).animate({
				scrollTop: $( validator.errorList[0].element ).offset(top)
				}, 2000);
		},

		rules: {
			testname: {
				required: true
			},

			test_password: {
				required: true
			},

			test_confirm_password: {
				required: true,
				equalTo: '#test_password'
			},

			test_email: {
				required: true,
				email: true
			},
			test_state: {
				required: true
			},

		},

		messages: {
			testname: "Username is required.",

			test_password: {
				required: "Password is required.",
				minlength: "Password must be five characters or more."
			},

			test_confirm_password: {
				required: "Please confirm your password."
			},

			test_email: {
				required: "Email is required.",
				email: "That is not a valid email."
			},

			test_state: "Your state of residence is required."
		},

	});
} );

