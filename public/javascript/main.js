const myModal = document.getElementById('myModal');
const $tabel = document.getElementById('table');
const $success = document.getElementById('success');
const $error = document.getElementById('error');

const latestTransfer = () => {
	let erc20 = '0xa5fd1a791c4dfcaacc963d4f73c6ae5824149ea7';
	const xhr = new XMLHttpRequest();
	xhr.open('POST', `/api/v1/transactions/${erc20}`);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = () => {
		if (xhr.status == 200) {
			// do something
			$error.style.display = 'none';
			$success.innerHTML = 'Transfer Completed';
			myModal.style.display = 'block';
		} else {
			myModal.style.display = 'block';
			$success.style.display = 'none';
			$error.style.display = 'block';
			$error.innerHTML = 'Some Internal Error';
		}
	};
	xhr.send();
};

const populateTable = data => {
	const tableBody = document.getElementById('table-body');
	let html = '';
	data.map(entity => {
		let tr = document.createElement('tr');
		let td1 = document.createElement('td');
		let td2 = document.createElement('td');
		let td3 = document.createElement('td');
		td1.setAttribute('class', 'text-wrap');
		td2.setAttribute('class', 'text-wrap');
		td3.setAttribute('class', 'text-wrap');
		td1.innerHTML = entity.hash.substr(0, 20);
		td2.innerHTML = entity.from;
		td3.innerHTML = entity.to;
		tr.append(td1);
		tr.append(td2);
		tr.append(td3);
		tableBody.append(tr);
	});
};

const getTransfer = () => {
	const xhr = new XMLHttpRequest();
	let erc20 = '0xa5fd1a791c4dfcaacc963d4f73c6ae5824149ea7';
	const url = `/api/v1/transactions/${erc20}/?limit=10&skip=0`;
	xhr.open('GET', url);
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = () => {
		if (xhr.status == 200) {
			console.log(xhr.response);
			$tabel.style.display = 'block';
			populateTable(xhr.response.transfers);
		} else {
			myModal.style.display = 'block';
			$success.style.display = 'none';
			$error.style.display = 'block';
			$error.innerHTML = 'Some Internal Error';
		}
	};

	xhr.send();
};

const close = () => {
	myModal.style.display = 'none';
};

document.addEventListener('DOMContentLoaded', () => {
	const $syncData = document.getElementById('sync');
	const $fetchData = document.getElementById('get_transfer');
	const $closeModal = document.getElementById('closeModal');
	const $cancelModal = document.getElementById('cancelModal');

	$syncData.addEventListener('click', latestTransfer);
	$fetchData.addEventListener('click', getTransfer);
	$closeModal.addEventListener('click', close);
	$cancelModal.addEventListener('click', close);
	$tabel.style.display = 'none';
});
