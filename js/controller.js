import Icon from "./icon";

export default class Controller {

	constructor() {
		this.icons = [];
		
		for (let i = 1; i < 10; i ++) {
			let dir = (i % 2 == 0) ? -1 : 1;
			this.addIconCircle(70 * (i - 0.1), 5 * i, dir * (25 + 10 * i));
		}
	}

	addIconCircle(radius, numIcons, speed) {
		let frequency = speed / radius;
		for (let i = 0; i < numIcons; i ++) {
			let amt = i / numIcons;
			let icon = new Icon(radius, 2 * Math.PI * amt, frequency);
			this.icons.push(icon);
		}
	}

	update() {
		this.icons.forEach(icon => icon.update(1 / 60));
	}

	render(context) {
		// TODO: Some rendering logic
		this.icons.forEach(icon => icon.render(context));
	}

}
