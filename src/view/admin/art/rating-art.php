<?php
require __DIR__ . '/../../../config/app.php';
require __DIR__ . '/../../../helpers/helpers.php';
$app = config();
require $app['template'] . 'admin/header.php';
?>

<div class="container">
	<?php require $app['template'] . 'admin/navbar.php'; ?>

	<div class="row">
		<div class="col-12">
			<form method="post" id="form-rating">
				<div class="inner-form">
					<label for="rating">Rating untuk ART</label>
					<input class="inner-form" type="number" name="rating" id="rating" min="1" max="5" value="1" step="1" required>
				</div>
				<button class="primary-button" type="submit">Submit</button>
			</form>
		</div>
	</div>

</div>

<script src="<?= $app['src']['js'] . 'app.js' ?>"></script>
<script src="<?= $app['src']['js'] . 'admin/job.js' ?>"></script>
<script>
	const formRating = document.getElementById('form-rating');
	const rating = document.getElementById('rating');

	formRating.addEventListener('submit', function(e) {
		e.preventDefault();

		const formData = new FormData();
		formData.append('art_id', <?= $_GET['art_id'] ?>);
		formData.append('job_accepted_id', <?= $_GET['id'] ?>);
		formData.append('rating', rating.value);

		fireART(formData)
			.then(function (response) {
				if (response.code == 200) {
					window.location.href = "index.php";
				}
			})
	})
</script>
<?php require $app['template'] . 'admin/footer.php' ?>