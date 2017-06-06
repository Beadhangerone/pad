//------------CONTEXT----------------------
if (!window.audCtx){window.audCtx = new AudioContext()}
window.sounds = parseSounds(audios)
window.mainNode = audCtx.createGain()
mainNode.connect(audCtx.destination)
setNodes()
window.rec = new Recorder(mainNode)


// -------INIT DB--------
  window.db = openDatabase("Recs", "0.1", "Records", 400);
  if(!db){alert("Failed to connect to database. Try to refresh the page.");}
  // db.transaction(function (tx) {
  // 	tx.executeSql('DROP TABLE Records');
  // });
  db.transaction(function(tx){
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Records (id INTEGER PRIMARY KEY, sound TEXT, parent TEXT)", [],
      null,null
    );
  })

//-----------FUNCTIONS-----------------------
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
  }

$(document).ready(function(){
  var main_rec = $('#main-rec')
  main_rec.children().remove()
  mainRec = new RecBtn(main_rec)
  window.reclist = $('#reclist')

  // post songs
  // document.getElementsByClassName('save-song-btn').onclick = function(){
  //   // get b64
  //     db.transaction(function(tx){
  //       tx.executeSql(
  //         "SELECT * FROM Records", [],
  //         function(tx, result) {
  //           for(var i = 0; i < result.rows.length; i++) {
  //             if(result.rows.item(i)['id'] == 1){//here must be the param
  //               document.querySelector('#save-song-form > input[name="song[b64]"]').value = result.rows.item(i)['sound']
  //               console.log(document.querySelector('#save-song-form > input[name="song[b64]"]').value == result.rows.item(i)['sound']);
  //             }
  //           }
  //         },
  //         null
  //       );
  //     });
      // show a form


    // send a xhr to ruby defined URL, with b64 in params
    // var xhr = new XHRHttpRequest()
    //
    // xhr.open('', )

  // }
})
