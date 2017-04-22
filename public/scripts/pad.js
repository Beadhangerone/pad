var clog=(x)=>console.dir(x)
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

	function stSet(name, val){
		sessionStorage.setItem(name, JSON.stringify(val))
	}
	function stAsk(name, defaul){
		var result = JSON.parse( sessionStorage.getItem(name) )
		return result?result:defaul
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
	function downloadLink(){
		rec.exportWAV(function(blob) {
			var id = stAsk('current_id', 1)
			var newRec = new Record(blob)
			records.push(newRec)
			stSet('records', records)
			stSet('current_id', id+1)
		})
	}
	function delRec(e){
		var id = e.data.id
		var div = e.data.div
		div.remove()
		for(var i in records){
			if(records[i].id == id){
				records.splice(i, 1)
				stSet('records', records)
			}
		}
	}

	class RecBtn{
		constructor(audio){
			var btn = $('<button>')
			btn.data('rec', false)
			if(audio){
				btn.html('REC on it')
				audCtx.createMediaElementSource(audio).connect(mainNode)//connect sound for rec it
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
	class Aud{
		constructor(blob,controls=true){
			var audio = $('<audio>')
			audio.attr('controls', controls)
			audio.attr('src', blob)
			return audio[0]
		}
	}
	class Delb{
		constructor(id, div){
			var delb = $('<i>')
			delb.addClass('fa fa-times')
			delb.on('click', {id:id, div:div}, delRec)
		 return delb
		}
	}

	class Record{
		constructor(blob){
			var id = stAsk('current_id', 1)
			var div = $('<div>')
			this.id = id
			this.blob = URL.createObjectURL(blob)
			// this.time = new Date().toISOString()
			// this.parent = parent

			var audio = new Aud(this.blob)
			var roib = new RecBtn(audio)
			var delb = new Delb(this.id, div)
			$(div).append(audio)
			$(div).append(roib)
			$(div).append(delb)
			$('#reclist').append( div )

		}
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
	var records = stAsk('records', [])
	for(var i in records){
		var record = records[i]
		var div = $('<div>')
		clog(record.blob)
		var audio = new Aud(record.blob)
		var roib = new RecBtn(audio)
		var delb = new Delb(record.id, div)

		$(div).append(audio)
		$(div).append(roib)
		$(div).append(delb)
		$('#reclist').append( div )
	}
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
