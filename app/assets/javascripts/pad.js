var c_log = (x)=>console.log(x)
$(document).ready(function() {

	function setNodes(){
		function connectNodes(){
			for(key in nodes){
				nodes[key].connect(mainNode)		
			}
		}

		var nodes = {}
		for (key in sounds){
			nodes[key] = new MediaElementAudioSourceNode(audCtx, { mediaElement: sounds[key] })
		}
		connectNodes()
		return nodes
	}

	function downloadLink(){
		rec.exportWAV(function(blob) {
      var url = URL.createObjectURL(blob);
      var li = document.createElement('li');
      var au = document.createElement('audio');
      var hf = document.createElement('a');
      var reclist = $('#reclist')
      
      au.controls = true;
      au.src = url;
      hf.href = url;
      hf.download = new Date().toISOString() + '.wav';
      hf.innerHTML = hf.download;
      li.append(au);
      li.append(hf);
      reclist.append(li);
    });
	}

//------------init-----------------------

	var audCtx = new AudioContext()
	var sounds = parseSounds()
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
		sound.currentTime = 0
		sound.play()
	})
})