var cLog=(x)=>console.log(x)
$(document).ready(function() {

	function parseSounds(audios){
    var sounds = {}
    for(key in audios){
      sounds[key] = new Audio(audios[key])
    }
    return sounds
  }

	function setNodes(){
		var nodes = {}
		for (key in sounds){
			nodes[key] = new MediaElementAudioSourceNode(audCtx, { mediaElement: sounds[key] })
			nodes[key].connect(mainNode)
		}
		return nodes
	}



	function downloadLink(){
		rec.exportWAV(function(blob) {
      var url = URL.createObjectURL(blob);
			var audio = $('<audio>');
			audio.attr('controls', 'true')
			audio.attr('src', url)


			var btn = $('<button>');
			btn.html('rec on it')
			btn.attr('recording', 'n')

      // var href = document.createElement('a');
			// href.href = url;
			// href.download = new Date().toISOString() + '.wav';
			// href.innerHTML = href.download;

			var div = $('<div>');
      div.append(audio);
			div.append(btn);
			$('#reclist').append(div);

			btn.on('click', function(){
					// var btrack = audCtx.createMediaElementSource(audio)
					var audio = div.find('audio')[0]
					var recording = $(this).attr('recording')
					if(recording == 'n'){
						var sound = audCtx.createMediaElementSource(audio)
						sound.connect(mainNode)
						rec.clear()
						sound.currentTime = 0;
						rec.record()
						audio.play()
						btn.attr('recording', 'y')
						btn.css('color', 'red')
					}else if(recording == 'y'){
						rec.stop()
						audio.pause()
						downloadLink()
						btn.attr('recording', 'n')
						btn.css('color', 'black')
					}
			});

      // div.append(href);
		});
	}

//------------init-----------------------
	if (!window.audCtx){window.audCtx = new AudioContext()}
	var sounds = parseSounds(audios)
	var mainNode =  audCtx.createGain()
	mainNode.connect(audCtx.destination)
	var nodes = setNodes()
	var rec = new Recorder(mainNode)

// --------------------------------------

	$("#rec").on('click', function(){
		var recording = $(this).attr('recording')
		if(recording == 'n'){
			rec.clear()
			rec.record()
			$(this).attr('recording', 'y')
			$(this).css('color', 'red')
		}else if(recording == 'y'){
			rec.stop()
			downloadLink()
			$(this).attr('recording', 'n')
			$(this).css('color', 'black')
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
