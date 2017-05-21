// Create addons for each record, get all the data for addons from data-attrs


  class RecBtn{
    constructor(target, audio, parent = 'root'){
      var btn = $('<button class="rec-btn">')
      btn.data('rec', false)
      btn.data('parent', parent)
      if(audio){
        btn.html('REC on it')
        btn.addClass('roib')
        target.append(btn)
        btn.on('click', function(){
          var rec = $(this).data('rec')
          if(!rec){
            audCtx.createMediaElementSource(audio).connect(mainNode)//connect sound for rec it
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
        target.append(btn)
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
    constructor(target, blob, controls=true){
      var audio = $('<audio controls>')
      audio.attr('src', window.URL.createObjectURL(blob) )
      target.append(audio[0])
      return audio[0]
    }
  }
  class Dowb{
    constructor(target, blob){
      this.blob = blob
      var url = URL.createObjectURL(blob)//try to do it faster
      var link = $('<a>')
      link.attr('href', url)
      link.attr('download', new Date().toISOString() + '.mp3')
      link.html("Download")
      target.append(link)
      return link
    }
  }
  class Delb{
    constructor(target, id){
      var delb = $('<i class="fa fa-times">')
      target.append(delb)
      delb.on('click', {id:id, el:target}, delRec)
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
      var parrent_ul = reclist.find('ul#'+this.parent)
      var li = $('<li id='+this.id+'>')
      parrent_ul.append( li )
      var div = $('<div class="record">')
      li.append(div)
      var audio = new Aud(div, this.blob)
      var roib = new RecBtn(div, audio, this.id)
      var dowb = new Dowb(div, this.blob)
      var delb = new Delb(div, this.id)
      li.append($('<ul id='+this.id+'>'))
    }
  }
