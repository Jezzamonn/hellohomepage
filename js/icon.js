import { easeInOut } from "./easing";

let icons = [
    '10-sec.png',
    'bb1.png',
    'benson.png',
    'cool-girl.png',
    'duck.png',
    'flower.png',
    'frog.png',
    'goat.png',
    'hat.png',
    'higgs.png',
    'jez.png',
    'onelimb.png',
    'pressenter.png',
    'pretty-girl.png',
    'shovelware-knight.png',
    'slime.png',
    'tw.png',
    'ukulele.png',
    'vuel.png',
    'yalgth.png',
    'zeta.png',
]

const iconSize = 100;
const iconScale = 0.5;

export default class Icon {

    constructor(radius, angle, frequency) {
        this.image = new Image();
        this.imageLoaded = false;
        this.image.onload = () => this.imageLoaded = true;

        this.nextImage = new Image();
        this.nextImageLoaded = false;
        this.nextImage.onload = () => this.nextImageLoaded = true;

        this.radius = radius;
        this.angle = angle;
        this.frequency = frequency;

        this.transitioning = false;
        this.transitionAmt = 0;

        this.imageIndex = randomInt(icons.length);
        this.nextImageIndex = nextRandomInt(icons.length, this.imageIndex);

        this.updateImages();
    }

    updateImages() {
        // Update/Load images
        this.image.src = 'icons/' + icons[this.imageIndex];
        this.nextImage.src = 'icons/' + icons[this.nextImageIndex];
    }

    update(dt) {
        // Move
        this.angle += this.frequency * dt;

        // Transition to next image
        if (this.transitioning) {
            this.transitionAmt += dt / 2;
            if (this.transitionAmt > 1) {
                this.transitionAmt = 0;
                this.transitioning = false;
    
                this.imageIndex = this.nextImageIndex;
                this.nextImageIndex = nextRandomInt(icons.length, this.nextImageIndex);
                this.updateImages();
            }
        }
        else {
            if (Math.random() < 0.002) {
                this.transitioning = true;
            }
        }
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    render(context) {
        let baseX = this.radius * Math.cos(this.angle);
        let baseY = this.radius * Math.sin(this.angle);
        let mainIconSize = iconScale * iconSize;
        if (this.imageLoaded) {
            context.drawImage(
                this.image,
                baseX - 0.5 * mainIconSize,
                baseY - 0.5 * mainIconSize,
                mainIconSize,
                mainIconSize);
        }
        if (this.nextImageLoaded) {
            let amt = easeInOut(this.transitionAmt, 2);
            let subAngle = 2 * Math.PI * amt + this.angle;
            let nextIconSize = iconScale * iconSize * amt;
            let subX = 0.5 * (mainIconSize - nextIconSize) * Math.cos(subAngle);
            let subY = 0.5 * (mainIconSize - nextIconSize) * Math.sin(subAngle);
            context.drawImage(
                this.nextImage,
                baseX + subX - 0.5 * nextIconSize,
                baseY + subY - 0.5 * nextIconSize,
                nextIconSize,
                nextIconSize);
        }
    }

}

function randomInt(range) {
    return Math.floor(Math.random() * range);
}

function nextRandomInt(range, exclude) {
    let val = randomInt(range - 1);
    if (val >= exclude) {
        val += 1;
    }
    return val;
}
