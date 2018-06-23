import anime from 'animejs'

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

for (let node of document.querySelectorAll('h2 a')) {
	node.addEventListener('mouseenter', evt => {
		anime.remove(evt.target);
		anime({
		  targets: evt.target,
		  scale: 1.1,
		  duration: 500,
		});
	});
	node.addEventListener('mouseleave', evt => {
		anime.remove(evt.target);
		anime({
		  targets: evt.target,
		  scale: 1.0,
		  duration: 500,
		});
	});
}