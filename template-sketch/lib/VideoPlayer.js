/**
 * By Hz
 * 201612171043
 */
(function(){
	var videoPlayer = null;

	function VideoPlayer () {
		this.url = null;
		this.isPlaying = false;
		this.volume = 1;

		this.container = null;
		this.player = null;

		//callbacks
		this.onUpdate = null;
		this.onEnded = null;
	}

	VideoPlayer.prototype.init = function (opt) {
		this.container = opt.container || document.body;

		this.player = document.createElement('video');
		this.container.appendChild(this.player);
		var style = this.player.style;
		style.position = 'absolute';
		style.top = opt.top || 0;
		style.left = opt.left || 0;
		style.width = opt.width || '1px';
		style.height = opt.height || '1px';
		style.zIndex = opt.zIndex || '998';

		this.player.setAttribute('webkit-playsinline', true);
		this.player.setAttribute('playsinline', true);

		// this.player.setAttribute('controls', true);

		if(opt.url){
			this.setUrl(opt.url);
		}

		this._handleEvents();
	}

	VideoPlayer.prototype._handleEvents = function () {
		this.player.addEventListener("ended",this._playEndHandler.bind(this),false);
        this.player.addEventListener("error",this._playErrorHandler.bind(this),false);
        this.player.addEventListener("durationchange",this._durationChangeHandler.bind(this),false);
        this.player.addEventListener("timeupdate",this._timeUpdateHandler.bind(this),false);
	}

	VideoPlayer.prototype._playEndHandler = function (e) {
		this.isPlaying = false;
		if(this.onEnded) {
			this.onEnded();
		}
	}

	VideoPlayer.prototype._durationChangeHandler = function (e) {
		if(this.onDurationChange) {
			var duration = this.player.duration;
			var current = this.player.currentTime || 0;
			this.onDurationChange(current, duration);
		}
	}

	VideoPlayer.prototype._timeUpdateHandler = function (e) {
		if(this.onUpdate && this.isPlaying) {
			var duration = this.player.duration;
			var current = this.player.currentTime;
			this.onUpdate(current, duration);
		}
	}

	VideoPlayer.prototype._playErrorHandler = function (err) {
		alert("播放错误! " + ' code: ' + err.code + ' message: ' + err.message);
	}

	VideoPlayer.prototype.setUrl = function (url) {
		this.url = url;
		if(this.player) {
			this.player.src = url;
		}
	}

	VideoPlayer.prototype.play = function () {
		this.isPlaying = true;
		this.player.play();
	}

	VideoPlayer.prototype.stop = function () {
		this.pause();
		this.player.currentTime = 0;
	}

	VideoPlayer.prototype.resume = function () {
		this.play();
	}

	VideoPlayer.prototype.pause = function () {
		this.isPlaying = false;
		this.player.pause();
	}

	VideoPlayer.prototype.seekTo = function (time) {
		this.player.currentTime = time;
	}

	VideoPlayer.prototype.seekToPercent = function (percent) {
		this.player.currentTime = this.player.duration * percent;
	}

	VideoPlayer.prototype.setVolume = function (val) {
		if(this.player) {
			this.player.volume = val;
		}
	}

	VideoPlayer.getInstance = function () {
        if(!videoPlayer) {
            videoPlayer = new VideoPlayer();
        }
        return videoPlayer;
    }

    VideoPlayer.version = '0.1.3';

    videoPlayer = VideoPlayer.getInstance();
    window.videoPlayer = videoPlayer;
})();

(function(){
	var mediaPlayer = null;

	function MediaPlayer () {
		this.url = null;
		this.isPlaying = false;
		this.volume = 1;

		this.container = null;
		this.player = null;

		//callbacks
		this.onUpdate = null;
		this.onEnded = null;
	}

	MediaPlayer.prototype.init = function (opt) {
		this.container = opt.container || document.body;

		this.player = document.createElement('audio');
		this.container.appendChild(this.player);
		var style = this.player.style;
		style.position = 'absolute';
		style.top = opt.top || 0;
		style.left = opt.left || 0;
		style.width = opt.width || '1px';
		style.height = opt.height || '1px';
		style.zIndex = opt.zIndex || '998';

		// this.player.setAttribute('controls', true);

		if(opt.url){
			this.setUrl(opt.url);
		}

		this._handleEvents();
	}

	MediaPlayer.prototype._handleEvents = function () {
		this.player.addEventListener("ended",this._playEndHandler.bind(this),false);
        this.player.addEventListener("error",this._playErrorHandler.bind(this),false);
        this.player.addEventListener("durationchange",this._durationChangeHandler.bind(this),false);
        this.player.addEventListener("timeupdate",this._timeUpdateHandler.bind(this),false);
	}

	MediaPlayer.prototype._playEndHandler = function (e) {
		this.isPlaying = false;
		if(this.onEnded) {
			this.onEnded();
		}
	}

	MediaPlayer.prototype._durationChangeHandler = function (e) {
		if(this.onDurationChange) {
			var duration = this.player.duration;
			var current = this.player.currentTime || 0;
			this.onDurationChange(current, duration);
		}
	}

	MediaPlayer.prototype._timeUpdateHandler = function (e) {
		if(this.onUpdate && this.isPlaying) {
			var duration = this.player.duration;
			var current = this.player.currentTime;
			this.onUpdate(current, duration);
		}
	}

	MediaPlayer.prototype._playErrorHandler = function (err) {
		alert("播放错误! " + ' code: ' + err.code + ' message: ' + err.message);
	}

	MediaPlayer.prototype.setUrl = function (url) {
		this.url = url;
		if(this.player) {
			this.player.src = url;
		}
	}

	MediaPlayer.prototype.play = function () {
		this.isPlaying = true;
		this.player.play();
	}

	MediaPlayer.prototype.stop = function () {
		this.pause();
		this.player.currentTime = 0;
	}

	MediaPlayer.prototype.resume = function () {
		this.play();
	}

	MediaPlayer.prototype.pause = function () {
		this.isPlaying = false;
		this.player.pause();
	}

	MediaPlayer.prototype.seekTo = function (time) {
		this.player.currentTime = time;
	}

	MediaPlayer.prototype.seekToPercent = function (percent) {
		this.player.currentTime = this.player.duration * percent;
	}

	MediaPlayer.prototype.setVolume = function (val) {
		if(this.player) {
			this.player.volume = val;
		}
	}

	MediaPlayer.getInstance = function () {
        if(!mediaPlayer) {
            mediaPlayer = new MediaPlayer();
        }
        return mediaPlayer;
    }

    MediaPlayer.version = '0.1.0';

    mediaPlayer = MediaPlayer.getInstance();
    window.mediaPlayer = mediaPlayer;
})();

(function(cjs){
	var mcPlayer = null;

	function MCPlayer() {
		this.component = null;

		this.isPlaying = false;
		this.fps = 24;

		//callbacks
		this.onUpdate = null;
		this.onEnded = null;
		this.onDurationChange = null;
	}

	/**
	 * private
	 */

	MCPlayer.prototype._getDuration = function(){
		if(!this.component) return 0;
		return this.component.totalFrames / this.fps;
	}

	MCPlayer.prototype._getCurrentTime = function(){
		if(!this.component) return 0;
		return this.component.currentFrame / this.fps;
	}

	MCPlayer.prototype._convertTimeToFrame = function(time){
		return parseInt(time * this.fps);
	}

	MCPlayer.prototype._handleEvents =  function(){
		if(!this.component) return;

		this.component.on('tick', this._onUpdate.bind(this));
	}

	MCPlayer.prototype._onUpdate = function(){
		if(this.onUpdate) {
			var duration = this._getDuration();
			var current = this._getCurrentTime();
			this.onUpdate(current, duration);
		}

		var current = this.component.currentFrame;
		var total = this.component.totalFrames;
		if(current == total) {
			this.pause();

			if(this.onEnded) {
				this.onEnded();
			}
		}
	}

	MCPlayer.prototype._durationChangeHandler = function(){
		if(this.onDurationChange) {
			var duration = this._getDuration();
			var current = this._getCurrentTime();
			this.onDurationChange(current, duration);
		}
	}

	/**
	 * public
	 */
	MCPlayer.prototype.init = function(opt){
		if(!opt.component) {
			console.error("未指定播放的影片剪辑对象", opt);
			return;
		}
		
		this.setComponent(opt.component);

		opt.container.addChild(opt.component);

		this._handleEvents();
		this._durationChangeHandler();
	}

	MCPlayer.prototype.setComponent = function(mc){
		mc.gotoAndStop(0);

		this.component = mc;
	}

	MCPlayer.prototype.play = function(){
		this.isPlaying = true;
		if(this.component) {
			this.component.play();
			if(this.component.currentFrame == this.component.totalFrames) {
				this.component.gotoAndPlay(0);
			}
		}
	}

	MCPlayer.prototype.pause = function(){
		this.isPlaying = false;
		if(this.component) {
			this.component.stop();
		}
	}

	MCPlayer.prototype.resume = function(){
		this.play();
	}

	MCPlayer.prototype.stop = function(){
		this.pause();
		this.seekTo(0);
	}

	MCPlayer.prototype.seekTo = function(time){
		if(!this.component) return;
		var frame = this._convertTimeToFrame(time);
		if(this.isPlaying) {
			this.component.gotoAndPlay(frame);
		}else{
			this.component.gotoAndStop(frame);
		}
	}

	MCPlayer.prototype.seekToPercent = function(percent){
		var duration = this._getDuration();
		var time = duration * percent;
		this.seekTo(time);
	}

	MCPlayer.getInstance = function () {
		if(!mcPlayer) {
			mcPlayer = new MCPlayer();
		}
		return mcPlayer;
	}

	MCPlayer.version = '0.1.0';

	window.mcPlayer = MCPlayer.getInstance();
})(createjs || {});

(function(cjs){
	var mcAudioPlayer = null;

	function MCAudioPlayer() {
		this.component = null;
		this.audio = null;

		this.audioUrl = '';
		this.isPlaying = false;
		this.volume = 1;
		this.fps = 24;

		//callbacks
		this.onUpdate = null;
		this.onEnded = null;
		this.onDurationChange = null;

		this._setUpAudio();
	}

	/**
	 * private
	 */
	MCAudioPlayer.prototype._setUpAudio = function(){
		var audio = document.createElement('audio');
		audio.setAttribute('controls', true);
		audio.style.opacity = 0;
		audio.style.position = 'absolute';
		audio.style.left = '0';
		audio.style.top = '0';
		this.audio = audio;
	}

	/**
	 * private
	 */

	MCAudioPlayer.prototype._getDuration = function(){
		if(!this.component) return 0;
		return this.component.totalFrames / this.fps;
	}

	MCAudioPlayer.prototype._getCurrentTime = function(){
		if(!this.component) return 0;
		return this.component.currentFrame / this.fps;
	}

	MCAudioPlayer.prototype._convertTimeToFrame = function(time){
		return parseInt(time * this.fps);
	}

	MCAudioPlayer.prototype._handleEvents =  function(){
		if(!this.component) return;

		this.component.on('tick', this._onComponentUpdate.bind(this));

		this.audio.addEventListener("ended",this._playEndHandler.bind(this),false);
        this.audio.addEventListener("error",this._playErrorHandler.bind(this),false);
        this.audio.addEventListener("durationchange",this._durationChangeHandler.bind(this),false);
        this.audio.addEventListener("timeupdate",this._timeUpdateHandler.bind(this),false);
        this.audio.addEventListener("canplaythrough",this._canplayThrough.bind(this),false);
	}

	MCAudioPlayer.prototype._onComponentUpdate = function(){
		if(this.onUpdate) {
			var duration = this._getDuration();
			var current = this._getCurrentTime();
			this.onUpdate(current, duration);
		}

		var current = this.component.currentFrame;
		var total = this.component.totalFrames;
		if(current == total) {
			this.pause();

			this.isPlaying = false;
			if(this.onEnded) {
				this.onEnded();
			}
		}
	}

	MCAudioPlayer.prototype._playEndHandler = function (e) {
		
	}

	MCAudioPlayer.prototype._durationChangeHandler = function(){
		if(this.onDurationChange) {
			/*var duration = this.audio.duration;
			var current = this.audio.currentTime || 0;*/
			var duration = this._getDuration();
			var current = this._getCurrentTime();
			this.onDurationChange(current, duration);
		}
	}


	MCAudioPlayer.prototype._timeUpdateHandler = function (e) {
		/*if(this.onUpdate) {
			var duration = this.audio.duration;
			var current = this.audio.currentTime;
			this.onUpdate(current, duration);
		}*/
	}

	MCAudioPlayer.prototype._canplayThrough = function(e){
	}

	MCAudioPlayer.prototype._playErrorHandler = function (err) {
		alert("播放错误! " + ' code: ' + err.code + ' message: ' + err.message);
	}

	/**
	 * public
	 */
	MCAudioPlayer.prototype.init = function(opt){
		if(!opt.component) {
			console.error("未指定播放的影片剪辑对象", opt);
			return;
		}
		
		this.setComponent(opt.component);

		// opt.container.addChild(opt.component);
		document.body.appendChild(this.audio);

		this.setAudioUrl(opt.audio);

		this._handleEvents();
	}

	MCAudioPlayer.prototype.setComponent = function(mc){
		mc.gotoAndStop(0);

		this.component = mc;
	}

	MCAudioPlayer.prototype.setAudioUrl = function(url){
		this.audioUrl = url;
		this.audio.src = url;
	}

	MCAudioPlayer.prototype.play = function(){
		this.isPlaying = true;
		if(this.component) {
			this.component.play();
			if(this.component.currentFrame == this.component.totalFrames) {
				this.component.gotoAndPlay(0);
				this.audio.currentTime = 0;
			}
		}
		this.audio.play();
		this.audio.volume = 1;
	}

	MCAudioPlayer.prototype.pause = function(){
		this.isPlaying = false;
		if(this.component) {
			this.component.stop();
		}
		this.audio.pause();
	}

	MCAudioPlayer.prototype.resume = function(){
		this.play();
	}

	MCAudioPlayer.prototype.stop = function(){
		this.pause();
		this.seekTo(0);
		this.audio.currentTime = 0;
	}

	MCAudioPlayer.prototype.seekTo = function(time){
		if(!this.component) return;
		var frame = this._convertTimeToFrame(time);
		if(this.isPlaying) {
			this.component.gotoAndPlay(frame);
		}else{
			this.component.gotoAndStop(frame);
		}

		if(time > this.audio.duration) {
			this.audio.pause();
			return;
		}
		this.audio.currentTime = time;
		if(this.isPlaying && this.audio.paused) {
			this.audio.play();
		}
	}

	MCAudioPlayer.prototype.seekToPercent = function(percent){
		if(!this.audio || !this.audio.duration) return;
		var duration = this._getDuration();
		var time = duration * percent;
		this.seekTo(time);
	}

	MCAudioPlayer.prototype.setVolume = function(val){
		if(this.audio) {
			this.audio.volume = val;
		}
	}

	MCAudioPlayer.getInstance = function () {
		if(!mcAudioPlayer) {
			mcAudioPlayer = new MCAudioPlayer();
		}
		return mcAudioPlayer;
	}

	MCAudioPlayer.version = '0.1.1';

	window.mcAudioPlayer = MCAudioPlayer.getInstance();
})(createjs || {});