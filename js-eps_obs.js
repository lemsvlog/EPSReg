$(function () {

	$("#EPSsubmit").prop("disabled", true);
	// photo
	$('#picture').on('click', function () {
		$('#appPhoto').trigger('click');
		$('#appPhoto').change(function () {
			var file = this.files[0],
				reader = new FileReader(),
				img = $(this).siblings('img')
			reader.onload = function (e) {
				img.attr('src', e.target.result);
			}
			reader.readAsDataURL(file);
		});
	});
	//passport
	$('#Passport_picture').on('click', function () {
		$('#ppPhoto').trigger('click');
		$('#ppPhoto').change(function () {
			var file = this.files[0],
				reader = new FileReader(),
				img = $(this).siblings('img')
			reader.onload = function (e) {
				img.attr('src', e.target.result);
			}
			reader.readAsDataURL(file);
		});
	});

	$('body').on('submit', '.forms5', function (event) {
		event.preventDefault();
		var form = $('#EPSforms')[0];
		var data = new FormData(form);
		$("#EPSsubmit").prop("disabled", true);
		$('.spinner3').show();
		$.ajax({
			type: "POST",
			enctype: 'multipart/form-data',
			url: "controller/registration.php",
			data: data,
			processData: false,
			contentType: false,
			cache: false,
			timeout: 600000,
			success: function (data) {
				$(".registration-results").html(data);
				//console.log("SUCCESS : ", data);
				$("#EPSsubmit").prop("disabled", false);
				$('.spinner3').hide();
			},
			error: function (e) {
				$(".result").text(e.responseText);
				//console.log("ERROR : ", e);
				$("#EPSsubmit").prop("disabled", false);
				$('.spinner3').hide();
			}
		});
	});

	// validate photo 
	$('#appPhoto').on('change', function () {
		$("#app_size").html('');
		const size = (this.files[0].size / 1024).toFixed(2);
		let wap = 'WARNING: file size ' + size + ' Kb is too large.';
		let wapi = 'WARNING: file size ' + size + ' Kb is too small.';
		if (size > 13.312) {
			$("#app_size").html("<span class='p-2 bg-danger text-white'>" + wap + "</span>");
		} else if (size < 9.216) {
			$("#app_size").html("<span class='p-2 bg-danger text-white'>" + wapi + "</span>");
		} else {
			//$("#app_size").text('' + 'This file size is: ' + size + " Kb" + ''); 
		}
	});

	// validate passport size
	$('#ppPhoto').on('change', function () {
		$("#passport_size").html('');
		const size = (this.files[0].size / 1024).toFixed(2);
		let pap = 'WARNING: file size ' + size + ' Kb is too large.';
		let papi = 'WARNING: file size ' + size + ' Kb is too small.';
		if (size > 100) {
			$("#passport_size").html("<span class='p-2 bg-danger text-white'>" + pap + "</span>");
		} else if (size < 50) {
			$("#passport_size").html("<span class='p-2 bg-danger text-white'>" + papi + "</span>");
		} else {
			//$("#passport_size").text('' + 'This file size is: ' + size + " MB" + ''); 
		}
	});

	//login

	$('body').on('submit', '.forms2', function (event) {
		var btn = $(this).find('input:submit, input:button');
		$('.error-message').empty();
		btn.attr('disabled', 'disabled');
		$('.spinner2').show();
		var form = $(this);
		$.ajax({
			type: form.attr('method'),
			url: form.attr('action'),
			data: form.serialize(),
			cache: false,
			success: function (data) {
				$('.error-message').empty().html(data);
			}
		}).done(function () {
			btn.removeAttr('disabled');
			$('.spinner2').hide();
		}).fail(function () { });
		event.preventDefault();
	});

	//password
	$('body').on('change', '#pword1', function () {
		$('.password-check').text('');
		let p1 = $('#pword').val();
		let p2 = $('#pword1').val();
		if (p1 === p2) {
			$('.password-check').text('');
		} else {
			$('.password-check').html("<p class='text-danger p-3'>Password does not matched!</p>");
			$('#pword1').val('');
			return false;
		}
	});

	$('body').on('change', '#flexCheckDefault', function () {
		let c = $("#flexCheckDefault").is(":checked");
		if (c == true) {
			$("#EPSsubmit").prop("disabled", false);
		} else {
			$("#EPSsubmit").prop("disabled", true);
		}
	});

	// login inputs
	$('body').on('click', '#regid', function () {
		$('.error-message').empty();
	});

	$('body').on('click', '#pword3', function () {
		$('.error-message').empty();
	});

	//province
	$('.province').on('change', function () {
		let sx = $(this).val();
		$.ajax({
			type: 'post',
			url: '../controller/getCity.php',
			data: 'term=' + sx,
			success: function (data) {
				$('.city').html(data);
			}
		});
	});
	//show password
	$('#icheckPassword').on('click', function () {
		let x = document.getElementById("pword3");
		if (x.type === "password") {
			x.type = "text";
		} else {
			x.type = "password";
		}
	});

});