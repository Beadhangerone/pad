var clog=(x)=>console.log(x)
$(document).ready(function() {
//------------CLASSES-----------------------
		class RecBtn{
			constructor(audio, parent = 'root'){
				var btn = $('<button>')
				btn.data('rec', false)
				btn.data('parent', parent)
				btn.addClass('rec-btn')
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
					});
				}else if(!audio){
					btn.html('REC')
					btn.on('click', function(){
						var rec = $(this).data('rec')
						if(!rec){
							startRec($(this))
						}else if(rec){
							stopRec($(this))
						}
					});
				}
				return btn
			}
		}
		class Aud{
			constructor(blob,controls=true){
				var audio = $('<audio>')
				audio.attr('controls', controls)
				var src = window.URL.createObjectURL(blob)
				audio.attr('src', src )
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
			constructor(id, blob, parent){
				this.id = id
				this.blob = blob
				this.parent = parent
			}
			pushRec(){
				var li = $('<li>')
				var div = $('<div class="record">')
				var audio = new Aud(this.blob)
				var roib = new RecBtn(audio, this.id)
				var delb = new Delb(this.id, div)
				div.append(audio)
				div.append(roib)
				div.append(delb)
				li.append(div)
				li.append($('<ul id='+this.id+'>'))
				var parrent_ul = reclist.find('ul#'+this.parent)
				parrent_ul.append( li )
			}
		}
//------------_CLASSES-----------------------

//------------INIT-----------------------
// -------INIT DB--------
	db = openDatabase("Recs", "0.1", "Records", 200000);
	if(!db){alert("Failed to connect to database. Try to refresh the page.");}
	db.transaction(function (tx) {
  	tx.executeSql('DROP TABLE Records');
	});
	db.transaction(function(tx){
		tx.executeSql(
			"CREATE TABLE IF NOT EXISTS Records (id INTEGER PRIMARY KEY, sound TEXT, parent TEXT)", [],
			null,null
		);
	})
// ------_INIT DB--------
	if (!window.audCtx){window.audCtx = new AudioContext()}
	var sounds = parseSounds(audios)
	var mainNode = audCtx.createGain()
	mainNode.connect(audCtx.destination)
	var nodes = setNodes()
	var rec = new Recorder(mainNode)

	var reclist = $('#reclist')
	reclist.children().remove()
	reclist.append( $("<ul id='root'>") )
	var main_rec = $('#main-rec')
	var mainRec = new RecBtn()
	main_rec.append(mainRec)
	getStoredRecs()
//-----------_INIT-----------------------

// -------DB FUNCTIONS--------
		function blobToBase64(blob, callback){
			var reader = new window.FileReader();
			reader.onloadend = function() {
				var res = reader.result
				var res = res.substr(res.indexOf(',')+1)
				callback(res)
			}
			reader.readAsDataURL(blob);
		}
		function base64ToBlob(b64Data){
			var byteCharacters = atob(b64Data);
			var byteNumbers = new Array(byteCharacters.length);
			for (var i = 0; i < byteCharacters.length; i++) {
				byteNumbers[i] = byteCharacters.charCodeAt(i);
			}
			var byteArray = new Uint8Array(byteNumbers);
			var blob = new Blob([byteArray], {type: 'audio/waw'});
			return blob
		}

		function getStoredRecs(){
			db.transaction(function(tx) {
				tx.executeSql(
					"SELECT * FROM Records", [],
					function(tx, result) {
						for(var i = 0; i < result.rows.length; i++) {
							var id = result.rows.item(i)['id']
							var b64 = result.rows.item(i)['sound']
							var parent = result.rows.item(i)['parent']
							var blob = base64ToBlob(b64)
							var rec = new Record(id, blob, parent)
							rec.pushRec()
						}
					},
					null
				);
			});
		}
		function pushRecToDB(b64, parent){
			db.transaction(function(tx) {
				tx.executeSql(
					"INSERT INTO Records (sound, parent) values(?, ?)", [b64, parent],
					function(tx, results){
                var id = results.insertId
								var blob = base64ToBlob(b64)
								var rec = new Record(id, blob, parent)
								rec.pushRec()
            },
						function errorHandler(tx, error) {
						    alert("Error : " + error.message);
						}
				);
			});
		}

		function DBdelRec(id){
			db.transaction(function(tx) {
				tx.executeSql(
					"DELETE FROM Records WHERE id = ?", [id],
					null,null
				);
			});
		}
// ------_DB FUNCTIONS--------

	function parseSounds(audios){
    var sounds = {}
    for(var key in audios){
      sounds[key] = new Audio(audios[key])
    }
    return sounds
  }

	function setNodes(){
		var nodes = {}
		for(var key in sounds){
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
		rec.exportWAV(function(blob) {
			blobToBase64(blob, function(b64){pushRecToDB(b64, btn.data('parent'))});
		});
		btn.data('rec', false)
		btn.css('color', 'black')
	}
	function delRec(e){
		if( confirm("Do You really want to delete this record?") ){
			var id = e.data.id
			var div = e.data.div
			div.remove()
			DBdelRec(id)
		}
	}
	// function downloadLink(){
	// 	rec.exportWAV(function(blob) {
	// 		blobToBase64(blob)
	// 	});
	// }

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
