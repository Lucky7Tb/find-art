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
			<img src="<?= $_SESSION['user']['photo'] ?>" class="d-block mx-auto" alt="Avatar" width="10%">

			<form action="post" id="form-change-password">
				<div class="inner-form col-12">
					<label for="new_password">Password baru</label>
					<input type="password" name="new_password" id="new_password" required>
				</div>

				<div class="inner-form col-12">
					<label for="confirm_password">Konfirmasi password</label>
					<input type="password" name="confirm_password" id="confirm_password" required>
				</div>

				<div class="col-1">
					<button type="submit" class="primary-button-lg">Simpan</button>
				</div>
			</form>
		</div>
	</div>
</div>

<script src="<?= $app['src']['js'] . 'app.js' ?>"></script>
<script src="<?= $app['src']['js'] . 'admin/change-password.js' ?>"></script>
<?php require $app['template'] . 'admin/footer.php' ?>