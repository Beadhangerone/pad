var clog=(x)=>console.log(x)
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
		btn.data('rec', true)
		btn.css('color', 'red')
	}
	function stopRec(btn){
		rec.stop()
		downloadLink()
		btn.data('rec', false)
		btn.css('color', 'black')
	}

	function delRec(e){
		var id = e.data.id
		var div = e.data.div
		div.remove()
		for(var i in records){
			if(records[i].id == id){
				records.splice(i, 1)
			}
		}
	}

	class RecBtn{
		constructor(audio){
			var btn = $('<button>')
			btn.data('rec', false)
			if(audio){
				btn.html('REC on it')
				var sound = audCtx.createMediaElementSource(audio)
				sound.connect(mainNode)
				btn.on('click', function(){
					var rec = $(this).data('rec')
					if(!rec){
						audio.currentTime = 0
						audio.play()
						startRec($(this))
					}else if(rec){
						stopRec($(this))
						audio.pause()
						audio.currentTime = 0
					}
				})
			}else if(!audio){
				btn.html('REC')
				btn.on('click', function(){
					var rec = $(this).data('rec')
					if(!rec){
						startRec($(this))
					}else if(rec){
						stopRec( $(this) )
					}
				})
			}
			return btn
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

			var delb = $('<i>')
			delb.addClass('fa fa-times')

			var div = $('<div>')
			$(div).append( audio )
			var audio = div.find('audio')[0]
			var roib = new RecBtn(audio)
			$(div).append( roib )
			$(div).append(delb)
			$('#reclist').append( div )

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
	var reclist = $('#reclist')
	var mainRec = new RecBtn()
	reclist.append(mainRec)
	var records = []
	var id = 1
// --------------------------------------

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
