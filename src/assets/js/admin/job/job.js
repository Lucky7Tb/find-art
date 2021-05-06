function getJob() {
	const dataBody = document.getElementById("data-body");
	fetch(`${baseUrl}/src/api/admin/job/get-job.php`, {
		method: "GET",
	})
		.then(function (response) {
			return response.json();
		})
		.then(function (response) {
			let contentData = "";

			if(response.data.length === 0) {
				contentData = "<td colspan='5'><strong>Tidak ada data</strong></td>";
				dataBody.innerHTML = contentData;
			}else {
				response.data.forEach((data) => {
					contentData += /*html*/ `
					<tr>
						<td>
							<a href='${data.thumbnail}' target='_blank' class='button-thumbnail'>
								Lihat thumbnail
							</a>
						</td>
						<td>${data.job_payment}</td>
						<td>${data.job_due_date}</td>
						<td>${data.updated_at}</td>
						<td style='padding: 15px'>
							<a class='info-button' href='${baseUrl}/src/view/admin/job/detail-job.php?id=${data.id}'>Detail</a>
							<a class='warning-button' style='margin-left: 10px;' href='${baseUrl}/src/view/admin/job/update-job.php?id=${data.id}'>Ubah</a>
							<a class='danger-button delete-button' style='margin-left: 10px;' href='javascript:void(0)' onclick='deleteJob("${data.id}")'>Hapus</a>
						</td>
					</tr>
				`;
				});
				dataBody.innerHTML = contentData;
			}
		});
}

function getDetailJob(id) {
	return fetch(`${baseUrl}/src/api/admin/job/get-job.php?id=${id}`, {
		method: "GET",
	})
	.then(function (response) {
		return response.json();
	})
}

function postJob(formData) {
	fetch(`${baseUrl}/src/api/admin/job/post-job.php`, {
		method: "POST",
		body: formData,
	})
		.then(function (response) {
			return response.json();
		})
		.then(function (response) {
			if (response.code > 200) {
				throw new Error(response.message);
			}

			alert(response.message);
			window.location.href = baseUrl + "/src/view/admin/";
		})
		.catch(function (err) {
			alert(err);
		});
}

function updateJob(formData) {
	fetch(`${baseUrl}/src/api/admin/job/update-job.php`, {
		method: "POST",
		body: formData,
	})
		.then(function (response) {
			return response.json();
		})
		.then(function (response) {
			if (response.code > 200) {
				throw new Error(response.message);
			}

			alert(response.message);
			window.location.href = baseUrl + "/src/view/admin/";
		})
		.catch(function (err) {
			alert(err);
		});
}

function deleteJob(jobId) {
	const willDeleted = confirm("Yakin ingin menghapusnya?");

	if (willDeleted) {
		const formData = new FormData();
		formData.append("id", jobId);

		fetch(`${baseUrl}/src/api/admin/job/delete-job.php`, {
			method: "POST",
			body: formData,
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (response) {
				if (response.code > 200) {
					throw new Error(response.message);
				}
	
				alert(response.message);
				getJob();
			})
			.catch(function (err) {
				alert(err);
			});
	}
}

function getInterestedART(jobId) {
	fetch(`${baseUrl}/src/api/admin/job/detail-job.php?id=${jobId}`, {
		method: 'GET',
	})
		.then(function (response) {
			return response.json();
		})
		.then(function (response) {
			const artContainer = document.getElementById('art-container');
			let content = '';

			if (response.data.length === 0) {
				artContainer.innerHTML = `<h2 class='text-center' style='margin-top: 3em'>Belum ada ART yang tertarik</h2>`;
			} else {
				content += `<h2 class="text-center" style="margin-top: 3em"> ART yang tertarik </h2>`;
				response.data.forEach((art) => {
					if (art.art_rating !== null) {
						const artRating = parseInt(art.art_rating);
						let starRating = "<div style='text-align: center'>";
						for (let i = 0; i < artRating; i++) {
							starRating += `
								<img src="${baseUrl}/src/assets/img/icon/star.svg" alt="rating star" width="7%">
							`;
						}
						starRating += '</div>';
						content += `
							<div class="col-4">
								<div class="card">
									<h3 class="text-center">${art.art_name}</h3>
									<a href="${baseUrl}/src/view/admin/art/detail-art.php?id=${art.art_id}">
										<img src="${art.art_photo}" class="d-block mx-auto" alt="Avatar" width="25%">
									</a>
									<h4 class="text-center">Rating: </h4>
									${starRating}
									<div style="margin-left: 40%; margin-top: 1.5em">
										<button class="primary-button" onclick='confirmSelectART(${art.art_id})'>Pilih ART</button>
									</div>
								</div>
							</div>
						`;
					} else {
						content += `
							<div class="col-4">
								<div class="card">
									<h3 class="text-center">${art.art_name}</h3>
									<a href="${baseUrl}/src/view/admin/art/detail-art.php?id=${art.art_id}">
										<img src="${art.art_photo}" class="d-block mx-auto" alt="Avatar" width="25%">
									</a>								
									<h4 class="text-center">Rating: </h4>
									<h4 class="text-center">Belum ada rating</h4>
									<div style="margin-left: 40%; margin-top: 1.5em">
										<button data-art-id='${art.art_id}' class="primary-button" onclick='confirmSelectART(${art.art_id})'>Pilih ART</button>
									</div>
								</div>
							</div>
						`;
					}
				});
				artContainer.innerHTML = content;
			}
		});
}

function chooseART(formData) {
	fetch(`${baseUrl}/src/api/admin/art/select-art.php`, {
		method: 'POST',
		body: formData,
	})
		.then(function (response) {
			return response.json();
		})
		.then(function (response) {
			if (response.code > 200) {
				throw new Error(response.message);
			}

			window.location.href = `${baseUrl}/src/view/admin/art/`;
		})
		.catch(function (err) {
			alert(err.message);
		});
}