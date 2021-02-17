"use strict"

class CanvScreen {
	
	inited = false;
	width = 20;
	height = 20;
	parentElementHandle;
	canvasHandle;
	context;
	resizeRatio = 1;
	
	
	constructor(elementID = undefined) {
		this.parentElementHandle = undefined;
		this.canvasHandle = undefined;
		this.context = undefined;
		this.inited = false;
		if(elementID != undefined) {
			this.init(elementID);
		}
	}
	
	init(elementID) {
		let h = $('#' + elementID);
		if(h.length != 0) {
			this.destroy();
			this.parentElementHandle = h;
			this.canvasHandle = $(`<canvas width="${this.width}" height="${this.height}" style="outline: none; border: none;">`)[0];
			this.parentElementHandle.append(this.canvasHandle);
			this.context = this.canvasHandle.getContext('2d');
			return this.inited = true;
		}
		return this.inited;
	}
	
	destroy() {
		this.width = 20;
		this.height = 20;
		this.parentElementHandle = undefined;
		if(this.canvasHandle != undefined && this.canvasHandle.length != 0) this.canvasHandle.remove();
		this.canvasHandle = undefined;
		this.context = undefined;
		this.inited = false;
		this.resizeRatio = 1;
	}
	
	resizeCanv(mode = 0, ratio = this.resizeRatio) { if(!this.inited) return;
		let dWidth = this.parentElementHandle.width(),
		dHeight = this.parentElementHandle.height(),
		prefWidth = dHeight * ratio,
		prefHeight = dWidth / ratio;
		
		if(mode == 0) {
			if(dWidth / ratio < dHeight) {
				this.width = dWidth;
				this.height = prefHeight;
			} else {
				this.width = prefWidth;
				this.height = dHeight;
			}
		}
		else if(mode == 1) {
			this.width = dWidth;
			this.height = prefHeight;
		}
		else if(mode == 2) {
			this.width = prefWidth;
			this.height = dHeight;
		} else { return; }
		
		let h = this.canvasHandle;
		h.width = this.width;
		h.height = this.height;
	}
	
	
	setColor(color) { if(!this.inited) return;
		if(!color || color == '') color = '#666';
		let c = (color[0] == '#' ? color : '#' + color);
		this.context.fillStyle = c;
		this.context.strokeStyle = c;
	}
	
	setForDrawing(color, lineWidth = 1) { if(!this.inited) return;
		let h = this.context;
		h.beginPath();
		this.setColor(color);
		h.lineWidth = lineWidth;
		return h;
	}
	
	clear() { if(!this.inited) return;
		this.context.clearRect(0, 0, this.width, this.height);
	}
	
	drawLine(unit_x1, unit_y1, unit_x2, unit_y2, color = null, lineWidth = 1) { if(!this.inited) return;
		let h = this.setForDrawing(color, lineWidth);
		h.moveTo(unit_x1 * this.width, unit_y1 * this.height);
		h.lineTo(unit_x2 * this.width, unit_y2 * this.height);
		h.stroke();
	}
	
	drawRect_abs(unit_x1, unit_y1, unit_x2, unit_y2, fill = true, color = null, lineWidth = 1) { if(!this.inited) return;
		if(unit_x1 > unit_x2 || unit_y1 > unit_y2) return -1;
		let h = this.setForDrawing(color, lineWidth);
		h.rect(unit_x1 * this.width, unit_y1 * this.height, unit_x2 * this.width - unit_x1 * this.width, unit_y2 * this.height - unit_y1 * this.height);
		if(fill) h.fill();
		else h.stroke();
	}
	
	drawRect(unit_x, unit_y, unit_size_x, unit_size_y, fill = true, color = null, lineWidth = 1) { if(!this.inited) return;
		let h = this.setForDrawing(color, lineWidth);
		h.rect(unit_x * this.width, unit_y * this.height, unit_size_x * this.width, unit_size_y * this.height);
		if(fill) h.fill();
		else h.stroke();
	}
	
	drawRect_posObj(pos, unit_size_x, unit_size_y, fill = true, color = null, lineWidth = 1) { if(!this.inited) return;
		let h = this.setForDrawing(color, lineWidth);
		h.rect(pos.X * this.width, pos.Y * this.height, unit_size_x * this.width, unit_size_y * this.height);
		if(fill) h.fill();
		else h.stroke();
	}
	
};