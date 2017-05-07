$(document).ready(function(){

// -------INIT DB--------
  window.db = openDatabase("Recs", "0.1", "Records", 200000);
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
//------------CONTEXT----------------------
  if (!window.audCtx){window.audCtx = new AudioContext()}
  window.sounds = parseSounds(audios)
  window.mainNode = audCtx.createGain()
  mainNode.connect(audCtx.destination)
  setNodes()
  window.rec = new Recorder(mainNode)

  window.reclist = $('#reclist')
  reclist.children().remove()
  reclist.append( $("<ul id='root'>") )
  window.mainRec = new RecBtn()
  $('#main-rec').append(mainRec)
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
})
