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

	function startRec(btn){
		rec.clear()
		rec.record()
		btn.attr('recording', 'y')
		btn.css('color', 'red')
	}
	function stopRec(btn){
		rec.stop()
		downloadLink()
		btn.attr('recording', 'n')
		btn.css('color', 'black')
	}
	function recOnIt(e){
		var btn = e.data.btn
		var audio = e.data.audio
		var recording = btn.attr('recording')
		if(recording == 'n'){
			audio.currentTime = 0
			audio.play()
			startRec(btn)
		}else if(recording == 'y'){
			stopRec(btn)
			audio.pause()
		}
	}
	function delRec(e){
		var id = e.data.id
		var div = e.data.div
		cLog(`deleting`)
		cLog(id)
		div.remove()
		for(var i in records){
			if(records[i].id == id){
				records.splice(i, 1)
			}
		}
	}

	class Record{
		constructor(blob){
			this.blob = URL.createObjectURL(blob)
			// this.parent = parent
			this.id = id++
			this.time = new Date().toISOString()

			var audio = $('<audio>')
			audio.attr('controls', 'true')
			audio.attr('src', this.blob)

			var roib = $('<button>')
			roib.html('rec on it')
			roib.attr('recording', 'n')

			var delb = $('<i>')
			delb.addClass('fa fa-times')

			var div = $('<div>')
			$(div).append( audio )
			$(div).append( roib )
			$(div).append(delb)
			$('#reclist').append( div )

			var audio = div.find('audio')[0]
			var sound = audCtx.createMediaElementSource(audio)
			sound.connect(mainNode)

			roib.on('click', {btn:roib, audio:audio}, recOnIt)
			delb.on('click', {id:this.id, div:div}, delRec)

		}
	}

	function downloadLink(){
		rec.exportWAV(function(blob) {
			var newRec = new Record(blob)
			records.push(newRec)
		})
	}


//------------init-----------------------
	if (!window.audCtx){window.audCtx = new AudioContext()}
	var sounds = parseSounds(audios)
	var mainNode = audCtx.createGain()
	mainNode.connect(audCtx.destination)
	var nodes = setNodes()
	var rec = new Recorder(mainNode)
	var records = []
	var id = 1

// --------------------------------------

	$("#rec").on('click', function(){
		var recording = $(this).attr('recording')
		if(recording == 'n'){
			startRec( $(this) )
		}else if(recording == 'y'){
			stopRec( $(this) )
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
