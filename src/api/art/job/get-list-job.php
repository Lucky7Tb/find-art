<?php 

require __DIR__ . '/../../config/app.php';
require __DIR__ . '/../../helpers/helpers.php';
require __DIR__ . '/../../helpers/query.php';

if (isset($_GET["provinsi"]) && isset($_GET["kota"])) {
  $idProvinsi = $_GET["provinsi"];
  $idKota = $_GET["kota"];
  
  $querySearch = "
        SELECT `job_vacancy`.`id`, `job_vacancy`.`photo_id`, `job_vacancy`.`job_description`, `job_vacancy`.`job_payment`, `art_finder`.`full_name` AS `finder`, `photos`.`photo_url` AS thumbnail, `provinces`.`name` AS `province`, `cities`.`name` AS `city` 
        FROM `job_vacancy` 
        JOIN `art_finder` ON `art_finder`.`id` = `job_vacancy`.`art_finder_id` 
        JOIN `photos` ON `photos`.`id` = `job_vacancy`.`photo_id` 
        JOIN `users` ON `users`.`id` = `art_finder`.`user_id` 
        JOIN `provinces` ON `provinces`.`id` = `users`.`province_id` 
        JOIN `cities` ON `cities`.`id` = `users`.`city_id` 
        WHERE `job_vacancy`.`job_due_date` >= now() AND 
				`job_vacancy`.`is_visible` = '1' AND 
				`provinces`.`id` = '$idProvinsi' AND 
				`cities`.`id` = '$idKota'";

  $search = select($querySearch);

  if (empty($search)) {
    response(404, null, "Data tidak ditemukan");
  }

  response(200, $search, 'Berhasil memuat data lowongan');
}

$query = "
        SELECT `job_vacancy`.`id`, `job_vacancy`.`photo_id`, `job_vacancy`.`job_description`, `job_vacancy`.`job_payment`, `art_finder`.`full_name` AS `finder`, `photos`.`photo_url` AS thumbnail, `provinces`.`name` AS `province`, `cities`.`name` AS `city` 
        FROM `job_vacancy` 
        JOIN `art_finder` ON `art_finder`.`id` = `job_vacancy`.`art_finder_id` 
        JOIN `photos` ON `photos`.`id` = `job_vacancy`.`photo_id` 
        JOIN `users` ON `users`.`id` = `art_finder`.`user_id` 
        JOIN `provinces` ON `provinces`.`id` = `users`.`province_id` 
        JOIN `cities` ON `cities`.`id` = `users`.`city_id`
			  WHERE `job_vacancy`.`job_due_date` >= now() AND 
				`job_vacancy`.`is_visible` = '1'";

$data = select($query);

if (empty($data)) {
    response(404, null, "Data tidak ditemukan");
}

response(200, $data, 'Berhasil memuat data lowongan');

?>