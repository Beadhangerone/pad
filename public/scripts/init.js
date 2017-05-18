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

})
