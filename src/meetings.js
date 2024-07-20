// @ts-nocheck
getData();
async function getData() {
	const respone = await fetch('/api');
	const data = await respone.json();
	// console.log(data);
	for (var item of data) {
		const root = document.createElement('p');
		const data = document.createElement('div');
		const script = document.createElement('span');
		script.innerHTML = `${item.meetingSubject} |  Room Link :- <a href='${item.roomLink}'>${item.roomLink}</a> | Date and Time Meeting Created :- ${item.completeDate}hrs | Scheduled Start Time :- ${item.dataStart}hrs | Scheduled End Time :- ${item.dataEnd}hrs<br /> <a href=''  id='${item._id}'>Delete</a> | <a style="color:#007BFF;cursor:pointer;text-decoration:dashed" id='${item.roomLink}'>Share On Whatsapp</a> `;
		data.append(script);
		root.append(data);
		document.body.appendChild(root);
		data.className = `card`;
		document.getElementById(`${item._id}`).addEventListener('click', () => {
			const meetingSubject = item.meetingSubject;
			const completeDate = item.completeDate;
			const roomLink = item.roomLink;
			const data = {
				meetingSubject,
				completeDate,
				roomLink,
			};
			const options = {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
			};
			fetch('/pi', options);
		});
		document
			.getElementById(`${item.roomLink}`)
			.addEventListener('click', () => {
				let whatsappMsg = `@${item.yourName} has invited you for a meeting for ${item.meetingSubject} , Scheduled Time :- ${item.dataStart}hrs to ${item.dataEnd}hrs, Meeting Link :- %0D%0A ${item.roomLink} , Meeting Id :- ${item.roomId}`;

				window.location = `https://api.whatsapp.com/send?text=${whatsappMsg}`;
			});
	}
}
