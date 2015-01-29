$( document ).ready( function()
{	
	var form = $( '#test_form' );

	var validator = form.validate({

		onkeyup: false,

		onfocusin: function( element ) {
			if($(element).hasClass('has-error'))
				$(element).valid();
		},

		onfocusout: function( element, errorList ) {
			if($(element).hasClass('has-error'))
				$(element).parent().find('.popover').hide();
			else
				$(element).valid();
		},

		showErrors: function( errorMap, errorList ) {
			$.each( this.successList, function( index, value ) {
				$(value).removeClass('has-error').popover('hide');

			});

			$.each( errorList, function(index, value) {

				var _popover = $(value.element).popover({
					trigger: 'manual',
					placement: 'top',
					content: value.message,
					template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
				});

				_popover.data('bs.popover').options.content = value.message;
				//$(value.element).popover('show');
				$(value.element).addClass('has-error');
				$(errorList[0].element).popover('show');
			});
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
	


	console.log( validator );
} );

