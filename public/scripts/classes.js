class RecBtn{
  constructor(audio, parent = 'root'){
    var btn = $('<button class="rec-btn">')
    btn.data('rec', false)
    btn.data('parent', parent)
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
    var audio = $('<audio controls>')
    audio.attr('src', window.URL.createObjectURL(blob) )
    return audio[0]
  }
}
class Delb{
  constructor(id, li){
    var delb = $('<i class="fa fa-times">')
    delb.on('click', {id:id, li:li}, delRec)
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
    var li = $('<li id='+this.id+'>')
    var div = $('<div class="record">')
    var audio = new Aud(this.blob)
    var roib = new RecBtn(audio, this.id)
    var delb = new Delb(this.id, li)
    div.append(audio)
    div.append(roib)
    div.append(delb)
    li.append(div)
    li.append($('<ul id='+this.id+'>'))
    var parrent_ul = reclist.find('ul#'+this.parent)
    parrent_ul.append( li )
  }
}
