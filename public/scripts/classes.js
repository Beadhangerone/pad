// Create addons for each record, get all the data for addons from data-attrs

  class SaveBtn{
    constructor(target, b64){
      this.b64 = b64
      var svBtn = $('<button>')
      svBtn.addClass('sv-btn')
      svBtn.html('Save')
      target.append(svBtn)
      // debugger
      var _this = this
      svBtn.on('click', function(){
        $('#save-song-form > input[name="song[b64]"]')[0].value = _this.b64
        console.log('done');
      });
      return svBtn
    }
  }

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
      var icon = $('<i class="fa fa-download dowb">')
      link.append(icon)
      target.append(link)
      return link
    }
  }
  class Delb{
    constructor(target, id){
      var delb = $('<i class="fa fa-times delb">')
      target.append(delb)
      delb.on('click', {id:id, el:target}, delRec)
     return delb
    }
  }

  class Record{
    constructor(id, b64, parent){
      this.id = id
      this.b64 = b64
      this.blob = base64ToBlob(b64)
      this.parent = parent
    }
    pushRec(){
      var parrent_ul = reclist.find('ul#'+this.parent)
      var li = $('<li id='+this.id+'>')
      parrent_ul.append( li )
      var div = $('<div class="record">')
      li.append(div)
      new SaveBtn(div, this.b64)
      var audio = new Aud(div, this.blob)
      new RecBtn(div, audio, this.id)
      new Dowb(div, this.blob)
      new Delb(div, this.id)
      li.append($('<ul id='+this.id+'>'))
    }
  }
