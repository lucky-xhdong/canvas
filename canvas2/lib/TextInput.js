(function (cjs){
	var debugMode = false;
	function TextInput(opt){
		this.dom = null;
		this.container = null;
		this._isShow = true;

		this._canvas = null;

		this.defaultOpt = {
			canvasWidth: 1280,
			canvasHeight: 720,
			container: document.getElementById('gameContainer'),

			x: 0,
			y: 0,
			width: 100,
			height: 50,
			padding: 5,
			color: '#000',
			fontSize: 28,
			fontFamily: '宋体',
			textAlign: 'center',
			zIndex: 1000,
		};

		this._init(opt);
		this._handleEvents();
	}

	TextInput.prototype.text = function(){
		if(!this.dom) return '';
		return this.dom.value;
	}

	TextInput.prototype.clear = function(){
		if(this.dom) {
			this.dom.value = '';
		}
	}

	TextInput.prototype.reset = function(){
		this.clear();
		this.show();
	}

	TextInput.prototype.isShow = function(){
		return this._isShow;
	}

	TextInput.prototype.show = function(){
		this._isShow = true;
		this._setVisible();
	}

	TextInput.prototype.hide = function(){
		this._isShow = false;
		this._setVisible();
	}

	TextInput.prototype.setStyle = function(opt){
		if(!this.dom) return;
		var style = this.dom.style;
		extend(opt, this.defaultOpt);

		var w = this.defaultOpt.canvasWidth;
		var h = this.defaultOpt.canvasHeight;

		if(opt.y) {
			style.top = opt.y / h * 100 + '%';
		}
		if(opt.x) {
			style.left = opt.x / w * 100 + '%';
		}
		if(opt.width) {
			style.width = opt.width / w * 100 + '%';
		}
		if(opt.height) {
			// style.height = opt.height / h * 100 + '%';
		}

		if(opt.padding) {
			this._setTextPadding(opt.padding);
		}
		if(opt.zIndex) {
			style.zIndex = opt.zIndex;
		}

		if(opt.color) {
			style.color = opt.color;
		}
		if(opt.fontFamily) {
			style.fontFamily = opt.fontFamily;
		}

		if(opt.textAlign) {
			style.textAlign = opt.textAlign;
		}

		if(opt.fontSize) {
			this._setFontSize(opt.fontSize);
		}
	}

	TextInput.prototype.update =  function(){
		this.setStyle(this.defaultOpt);
	}

	TextInput.prototype.disable = function() {
		this.dom.setAttribute('readonly', 'true');
	}

	TextInput.prototype.enable = function() {
		this.dom.removeAttribute('readonly');
	}


	TextInput.prototype._init = function(opt){
		extend(opt, this.defaultOpt);
		var element = document.createElement('input');

		this.dom = element;
		this._canvas = document.getElementById('canvas');

		var defaultOpt = this.defaultOpt;
		this.container = defaultOpt.container;

		this.container.appendChild(element);

		element.type = 'text';
		var style = element.style;
		style.zIndex = defaultOpt.zIndex;
		style.fontFamily = defaultOpt.fontFamily;
		style.position = 'absolute';
		style.top = 0;
		style.left = 0;
		style.boxSizing = 'border-box';
		style.outline = 'none';
		// style.border = 'none';
		style.border = debugMode ? '1px solid #000' : 'none';
		style.background = 'transparent';

		this.setStyle(this.defaultOpt);
	}

	TextInput.prototype._handleEvents = function () {

	}

	TextInput.prototype._setVisible = function(){
		var str = this._isShow ? 'block' : 'none';
		this.dom.style.display = str;
	}

	TextInput.prototype._setTextPadding = function (val) {
		val = parseInt(val);
		var scale = this._canvas.width / this.defaultOpt.canvasWidth;
		var style = this.dom.style;
		// style.padding = val / 16 * scale + 'em';
	}

	TextInput.prototype._setFontSize = function (size) {
		size = size || defaultOpt.fontSize;
		size = parseInt(size);
		var scale = this._canvas.width / this.defaultOpt.canvasWidth;
		var style = this.dom.style;
		// style.fontSize = size / 16 * scale + 'em';
		style.fontSize = size * scale / 16 * 100 + '%';
	}

	TextInput.debug = function(bool) {
		debugMode = bool;
	}

	var extend = function(source, target) {
		for(var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }

        return target;
	}

	TextInput.version = '0.1.2';

	cjs.TextInput = TextInput;
})(createjs || {});