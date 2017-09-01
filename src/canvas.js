class Canvas {
	constructor(node) {
		this.canvas = node;
		this.canvas.width = 544;
		this.canvas.height = 300;
		this.canvas.style.width  = '544px';
		this.canvas.style.height = '300px';
		this.context = node.getContext("2d");
		this.context.lineJoin = "round";
		this.lineWidth = 3;
		this.color = 'black';
		this.activeLine = {};
		this.paintedLines = [];
		this.paint = false;
		this.resizeDifference = 1;

		this.watchers();
	}

	addPoint (addX, addY, point) {
		//console.log(addX, addY, point);
		if (point === 'start') {
			this.activeLine.x = addX / this.resizeDifference;
			this.activeLine.y = addY / this.resizeDifference;
		}
		else {
			this.paintedLines.pop();
		}
		this.paintedLines.push({
			start: {
				x: this.activeLine.x / this.resizeDifference,
				y: this.activeLine.y / this.resizeDifference,
			},
			end: {
				x: addX / this.resizeDifference,
				y: addY / this.resizeDifference
			},
			color: this.color,
			width: this.lineWidth
		});
		this.redraw();
	}

	redraw () {
		console.log(this);
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.paintedLines.forEach(line => {
			this.context.lineWidth = line.width;
			this.context.strokeStyle = line.color;
			this.context.beginPath();
			this.context.moveTo(line.start.x, line.start.y);
			this.context.lineTo(line.end.x, line.end.y);
			this.context.closePath();
			this.context.stroke();
		})
	}

	watchers () {
		this.canvas.addEventListener("mousedown", e => {
			console.log(e);
			e.preventDefault();
			e.stopPropagation();
			this.paint = !this.paint;
			if (this.paint) {
			this.addPoint(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop, 'start');
			} else {
			this.addPoint(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop);
			}
		}, true);
		this.canvas.addEventListener("mousemove", e => {
			e.preventDefault();
			e.stopPropagation();
			if (this.paint) {
			this.addPoint(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop);
			}
		}, true);
	}
}





export default Canvas;
