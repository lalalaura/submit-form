
jQuery(document).ready(function() {

	jQuery('#form-submit').click(function(event) {
	
		event.preventDefault();
		form_validate();
	
	});
	
	jQuery('#readmore').click(function(event) {
	
		event.preventDefault();
		content_update();
	
	});

});

function content_update() {
	
	jQuery.ajax({
	
		type: 'GET',
		url: 'http://localhost/content.php',
		success: function(data) {
			
			jQuery('#content').append(data);
			
		},
		error: function() {
			
			alert('eroare continut');
			
		}
		
	});
	
}

function form_validate() {
	
	var is_valid = true;
	
	var required_fields = {
		email: true,
		password: true,
		address: false
	};
	
	jQuery('.form-item').each(function() {
	
		var children = jQuery(this).children('input, div');
		
		var field = children[0];
		var field_name = jQuery(field).attr('name');
		var field_value = jQuery(field).val();
		
		if (required_fields[field_name]) {
			
			var error_div = children[1];
			
			if (field_value.length == 0) {
				
				is_valid = false;
				jQuery(error_div).show();
				
			} else {
				
				jQuery(error_div).hide();
				
				if (field_name == 'password' && field_value.length < 5) {
					
					alert('Parola minima este de 5 caractere');
					
				}
				
				if (field_name == 'email') {
					
					validate_email_format(field_value);
					
				}
			
			}
			
		}
	
	});
	
	if (is_valid) { jQuery('#registration').submit(); }
	
}

function validate_email_format(value) {
	
	var email_arr = value.split('@');
	
	if (email_arr.length != 2 || email_arr[0].length == 0 || email_arr[1].indexOf('.') == -1) {
		
		alert('Adresa de email invalida.');
		
	}	
	
}







