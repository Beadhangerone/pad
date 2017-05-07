var clog=(x)=>console.log(x)
$(document).ready(function() {
// ----MAIN------
  getStoredRecs()

// ----CONVERTION-----
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
// -------DB FUNCTIONS--------
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
// ---------REC--ACTIONS---------
	window.startRec=function(btn){
		rec.clear()
		rec.record()
		btn.data('rec', true)
		btn.css('color', 'red')
	}
	window.stopRec=function(btn){
		rec.stop()
		rec.exportWAV(function(blob) {
			blobToBase64(blob, function(b64){pushRecToDB(b64, btn.data('parent'))});
		});
		btn.data('rec', false)
		btn.css('color', 'black')
	}
	window.delRec=function(e){
		if( confirm("Do You really want to delete this record?") ){
			var id = e.data.id
			var li = e.data.li
			li.remove()
			DBdelRec(id)
		}
	}
// -------KEYS-----
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
