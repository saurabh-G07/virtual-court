import helpers from './helpers.js';

window.addEventListener('load', () => {
	//When the chat icon is clicked
	document.querySelector('#toggle-chat-pane').addEventListener('click', (e) => {
		let chatElem = document.querySelector('#chat-pane');
		let mainSecElem = document.querySelector('#main-section');

		if (chatElem.classList.contains('chat-opened')) {
			chatElem.setAttribute('hidden', true);
			mainSecElem.classList.remove('col-md-9');
			mainSecElem.classList.add('col-md-12');
			chatElem.classList.remove('chat-opened');
		} else {
			chatElem.attributes.removeNamedItem('hidden');
			mainSecElem.classList.remove('col-md-12');
			mainSecElem.classList.add('col-md-9');
			chatElem.classList.add('chat-opened');
		}

		//remove the 'New' badge on chat icon (if any) once chat is opened.
		setTimeout(() => {
			if (
				document.querySelector('#chat-pane').classList.contains('chat-opened')
			) {
				helpers.toggleChatNotificationBadge();
			}
		}, 300);
	});
	document.querySelector('#close-chat').addEventListener('click', () => {
		let chatElem = document.querySelector('#chat-pane');
		let mainSecElem = document.querySelector('#main-section');
		if (chatElem.classList.contains('chat-opened')) {
			chatElem.setAttribute('hidden', true);
			mainSecElem.classList.remove('col-md-9');
			mainSecElem.classList.add('col-md-12');
			chatElem.classList.remove('chat-opened');
		} else {
			chatElem.attributes.removeNamedItem('hidden');
			mainSecElem.classList.remove('col-md-12');
			mainSecElem.classList.add('col-md-9');
			chatElem.classList.add('chat-opened');
		}
	});
	//When the video frame is clicked. This will enable picture-in-picture
	document.getElementById('local').addEventListener('click', () => {
		if (!document.pictureInPictureElement) {
			document
				.getElementById('local')
				.requestPictureInPicture()
				.catch((error) => {
					alert(error);
				});
		} else {
			document.exitPictureInPicture().catch((error) => {
				// Video failed to leave Picture-in-Picture mode.
				alert(error);
			});
		}
	});

	//When the 'Create room" is button is clicked
	document.getElementById('create-room').addEventListener('click', (e) => {
		e.preventDefault();

		let roomName = document.querySelector('#room-name').value;
		let yourName = document.querySelector('#your-name').value;
		let meetingSubject = document.querySelector('#subject').value;
		let startingDate = document.querySelector('#start-date').value;
		let endDate = document.querySelector('#end-date').value;
		if (roomName && yourName && meetingSubject && startingDate && endDate) {
			//remove error message, if any
			document.querySelector('#err-msg').innerHTML = '';

			//save the user's name in sessionStorage
			sessionStorage.setItem('username', yourName);
			const roomId = `${roomName
				.trim()
				.replace(' ', '_')}_${helpers.generateRandomString()}`;
			//create room link
			let roomLink = `${location.origin}/indexold.html?room=${roomId}`;

			//show message with link to room
			document.querySelector(
				'#room-created'
			).innerHTML = `Room successfully created.
				Share the below room link with your partners to join the meeting.`;
			// Expose The meeting link to others
			document.querySelector(
				'#roomId'
			).innerHTML = `<a href='${roomLink}'>${roomLink}</a>`;
			document.getElementById('share-whatsapp').style.display = `block`;
			// console.log();
			document
				.getElementById('share-whatsapp')
				.addEventListener('click', () => {
					let whatsappMsg = `@${yourName} has invited you for a meeting for ${meetingSubject} , Scheduled Time :-  ${startingDate.replace(
						'T',
						' '
					)}hrs to ${endDate.replace(
						'T',
						' '
					)}hrs,  Meeting link :-%0D%0A ${roomLink}`;

					window.location = `https://api.whatsapp.com/send?text=${whatsappMsg}`;
				});
			//empty the values
			document.querySelector('#room-name').value = '';
			document.querySelector('#your-name').value = '';
			document.querySelector('#subject').value = '';
			document.querySelector('#end-date').value = '';
			document.querySelector('#start-date').value = '';
			const dateThing = new Date();
			const date = dateThing.getDate();
			const month = dateThing.getMonth();
			const year = dateThing.getFullYear();
			const hour = dateThing.getHours();
			const min = dateThing.getMinutes();
			const completeDate = `${date}/${month}/${year} ${hour}:${min}`;
			let dataStart = `${startingDate.replace('T', ' ')}`;
			let dataEnd = `${startingDate.replace('T', ' ')}`;
			const data = {
				yourName,
				meetingSubject,
				completeDate,
				roomLink,
				dataStart,
				dataEnd,
				roomId,
			};
			const options = {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
			};
			fetch('/api', options);
		} else {
			document.querySelector('#err-msg').innerHTML = 'All fields are required';
		}
	});

	//When the 'Enter room' button is clicked.
	document.getElementById('enter-room').addEventListener('click', (e) => {
		e.preventDefault();

		let name = document.querySelector('#username').value;

		if (name) {
			//remove error message, if any
			document.querySelector('#err-msg-username').innerHTML = '';

			//save the user's name in sessionStorage
			sessionStorage.setItem('username', name);

			//reload room
			location.reload();
		} else {
			document.querySelector('#err-msg-username').innerHTML =
				'Please Write your name';
		}
	});

	document.addEventListener('click', (e) => {
		if (e.target && e.target.classList.contains('expand-remote-video')) {
			helpers.maximiseStream(e);
		} else if (e.target && e.target.classList.contains('mute-remote-mic')) {
			helpers.singleStreamToggleMute(e);
		}
	});

	document.getElementById('closeModal').addEventListener('click', () => {
		helpers.toggleModal('recording-options-modal', false);
	});
	// let a = ["1", "1", "2", "3", "3", "1", "8"];
	// let unique = a.filter((item, i, ar) => ar.indexOf(item) === i);
	// console.log(unique);
});
