$(function() {
	$('nav .menu a').click(function() {
		if ($('.js-toggle-menu').hasClass('open')) {
			$('.js-toggle-menu').removeClass('open');
			$('nav').fadeOut();
		}

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		},500);
		return false;
	});

	$('form[name=contact]').submit(function() {
		event.preventDefault();

		var errors = false;
		$('form[name=contact] input, form[name=contact] textarea').each(function() {
			if ($(this).attr('data-required') == 'true' && $(this).val() == '') {
				$(this).addClass('error');
				errors = true;

				$(this).click(function() {
					$(this).removeClass('error');
				});
			}
		});

		if (errors === false) {
			$('.contact form button').prop("disabled", true).html('<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>');

			$.ajax({
				url:$('form[name=contact]').attr('action'),
				method:'POST',
				data:$('form[name=contact]').serializeArray(),
				dataType:"json",
				success: function() {
					$('.contact form').fadeOut(function() {
						$('.contact .form').find('.success.msg').fadeIn();
					});
				}
			});
		}
	});

	$('.js-toggle-menu').click(function() {
		if ($(this).hasClass('open')) {
			$(this).removeClass('open');
			$('nav').fadeOut();
		} else {
			$(this).addClass('open');
			$('nav').fadeIn();
		}
	});
});