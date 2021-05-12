const formChangePassword = document.getElementById('form-change-password');

formChangePassword.addEventListener('submit', function (e) {
	e.preventDefault();
	const formData = new FormData(this);

	fetch(`${baseUrl}/src/api/admin/settings/change-password.php`, {
		method: 'POST',
		body: formData
	})
		.then(function (response) {
			return response.json();
		})
		.then(function (response) {
			if (response.code > 200) {
				throw new Error(response.message)
			} else {
				alert(response.message);
				window.location.href = `${baseUrl}/src/view/admin/settings`;
			}

		})
		.catch(function (error) {
			alert(error.message);
		})
})