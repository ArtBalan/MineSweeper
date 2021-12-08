let modal = document.getElementById("modal");
let aboutBtn = document.getElementById('about-btn');
let closeBtn = document.getElementById('close-btn');


aboutBtn.addEventListener('click', () => {
	modal.classList.toggle('display-none');
});

closeBtn.addEventListener('click', () => {
	modal.classList.toggle('display-none');
});

// modal.addEventListener('click', (e)=>{
	// if(e.target != modal){
		// modal.classList.toggle('display-none');
	// }
// });
