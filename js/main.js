let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

function init() {
	handleResize();

	// Set up event listeners.
	window.addEventListener('resize', handleResize);
	// Kick off the update loop
	window.requestAnimationFrame(everyFrame);
}

function everyFrame() {
	update();
	render();
	requestAnimationFrame(everyFrame);
}

function update() {
}

function render() {
	const lineGap = 20;
	let ms = Date.now();

	// Clear last frame
	context.fillStyle = 'white';
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Draw lines
	context.beginPath();
	context.strokeStyle = 'blue';
	context.lineWidth = 2;
	let yGap = 0;
	let yStart = yGap + lineGap / 2;
	let yEnd = canvas.height - yGap - 0.25 * lineGap;
	for (let y = yStart; y <= yEnd; y += lineGap) {
		let gap = 0;
		let started = false;
		for (let x = gap; x < canvas.width - gap; x += 4) {
			let sineT = (x / 5 + ms / 100);
			let sineAmt = Math.sin((x - y) / 300 + ms / 1000);
			sineAmt = 0.5 + 0.5 * sineAmt;
			let sineVal = sineAmt * Math.sin(sineT);

			let randomVal = (Math.random() < 0.5) ? 1.2 : -0.2;
			randomVal = (1 - sineAmt) * randomVal;

			if (started) {
				context.lineTo(x, y + 0.4 * lineGap * (sineVal + randomVal));
			}
			else {
				context.moveTo(x, y + 0.4 * lineGap * (sineVal + randomVal));
				started = true;
			}
		}
	}
	context.stroke();
}

function easeInOut(t, amt) {
	let tPow = Math.pow(t, amt);
	return tPow / (tPow + Math.pow(1 - t, amt));
}

function everCloser(val) {
    if (val < 0.5) {
    	return val * Math.random();
    }
    else {
    	return val + (1 - val) * Math.random();
    }
}

function handleResize(evt) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	render();
}

init();