function enterRoom() {
	// e.preventDefault();
	// alert('Running')
	let name = document.querySelector('#username').value;
	let room = document.querySelector('#link').value;
	if (name && room) {
		//remove error message, if any
		document.querySelector('#err-msg-username').innerHTML = '';

		//save the user's name in sessionStorage
		sessionStorage.setItem('username', name);

		//reload room
		// window.open(document.getElementById('link').value);
		window.open(room, '_self');
	} else {
		document.querySelector('#err-msg-username').innerHTML =
			'All Field Are Necessary';
	}
}
