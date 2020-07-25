const myModal = document.getElementById('myModal');
const $tabel = document.getElementById('table');
const latestTransfer = () => {
	const xhr = new XMLHttpRequest();
	xhr.open('POST', '/api/v1/transactions/12');
	xhr.onload = () => {
		if (xhr.status == 200) {
			// do something
			myModal.style.display = 'block';
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
	const erc20 = '12';
	const url = `/api/v1/transactions/${erc20}?limit=10&skip=0`;
	xhr.open('GET', url);
	xhr.responseType = 'json';
	xhr.onload = () => {
		if (xhr.status == 200) {
			console.log(xhr.response);
			$tabel.style.display = 'block';
			populateTable(xhr.response.transfers);
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
