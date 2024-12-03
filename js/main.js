import anime from 'animejs';

anime.timeline({
	loop: true
})
.add({
	targets: '.hello span',
	translateY: -10,
	easing: 'easeInOutQuad',
	loop: true,
	delay: (el, i) => i * 100,
})
.add({
	targets: '.hello span',
	translateY: 0,
	easing: 'easeInOutQuad',
	loop: true,
	delay: (el, i) => i * 100,
});
