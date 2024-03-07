//Initialize function
var init = function () {
    // TODO:: Do your initialization job
    console.log('init() called');
    
    document.addEventListener('visibilitychange', function() {
        if(document.hidden){
            // Something you want to do when hide or exit.
        } else {
            // Something you want to do when resume.
        }
    });
 
    // add eventListener for keydown
    document.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
    	case 37: //LEFT arrow
    		break;
    	case 38: //UP arrow
    		break;
    	case 39: //RIGHT arrow
    		break;
    	case 40: //DOWN arrow
    		break;
    	case 13: //OK button
    		break;
    	case 10009: //RETURN button
		tizen.application.getCurrentApplication().exit();
    		break;
    	default:
    		console.log('Key code : ' + e.keyCode);
    		break;
    	}
    });
    
};

// window.onload can work without <body onload="">
window.onload = init;

const intervalID = setInterval(insertList, 5000);


insertList();
async function insertList() {
	const response = await fetch('https://thankful-globally-kangaroo.ngrok-free.app/tickets', {
		method: 'GET',
		mode: 'cors',
		headers: {
  			'ngrok-skip-browser-warning': 'true'
		}
	});

	var jsonData = await response.json();
	var listDiv = document.getElementById('list');
	listDiv.innerHTML = ''; 

	for (var i = 0; i < jsonData.length; i++) {
		var newParagraph = document.createElement('p'); 
		newParagraph.style.display = 'flex'; 
		newParagraph.style.flexDirection = 'row';
		newParagraph.style.alignItems = 'center'; 
		newParagraph.style.borderBottom = 'solid gray';

		var ticketImg = document.createElement('img'); 
		ticketImg.src = 'images/ticket.png';
		ticketImg.style.width = '50px';
		newParagraph.appendChild(ticketImg);

		for(var key in jsonData[i]) {
			var text = document.createElement('span');
			switch (key) {
				case 'ticketNo':
					text.style.width = '100px';
					break;
				case 'pcId':
					text.style.width = '50px'
					break; 
				case 'subject':
					text.style.width = '200px'
					text.style.fontSize = '20px';
					break; 
				case 'name':
					text.style.width = '170px'
					text.style.fontSize = '20px';
					break; 
				case 'email':
					text.style.width = '260px'
					text.style.fontSize = '19px'
					break; 
				case 'ext':
					text.style.width = '50px'
					break; 
			}
			if (key === 'subject') {
				text.textContent = jsonData[i][key].replace('New Ticket Created: ', '');
			} else {
				text.textContent = jsonData[i][key];
			}
			newParagraph.appendChild(text);
		}

		listDiv.appendChild(newParagraph)

	}

}