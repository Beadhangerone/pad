var c_log=(x)=>console.log(x)
$(document).ready(function() {

	function parseSounds(audios){
    var sounds = {}
    for(key in audios){
      sounds[key] = new Audio(audios[key])
    }
    c_log('parseSounds')
    return sounds
  }

	function setNodes(){
		var nodes = {}
		for (key in sounds){
			nodes[key] = new MediaElementAudioSourceNode(audCtx, { mediaElement: sounds[key] })
			nodes[key].connect(mainNode)
		}
		c_log('setNodes')
		return nodes
	}

	function downloadLink(){
		rec.exportWAV(function(blob) {
      var url = URL.createObjectURL(blob);
      var div = document.createElement('div');
      var audio = document.createElement('audio');
      var href = document.createElement('a');
      var reclist = $('#reclist')
      
      audio.controls = true;
      audio.src = url;
      href.href = url;
      href.download = new Date().toISOString() + '.wav';
      href.innerHTML = href.download;
      div.append(audio);
      div.append(href);
      reclist.append(div);
    });
	}

//------------init-----------------------

	var audCtx = new AudioContext()
	var sounds = parseSounds(audios)
	var mainNode =  audCtx.createGain()
	mainNode.connect(audCtx.destination)
	var nodes = setNodes()
	var rec = new Recorder(mainNode)

// --------------------------------------

	$("#rec").on('click', function(){
		if($(this).attr('recording') == 'n'){
			$(this).attr('recording', 'y')
			$(this).css('color', 'red')
			c_log('REC')
			rec.clear()
			rec.record()
		}else if($(this).attr('recording') == 'y'){
			$(this).attr('recording', 'n')
			$(this).css('color', 'black')
			rec.stop()
			c_log('STOP')
			downloadLink()
		}
	})

	$("body").on("keydown", function(e) {
		var index = e.which
		var sound = sounds[index]
		var key = $(`.key[data-key=${index}]`)
		if (!key.hasClass('pressed')){
			key.addClass('pressed')
			if (sound){
				sound.currentTime = 0
				sound.play()
			}
		}
		$(this).on("keyup", function(e){
			var index = e.which
			var key = $(`.key[data-key=${index}]`)
			key.removeClass('pressed')
		}) 
	})
})