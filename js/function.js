$(document).ready(function(){

  $('.dash-wrapper').hundredYardDash();

});

$.fn.extend({
  hundredYardDash:function(options){
    var config={
      settings:'',
      link:'',
      shuffles:0,
      teamsDefault:12,
      teamsPool:32,
      rangeDefault:'1,10,2,7,Normal',
      defaultImg:'/images/sprites/player.png',
      totalDashWidth:100,
      fadeTransition:300,
      place:1,
      finalPlaceOrder:[],
      replayRecord:[],
      replayMode:false,
      dashing:false,
      dashOver:false,
      codeDash:false,
      imgOn:false,
      luckOn:false,
      aboutOpen:false,
      savedSettings:false,
      animatedSprites:true,
      animatedSet:false,
      code:[],
      turn:[],
      animationUp:[],
      characters:[],
      oldP:[],
      startingDate:''
    },
    options=$.extend(config,options);
    return this.each(function(index){

      // GET SETTINGS FROM URL OR SET DEFAULTS
      var getSettingsFromUrl=function(){
        if(typeof settingsFromDB !== 'undefined'){
          var settings = settingsFromDB;
          config.savedSettings=true;
          config.link=settings['link'];
        }
        else{
          var settings;
        }
        if(settings===undefined){
          settings=[];
        };
        var teams=settings['teams']||config.teamsDefault,
            range=settings['settings']||config.rangeDefault,
            range=range.split(','),
            range={
              minY:range[0],
              maxY:range[1],
              minS:range[2],
              maxS:range[3],
              speed:range[4]
            },
            date=settings['date'],
            replay=settings['replay']||undefined,
            names=settings['names']||'',
            code=settings['code']||undefined,
            animated=settings['animated']||undefined,
            img=settings['img']||undefined,
            luck=settings['luck']||undefined,
            names=names.split(','),
            namesArray=[],
            replayArray=[];
        $.each(names,function(i,v){
          namesArray.push({
            name:decodeURIComponent(v),
            code:'',
            img:'',
            luck:''
          })
        })
        if(typeof replay!=='undefined'){
          config.replayMode=true;
          var replay=replay.split('-');

          $.each(replay, function(i,v){
            var sorted=v.split(':'),
                yardsArray=sorted[1].split(','),
                timeArray=sorted[2].split(',');
            replayArray[i]={
              place:sorted[0],
              yards:yardsArray,
              time:timeArray
            }
          })
          var date=new Date(parseInt(date)),
              dateOptions={
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
              },
              date=date.toLocaleString('en-US',dateOptions);
        }
        if(typeof code!=='undefined'){
          config.codeDash=true;
          var code=code.split(',');
          $.each(code,function(i,v){
            namesArray[i].code=decodeURIComponent(v)
          })
          toggleSettings();
        }
        if(typeof luck!=='undefined'){
          config.luckOn=true;
          var luck=luck.split('');
          $.each(luck,function(i,v){
            namesArray[i].luck=v
          })
        }
        if(typeof img!=='undefined'){
          config.imgOn=true;
          var img=img.split(',');
          $.each(img,function(i,v){
            namesArray[i].img=decodeURIComponent(v)
          })
        }
        if(typeof animated!=='undefined'){
          config.animatedSet=true;
          var animatedOn=animated.split(':'),
              animatedChar=animatedOn[1].split(',');
          if(animatedOn[0] == 'false'){
            config.animatedSprites=false;
          }
          $.each(animatedChar,function(i,v){
            namesArray[i].character=v
          })
        }
        else{
          config.imgOn=false;
        }
        var obj={
          teams:teams,
          player:namesArray,
          range:range,
          date:date,
          replay:replayArray
        }
        return obj;
      }






      // TOGGLE ABOUT OPEN CLOSE ABOUT
      var toggleAbout=function(){
        $('.mi-help-toggle').on('click',function(){
          if(config.aboutOpen){
            config.aboutOpen=false;
            $('.mi-help-toggle').text('help');
            $('.settings-about').stop(true,false).fadeOut(config.fadeTransition);
          }
          else{
            config.aboutOpen=true;
            $('.mi-help-toggle').text('highlight_off');
            $('.settings-about').stop(true,false).fadeIn(config.fadeTransition);
          }
        })
      }


      // CREATE PLAYER ICONS ON FIELD, TEAM NUMBER HANDLER
      var setField=function(){
        $('.p-hold').html('').animate({
          opacity:0.0
        }, 200, function(){
          var i=0,
              heightPercent=100/config.settings.teams;
          while(i<=config.settings.teams-1){
            if(config.settings.player[i]===undefined || config.settings.player[i]===null){
              config.settings.player[i]={
                name:''
              };
            }

            var playerContainer= '<div class="p-container" style="height:'+heightPercent+'%;">' +
                          '<div class="p-bar-outside">' +
                            '<div class="p-bar player'+i+'" data-player="'+i+'" style="background-image:url(\'/images/sprites/player.png\');">' +
                              '<div class="p-name p-name'+i+'"></div>' +
                            '</div>' +
                          '</div>' +
                          '<div class="p-place-container">' +
                            '<div class="p-place"></div>' +
                          '</div>' +
                        '</div>';
            $('.p-hold').append(playerContainer);
            i++;
          }
          if(config.settings.player.length>config.settings.teams){
            config.settings.player.splice(config.settings.teams)
          }
        }).animate({
          opacity:0.0
        }, 100, function(){
          setPlayerSize();
          playerNamesOnIcons();
          imgSwitch();
        }).animate({
          opacity:1.0
        }, config.fadeTransition)
      }


      // FILL TEAM SELECT NUMBERS
      var standardTeams=function(){
        var standard=[6,8,10,12,14,16,18,20],
            check= $.inArray(parseInt(config.settings.teams), standard);
        if(check == -1){
          return false;
        }
        else{
          return true;
        }
      }
      var showStandardTeams=function(toggle){
        if(toggle){
          var standard=[6,8,10,12,14,16,18,20];
          $.each( $('.select-number'),function(i,v){
            if( $.inArray( parseInt( $(this).text() ), standard ) === -1 ){
              $(this).addClass('hidden');
            }
          })
        }
        else{
          $('.select-number').removeClass('hidden');
          $('.teamswitch-option').removeClass('selected');
          $('.teamswitch-on').addClass('selected');
        }
      }




      // DYNAMIC SIZING ICONS
      var setPlayerSize=function(){
        var barHeight=$('.p-bar').css('height'),
            zoneWidth=$('.field-start').css('width');
        if(parseInt(barHeight)>parseInt(zoneWidth)){
          barHeight=zoneWidth;
        }
        $(function(){
          $('.p-bar').css({
            'width':barHeight,
            'height':barHeight,
            'top':'50%',
            'transform':'translateY(-50%)'
          });
          if(!config.dashing){
            var zoneSize = $('.field-start').width(),
                fieldSize = $('.p-container').width(),
                playerSize = $('.p-bar').width(),
                startAdjustment = ((zoneSize/fieldSize) * (playerSize/zoneSize))*100;
            if(!config.dashOver){
              $('.p-bar').css('left',-startAdjustment+'%');
            }

          }
        })
      }

      // RESIZING WINDOW
      var onResize=function(){
        $(window).on('resize',function(){
          setPlayerSize();
        })
      }

      // OPEN SETTINGS
      var openSettings=function(){
        $('.settings-box').fadeIn(config.fadeTransition, function(){
          if(config.replayMode){
            $('.settings-start').fadeIn(config.fadeTransition);
            $('.settings-navigate').hide();
            $('.share-container').hide();
            $('.wrapper-top').css('height','5%');
            $('.wrapper-bottom').css('height','95%');
            var replayTitle = '<p class="replay-title">Replay from '+config.settings.date+'</p>';
            $('.wrapper-top').append(replayTitle);
            $('.button-start').text('Watch Rush Replay');
            compileRecap();
          }
          else{
            if(config.codeDash){
              toggleSettings();
              $('.settings-shuffler').fadeOut(config.fadeTransition,function(){
                $('.settings-code').fadeIn(config.fadeTransition);
              })
              $('.shufflercode-option').removeClass('selected');
              $('.shufflercode-code').addClass('selected');
            }
            if(config.savedSettings){
              $('.settings-6').fadeIn(config.fadeTransition);
              compileRecap();
              settingsNavigator(6);
              createLuckStructure();
            }
            else{
              $('.settings-1').fadeIn(config.fadeTransition);
            }
          }
        });

      }


      // FILL SETTINGS ON LOAD
      var fillSettings=function(){
        var teamsNumber=$('.select-number'),
            minY=$('.yards-min'),
            maxY=$('.yards-max'),
            minS=$('.seconds-min'),
            maxS=$('.seconds-max'),
            speed=$('.range-speed');
        teamsNumber.removeClass('selected');
        minY.removeClass('selected');
        maxY.removeClass('selected');
        minS.removeClass('selected');
        maxS.removeClass('selected');
        speed.removeClass('selected');
        $.each(teamsNumber,function(){
          if($(this).text()==config.settings.teams){
            $(this).addClass('selected');
          }
        })
        $.each(minY,function(){
          if($(this).text()==config.settings.range.minY){
            $(this).addClass('selected');
          }
        })
        $.each(maxY,function(){
          if($(this).text()==config.settings.range.maxY){
            $(this).addClass('selected');
          }
        })
        $.each(minS,function(){
          if($(this).text()==config.settings.range.minS){
            $(this).addClass('selected');
          }
        })
        $.each(maxS,function(){
          if($(this).text()==config.settings.range.maxS){
            $(this).addClass('selected');
          }
        })
        $.each(speed,function(){
          if($(this).text()==config.settings.range.speed){
            $(this).addClass('selected');
          }
        })

        placeTeamNameInputs();
        fillInputFields();
        createCodeInputs();
        readImg();
        toggleAbout();
        if(!standardTeams()){
          showStandardTeams(false);
        }
      }


      // FILL INPUT FIELDS WITH PLAYER NAMES
      var fillInputFields=function(){
        $.each(config.settings.player,function(i,v){
          $('.team'+(i+1)).val(v.name);
        })
      }



      //PLAYER NAME LISTENER
      var readPlayerNames=function(){
        $.each( $('.input-team'), function(i,v){
          $(this).on('change',function(){
            var newName=$(this).val();
            $('.p-name'+i).text( newName );
            config.settings.player[i].name=newName;
            fillCodeFields();
          })
        })
      }


      // CODE NAME LISTENER
      var readCodes=function(){
        $.each( $('.input-code'), function(i,v){
          $(this).on('change',function(){
            var newName=$(this).val(),
                newName=newName.replace(/\s/g,''),
                newName=newName.substring(0,20);
            config.settings.player[i].code=newName;
          })
        })
      }


      // IMG LISTENER
      var readImg=function(){
        $.each( $('.input-img'), function(i,v){
          $(this).on('change',function(){
            var newName=$(this).val();
                newName = newName.replace(/^https?\:\/\//i, '');
            $(this).val(newName);
            config.settings.player[i].img=newName;
            placeImg();
          })
        })
      }

      // ASSIGN ANIMATED SPRITE TO PLAYER ARRAY
      var assignAnimatedSprites=function(){
        if(config.animatedSet){
          return;
        }
        $.each($('.p-bar'),function(i,v){
          if(config.animatedSprites){
            while(config.characters.length < config.settings.teams){
              var randomnumber = Math.floor(Math.random()*config.teamsPool) + 1;
              if(config.characters.indexOf(randomnumber) > -1) continue;
              config.characters[config.characters.length] = randomnumber;
            }
            var skin = Math.floor(Math.random() * 2) + 1
            config.settings.player[i].character=config.characters[i]+'-'+skin;
          }
        })
      }


      // IMG INPUT BOXES
      var imgSwitch=function(){
        if(config.imgOn){
          $('.input-img-wrapper').show();
          $('.sprite-select-wrapper').hide();
          $('.p-bar').css({
            'background-size':'contain',
            'background-repeat':'no-repeat',
            'background-position':'center center',
            'background-image':'url("/images/sprites/player.png")'
          })
        }
        else if(config.animatedSprites){
          $('.sprite-select-wrapper').show();
          $('.input-img-wrapper').hide();
          $('.p-bar').css({
            'background-size':'600% 200%',
            'background-position':'0 0'
          })
          assignAnimatedSprites();
        }
        else if(!config.imgOn && !config.animatedSprites){
          $('.sprite-select-wrapper').hide();
          $('.p-bar').css({
            'background-size':'contain',
            'background-repeat':'no-repeat',
            'background-position':'center center',
            'background-image':'url("/images/sprites/player.png")'
          })
          $('.input-img-wrapper').hide();

        }
        else{
          $.noop();
        }
        readImg();
        placeImg();
      }



      // REPLACE PLAYER ICON WITH IMG
      var placeImg=function(){
        var cleared=[];
        $.each( $('.p-bar'), function(i,v){
          var src=config.settings.player[i].img;
          if(config.animatedSprites){
            var img='/images/sprites/char/'+config.settings.player[i].character+'.png';
            $('.player'+i).addClass('char'+config.settings.player[i].character);
            $('.player'+i).attr('data-char',config.settings.player[i].character);
            imgCssValue(img,i);
          }
          else if(!config.imgOn && !config.animatedSprites){
            var img=config.defaultImg;
            imgCssValue(img,i);
          }
          else{
            if(src==='' || src===null || src===undefined || src==='undefined'){
              var img=config.defaultImg;
              imgCssValue(img,i);
            }
            else{
              if(!imgCheck(src)){
                var img=config.defaultImg;
                imgCssValue(img,i);
              }
              else{
                if(!src.startsWith('https://') && !src.startsWith('http://')){
                  src='//'+src;
                }
                testImage(src).then(function(value){
                  cleared[i]=value;
                  if(cleared[i]){
                    var img=src;
                    imgCssValue(img,i);
                  }
                }, function(reason){
                  var img=config.defaultImg;
                  imgCssValue(img,i);
                })
              }
            }
          }
        })
      }

      //CHECK IF IMG EXISTS
      var imgCheck=function(url) {
        return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
      }
      var testImage=function(url, timeoutT) {
        return new Promise(function (resolve, reject) {
            var timeout = timeoutT || 5000;
            var timer, img = new Image();
            img.onerror = img.onabort = function () {
                clearTimeout(timer);
                reject(false);
            };
            img.onload = function () {
                clearTimeout(timer);
                resolve(true);
            };
            timer = setTimeout(function () {
                img.src = "//!!!!/test.jpg";
                reject(false);
            }, timeout);
            img.src = url;
        });
      }
      var imgCssValue=function(img,i){
        $('.player'+i).css({
          'background-image':'url(\''+img+'\')'
        })
        $('.playerimg'+i).val(config.settings.player[i].img);
      }


      // PUT PLAYER NAME ON ICON
      var playerNamesOnIcons=function(){
        $.each(config.settings.player,function(i,v){
          $('.p-name'+i).text(config.settings.player[i].name);
        })
      }




      // CLICK LISTENER
      var clickHandler=function(){
        $('.select-number').on('click',function(){
          $('.select-number').removeClass('selected');
          $(this).addClass('selected');
          config.settings.teams=$(this).text();
          setField();
          placeTeamNameInputs();
          createCodeInputs();
          fillCodeFields();
          fillInputFields();
        })
        $('.yards-min').on('click',function(){
          $('.yards-min').removeClass('selected');
          $(this).addClass('selected');
          config.settings.range.minY=$(this).text();
        })
        $('.yards-max').on('click',function(){
          $('.yards-max').removeClass('selected');
          $(this).addClass('selected');
          config.settings.range.maxY=$(this).text();
        })
        $('.seconds-min').on('click',function(){
          $('.seconds-min').removeClass('selected');
          $(this).addClass('selected');
          config.settings.range.minS=$(this).text();
        })
        $('.seconds-max').on('click',function(){
          $('.seconds-max').removeClass('selected');
          $(this).addClass('selected');
          config.settings.range.maxS=$(this).text();
        })
        $('.range-speed').on('click',function(){
          $('.range-speed').removeClass('selected');
          $(this).addClass('selected');
          config.settings.range.speed=$(this).text();
        })
        $('.button-random').on('click',function(){
          shufflePlayers();
        })
        $('.shufflercode-option').on('click',function(){
          $('.shufflercode-option').removeClass('selected');
          $(this).addClass('selected');
          if($(this).hasClass('shufflercode-code')){
            config.codeDash=true;
            toggleSettings();
            $('.settings-shuffler').fadeOut(config.fadeTransition,function(){
              $('.settings-code').fadeIn(config.fadeTransition);
            })
          }
          else{
            config.codeDash=false;
            toggleSettings();
            $('.settings-code').fadeOut(config.fadeTransition,function(){
              $('.settings-shuffler').fadeIn(config.fadeTransition);
            })
          }
        })
        $('.spritetype-option').on('click',function(){
          $('.spritetype-option').removeClass('selected');
          $(this).addClass('selected');
          if($(this).hasClass('spritetype-animated')){
            config.animatedSprites=true;
            config.imgOn=false;
            imgSwitch();
          }
          if($(this).hasClass('spritetype-static')){
            config.animatedSprites=false;
            config.imgOn=false;
            imgSwitch();
          }
          if($(this).hasClass('spritetype-custom')){
            config.animatedSprites=false;
            config.imgOn=true;
            imgSwitch();
          }
        })
        $('.luckswitch-option').on('click',function(){
          $('.luckswitch-option').removeClass('selected');
          $(this).addClass('selected');
          if($(this).hasClass('luckswitch-on')){
            config.luckOn=true;
            luckOrbListener();
          }
          else{
            config.luckOn=false;
            luckOrbDetachListener();
          }
        })
        $('.teamswitch-option').on('click',function(){
          $('.teamswitch-option').removeClass('selected');
          $(this).addClass('selected');
          if($(this).hasClass('teamswitch-on')){
            showStandardTeams(false);
          }
          else{
            showStandardTeams(true);
          }
        })
      }

      // NAVIGATE THROUGH SETTINGS
      var settingsNavigator=function(number){
        var i=number;
        function repeat(){
          $('.settings-next').on('click',function(){
            $('.settings-next').off('click');
            $('.settings-back').off('click');
            $('.settings-'+i).fadeOut(config.fadeTransition,function(){
              i++;
              $('.settings-'+i).fadeIn(config.fadeTransition,function(){
                repeat();
              });
            })
          })
          $('.settings-back').on('click',function(){
            $('.settings-next').off('click');
            $('.settings-back').off('click');
            $('.settings-'+i).fadeOut(config.fadeTransition,function(){
              i--;
              $('.settings-'+i).fadeIn(config.fadeTransition,function(){
                repeat();
              });
            })
          })
          $('.settings-code-fill').on('click',function(){
            fillEmptyCodeFields();
            createLuckStructure();
          })
          $('.settings-compile').on('click',function(){
            compileRecap();
            fillSaveLinkOnClick('recap-save','button-save-wrapper');
          })
          $('.settings-count-luck').on('click',function(){
            countLuck();
          })
        }
        repeat();
      }




      //COMPILE RECAP, BUILD RECAP STRUCTURE
      var compileRecap=function(){
        var structure='<div class="recap-wrapper">'+
                        '<div class="recap-column recap-teams-box">'+
                          '<div class="recap-title">Teams</div>';
        var imgstyle='';
        $.each(config.settings.player,function(i,v){
          if(config.animatedSprites){
            var img='/images/sprites/char/'+config.settings.player[i].character+'.png';
            imgstyle='background-size:600% 200%;background-position:0 0'
          }
          else if(config.imgOn){
            var img=config.settings.player[i].img;
            if(img=='undefined' || img==undefined || img==''){
              img='/images/sprites/player.png';
            }
            else if(!img.startsWith('https://') && !img.startsWith('http://')){
              img='//'+img;
            }
            else{
              img='/images/sprites/player.png';
            }
          }
          else{
            var img='/images/sprites/player.png';
          }
          if(config.settings.player[i].name==''){
            var playerName='&nbsp;';
          }
          else{
            var playerName=config.settings.player[i].name;
          }
          structure+=''+
            '<div class="recap-row">'+
              '<div class="recap-img" style="background-image:url(\''+img+'\');'+imgstyle+'"></div>'+
              '<div class="recap-name">'+playerName+'</div>'+
            '</div>';
        })
        structure+='</div>'+
                    '<div class="recap-column recap-luck-box">'+
                    '<div class="recap-blocked blocked-luck"><div class="blocked-title">Luck Not Activated</div></div>'+
                    '<div class="recap-title">Luck</div>';
        $.each(config.settings.player,function(i,v){
          if(config.luckOn){
            var luckNum=config.settings.player[i].luck;
            if(parseInt(luckNum)===0 || luckNum===''){
              luckNum='&nbsp';
            }
            else{
              luckNum='+'+config.settings.player[i].luck;
            }
          }
          else{
            var luckNum='&nbsp;';
          }
          structure+=''+
            '<div class="recap-row">'+
              '<div class="recap-luck">'+
                '<ul class="recap-luck-amount">'+
                  '<li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>'+
                '</ul>'+
                '<div class="recap-luck-number">'+luckNum+'</div>'+
              '</div>'+
            '</div>';
        })

        structure+='</div>'+
                    '<div class="recap-column recap-code-box">'+
                    '<div class="recap-blocked blocked-codedash"><div class="blocked-title">Code Rush is Not Set</div></div>'+
                    '<div class="recap-title">Codes</div>';

        $.each(config.settings.player,function(i,v){
          if(config.codeDash){
            if(config.settings.player[i].code==''){
              var playerCode='&nbsp;';
            }
            else{
              var playerCode=config.settings.player[i].code;
            }
            structure+=''+
              '<div class="recap-row">'+
                '<div class="recap-code">'+config.settings.player[i].code+'</div>'+
              '</div>';
          }
          else{
            structure+=''+
            '<div class="recap-row">'+
              '<div class="recap-code"><br /></div>'+
            '</div>';
          }
        })

        structure+='</div></div>'+
                  '<div class="recap-wrapper">'+
                    '<div class="recap-column">'+
                      '<div class="recap-title">Settings</div>'+
                      '<div class="recap-range recap-first-range">'+
                      '<div class="recap-blocked blocked-settings"><div class="blocked-title">Not Used in Code Rush</div></div>'+
                        '<div class="recap-column">'+
                          '<div class="recap-range-title">Min Yards</div>'+ '<div class="recap-range-value">'+config.settings.range.minY+'</div>'+
                        '</div>'+
                        '<div class="recap-column">'+
                          '<div class="recap-range-title">Max Yards</div>'+ '<div class="recap-range-value">'+config.settings.range.maxY+'</div>'+
                        '</div>'+
                        '<div class="recap-column">'+
                          '<div class="recap-range-title">Min Seconds</div>'+ '<div class="recap-range-value">'+config.settings.range.minS+'</div>'+
                        '</div>'+
                        '<div class="recap-column">'+
                          '<div class="recap-range-title">Max Seconds</div>'+ '<div class="recap-range-value">'+config.settings.range.maxS+'</div>'+
                        '</div>'+
                      '</div>'+
                      '<div class="recap-range">'+
                        '<div class="recap-column">'+
                          '<div class="recap-range-title">Speed</div>'+ '<div class="recap-range-value">'+config.settings.range.speed+'</div>'+
                        '</div>'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                  '<div class="recap-wrapper">'+
                    '<div class="recap-column">'+
                      '<div class="recap-row recap-save">'+

                      '</div>'+
                    '</div>'+
                  '</div>';
        $('.settings-recap').html('').append(structure);

        if(config.luckOn){
          $.each($('.recap-luck-amount'),function(i,v){
            $(this).find('li:nth-child('+(parseInt(config.settings.player[i].luck)+1)+')').css({
              'background-color':'#3498db'
            }).prevAll().css({
              'background-color':'#3498db'
            })
          })
        }
        else{
          $('.recap-luck-box').addClass('recap-grey');
          $('.blocked-luck').show();
        }
        if(config.codeDash){
          $('.recap-first-range').addClass('recap-grey');
          $('.blocked-settings').show();
        }
        else{
          $('.recap-code-box').addClass('recap-grey');
          $('.blocked-codedash').show();
        }
      }

      //FILL SAVE LINK ON CLICK
      var fillSaveLinkOnClick=function(appendTo,className){
        if(config.replayRecord.length>=1){
          var buttonValue='Save and Share Replay';
        }
        else if(config.savedSettings){
          var buttonValue='Save Changes';
        }
        else{
          var buttonValue='Save Settings';
        }
        var structure=''+
        '<div class="'+className+'">'+
          '<button><i class="material-icons">save</i>'+buttonValue+'</button>'+
          '<input type="text" />'+
        '</div>';
        $('.'+appendTo).append(structure);
        $('.'+className+' button').one('click',function(){
          $(this).text('Saving').css({
            'background-color':'#3498db'
          });
          var teamsCoded=[],
              imgCoded=[],
              animatedSpritesCoded=[],
              animatedSpritesArray=[],
              codesCoded=[],
              luckCoded=[],
              replayArray=[],
              date;
          $.each(config.settings.player,function(i,v){
            teamsCoded.push(encodeURIComponent(v.name));
          })
          if(config.imgOn){
            $.each(config.settings.player,function(i,v){
              if(v.img==='undefined' || v.img===undefined){
                v.img='';
                imgCoded.push(v.img);
              }
              else{
                imgCoded.push(encodeURIComponent(v.img));
              }
            })
          }

          $.each(config.settings.player,function(i,v){
            animatedSpritesCoded.push(v.character);
          })
          animatedSpritesCoded=animatedSpritesCoded.join(',');
          animatedSpritesArray=config.animatedSprites+':'+animatedSpritesCoded;
          if(config.codeDash){
            $.each(config.settings.player,function(i,v){
              codesCoded.push(encodeURIComponent(v.code));
            })
          }
          if(config.luckOn){
            $.each(config.settings.player,function(i,v){
              luckCoded.push(v.luck);
            })
          }
          date=$.now();
          $.each(config.replayRecord,function(i,v){
            replayArray[i]=v.place+':'+v.yards+':'+v.time;
          })
          replayArray=replayArray.join('-');

          var request=$.ajax({
            url:'/process/p-savesettings.php',
            type:'POST',
            data:{
              'save-settings':true,
              'teams':config.settings.teams,
              'names':teamsCoded.join(','),
              'settings':config.settings.range.minY+','+config.settings.range.maxY+','+config.settings.range.minS+','+config.settings.range.maxS+','+config.settings.range.speed,
              'img':imgCoded.join(','),
              'code':codesCoded.join(','),
              'animated':animatedSpritesArray,
              'luck':luckCoded.join(''),
              'date':date,
              'replay':replayArray,
              'link':config.link
            }
          })
          request.done(function (response, textStatus, jqXHR){
            $('.'+className+' button').html('<i class="material-icons">filter_none</i>Copy').on('click',function(event){
              var copyTextarea = document.querySelector('.'+className+' input');
              copyTextarea.focus();
              copyTextarea.select();
              var successful = document.execCommand('copy'),
                  container=$(this);
              container.find('i').text('done');
              t1 = setTimeout(function(){
                container.find('i').text('filter_none');
              },4000)
            })
            var path=window.location.href.split('/v/')[0];
            if(path.substring(path.length-1) == "/"){
              path = path.substring(0, path.length-1);
            }
            $('.'+className+' input').val(path+'/v/'+response).css({
              'display':'inline',
              'padding':'8px'
            }).animate({
              'width':'300px'
            }).on('click',function(){
              $(this).select();
            })
          });

          request.fail(function (jqXHR, textStatus, errorThrown){
            console.error(
              "The following error occurred: "+
              textStatus, errorThrown
            );
          });


        })
      }

      // FADE OFF SETTINGS COMMANDS FOR CODE DASH
      var toggleSettings=function(){
        if(config.codeDash){
          $('.range-toggle').addClass('unavailable');
          $('.range-toggle').find('.range-num').addClass('unavailable');
        }
        else{
          $('.range-toggle').removeClass('unavailable');
          $('.range-toggle').find('.range-num').removeClass('unavailable');
        }
      }

      // PLACE EMPTY INPUT FIELDS
      var placeTeamNameInputs=function(){
        $('.teamsinput-container').html('');
        var i=1;
        while(i <= config.settings.teams){
          var input='<div class="input-container">' +
            '<input class="input-team team'+i+'" placeholder="'+i+'" />'+
            '<div class="input-img-wrapper">'+
              '<i class="material-icons mi-rarr">subdirectory_arrow_right</i><input class="input-img playerimg'+(i-1)+'" placeholder="direct img link" />'+
            '</div>'+
            '<div class="sprite-select-wrapper">'+
              '<i class="material-icons mi-rarr">subdirectory_arrow_right</i><button class="change-sprite" tabindex="-1" data-player="'+(i-1)+'">Change Sprite Colors</button>'+
            '</div>'+
          '</div>';
          $('.teamsinput-container').append(input);
          i++;
        }
        readPlayerNames();
        var savedSpriteBox=$('.sprite-box-wrapper').html();
        $('.sprite-box-wrapper').html('').html(savedSpriteBox);
        spriteSelectorHandler();
      }


      // SPRITE SELECTOR HANDLER
      var spriteSelectorHandler=function(){
        var playerNumber,sprite;
        $('.change-sprite').on('click',function(){
          $('.sprite-box-wrapper').show();
          var boxHeight=$('.sprite-select-box').height();
          $('.sprite-box-wrapper').hide();
          playerNumber=$(this).data('player');
          sprite=config.settings.player[playerNumber].character.split('-');
          $('.sprite-char').removeClass('selected');
          $('.sprite-select-box').find('[data-char="' + sprite[0] + '"]').addClass('selected');
          $('.sprite-skin-color').removeClass('checked');
          $('.sprite-skin').find('[data-skin="' + sprite[1] + '"]').addClass('checked');
          $('.sprite-current').css({
            'background-image':'url("/images/sprites/char/'+sprite[0]+'-'+sprite[1]+'.png")'
          })

          var topPosition=$(this).offset().top+$(this).height()+5+'px',
              middleOfWindow=($(window).height())/2;
          if(parseInt(topPosition)>middleOfWindow){
            topPosition=$(this).offset().top-$(this).height()-boxHeight+'px';
          }

          $('.sprite-select-box').css({
            'top':topPosition
          })


          $('.sprite-box-wrapper').fadeIn(config.fadeTransition,function(){
            $(document).on('click','.sprite-box-wrapper',closeSpriteWindow);
          });
        })
        $('.sprite-char').on('click',function(){
          if(typeof sprite==='undefined'){
            sprite=[];
          }
          sprite[0]=$(this).data('char');
          config.settings.player[playerNumber].character=sprite[0]+'-'+sprite[1];
          $('.sprite-char').removeClass('selected');
          $('.sprite-select-box').find('[data-char="' + sprite[0] + '"]').addClass('selected');
          $('.sprite-current').css({
            'background-image':'url("/images/sprites/char/'+config.settings.player[playerNumber].character+'.png")'
          })
          placeImg();
        })
        $('.sprite-skin-color').on('click',function(){
          sprite[1]=$(this).data('skin');
          config.settings.player[playerNumber].character=sprite[0]+'-'+sprite[1];
          $('.sprite-skin-color').removeClass('checked');
          $('.sprite-skin').find('[data-skin="' + sprite[1] + '"]').addClass('checked');
          $('.sprite-current').css({
            'background-image':'url("/images/sprites/char/'+config.settings.player[playerNumber].character+'.png")'
          })
          placeImg();
        })
      }

      // FUNCTION TO CLOSE SPRITE SELECT WINDOW WHEN CLICKED OUTSIDE
      var closeSpriteWindow=function(){
        if(!$(event.target).closest('.sprite-select-box').length) {
          if($('.sprite-box-wrapper').is(":visible")) {
            $('.sprite-box-wrapper').fadeOut(config.fadeTransition,function(){
              $(document).off('click',closeSpriteWindow);
            });
          }
        }
      }

      // CREATE CODE INPUT FIELDS
      var createCodeInputs=function(){
        $('.code-container').html('');
        var i=1
        while(i <= config.settings.teams){
          var structure='<div class="code-line">'+
              '<div class="code-player-name c-name'+(i-1)+'"></div>'+
                '<input type="text" class="input-code code'+(i-1)+'" />'+
              '</div>';
          $('.code-container').append(structure);
          i++;
          fillCodeFields();
          readCodes();
        }
      }
      // FILL CODE NAMES IF ALREADY FILLED
      var fillCodeFields=function(){
        $.each(config.settings.player,function(i,v){
          $('.c-name'+i).text(v.name);
          $('.code'+i).val(v.code);
        })
      }
      // IF CODE INPUTS ARE BLANK ON PAGE CHANGE, FILL THEM
      var fillEmptyCodeFields=function(){
        if(config.codeDash){
          $.each( $('.input-code'),function(i,v){
            if($(this).val()===''){
              var str=makeRandomString(15)
              $(this).val( str )
              config.settings.player[i].code=str;
            }
          })
        }
        fillCodeFields();
      }
      // MAKE RANDOM STRING
      var makeRandomString=function(characters){
        var text='',
            possible="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for(var i=0;i<characters;i++){
          text+=possible.charAt(Math.floor(Math.random()*possible.length));
        }
        return text;
      }



      // SHUFFLE PLAYERS
      var shufflePlayers=function(){
        config.shuffles++;
        $('.total-shuffles').text(config.shuffles);
        var array=config.settings.player,
            currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        config.settings.player=array;
        playerNamesOnIcons();
        fillCodeFields();
        fillInputFields();
        placeImg();
      }







      // ADD ORDINAL TO NUMBERS
      var ordinal=function(i) {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
      }

      //HEX ENCODE
      String.prototype.hexEncode = function(){
          var hex, i;

          var result = "";
          for (i=0; i<this.length; i++) {
              result+= this[i].charCodeAt(0);
          }

          return result
      }



      // INCREMENTAL FURTHER ENCODE
      var flipHex=function(c) {
        var input='',
            uri=encodeURIComponent(c),
            r=uri.split('').reverse().join('');
        for (var i = 0; i < r.length; i++) {
          input+=String.fromCharCode(r.charCodeAt(i) +1);
        }
        input=input+c;
        return input;
      }
      // HEX CODE TO YARDS AND TIME
      var hexToYards=function(str){
        if(str===null || str===undefined || str===''){
          str='blank';
          str=str.toString();
        }
        if(str.length<=4){
          str=str+str+str+str+str;
        }
        var result=str.hexEncode(),
            result=result.replace(/\D/g,''),
            result=result.replace(/[0]/g, ''),
            result=result.match(/.{5}/g),
            yardsArray=[],
            timeArray=[];
        $.each(result,function(i,v){
          var yards=v.substring(0,1),
              time=v.substring(1);
          yardsArray[i]=yards;
          timeArray[i]=time;
        })
        var final={
          yards:yardsArray,
          time:timeArray
        }
        return final;
      }




      // SHOW FINAL SCORES AND SHARE PAGE
      var fin=function(){
        if(!config.replayMode){
          fillSaveLinkOnClick('settings-share','button-replay-wrapper');
        }
        $('.settings-box').delay(config.fadeTransition).fadeIn(config.fadeTransition);
        $('.settings-share').show();
      }

      // PLACE FINAL PLACEMENTS IN ORDER
      var finalPlacements=function(v){
        $.each(v,function(index,value){
          var imgstyle='';
          if(config.animatedSprites){
            var img='/images/sprites/char/'+config.settings.player[value.orig].character+'.png';
            imgstyle='background-size:600% 200%;background-position:0 0'
          }
          else if(config.imgOn){
            var img=config.settings.player[value.orig].img;
            imgstyle='background-size:contain;background-repeat:no-repeat;background-position:center center;';
            if(img=='undefined' || img==undefined || img==''){
              img='/images/sprites/player.png';
            }
            else if(!img.startsWith('https://') && !img.startsWith('http://')){
              img='//'+img;
            }
            else{
              img='/images/sprites/player.png';
            }
          }
          else{
            var img='/images/sprites/player.png';
            imgstyle='background-size:contain;background-repeat:no-repeat;background-position:center center;';
          }
          var structure= '<div class="place-order">' +
            '<div class="place-photo photo'+index+'" style="background-image:url(\''+img+'\');'+imgstyle+'"></div>'+
            '<div class="place-number">'+ordinal(value.place)+'</div>' +
            '<div class="place-name">'+value.name+'</div>' +
          '</div>';
          $('.placements').append(structure);
          if(config.animatedSprites){
            if(index<3){
              victoryPose($('.photo'+index));
            }
            if(index>=3){
              defeatPose($('.photo'+index));
            }
          }
        })
      }



      // LUCK ORB LISTENER
      var luckOrbListener=function(){
        $('.luck-container').removeClass('unavailable');
        $('.luck-amount').css('cursor','pointer');
        var mouseDown=false;
        $('.luck-amount li').on('mousedown',function(e){
          e.preventDefault();
          mouseDown=true;
          $(this).addClass('luck-on').css({
            'background-color':'#3498db'
          }).prevAll('li').addClass('luck-on').css({
            'background-color':'#3498db'
          });
          $(this).nextAll('li').removeClass('luck-on').css({
            'background-color':'#fff'
          });
          var num='+'+$(this).prevAll().length;
          if(parseInt(num)===0){
            num='';
          }
          $(this).parent().next('.luck-number').text(num);
          countLuck();
        }).on('mousemove',function(e){
          e.preventDefault();
          if(mouseDown){
            $(e.target).addClass('luck-on').css({
              'background-color':'#3498db'
            }).prevAll('li').addClass('luck-on').css({
              'background-color':'#3498db'
            })
            $(e.target).nextAll('li').removeClass('luck-on').css({
              'background-color':'#fff'
            })
            var num='+'+$(e.target).prevAll().length;
            if(parseInt(num)===0){
              num='';
            }
            $(e.target).parent().next('.luck-number').text(num);
            countLuck();
          }
        })
        $(window).on('mouseup', function(e){
          mouseDown=false;
        })
        countLuck();
      }
      // LUCK DETACH LISTENER
      var luckOrbDetachListener=function(){
        $('.luck-amount li').off('mousedown').off('mousemove');
        $('.luck-amount').css('cursor','not-allowed');
        $('.luck-container').addClass('unavailable');
      }
      // LUCK CREATE STRUCTURE
      var createLuckStructure=function(){
        $('.luck-container').html('');
        $.each(config.settings.player,function(i,v){
          var num='+'+config.settings.player[i].luck;
          if(parseInt(num)===0 || config.settings.player[i].luck===undefined || config.settings.player[i].luck===''){
            var num='&nbsp;';
          }
          var structure='<div class="luck-row">'+
                          '<div class="luck-name">'+config.settings.player[i].name+'</div>'+
                          '<ul class="luck-amount">'+
                            '<li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>'+
                          '</ul>'+
                          '<div class="luck-number">'+num+'</div>'
                        '</div>';
          $('.luck-container').append(structure);
        })
        defaultLuck();
      }
      //SET DEFAULT LUCK
      var defaultLuck=function(){
        $.each($('.luck-amount'), function(i,v){
          if(typeof config.settings.player[i].luck!=='undefined'){
            var num=config.settings.player[i].luck;
          }
          else{
            var num=0;
          }
          if(num===''){
            num=0;
          }
          $(this).find('li:nth-child('+(parseInt(num)+1)+')').addClass('luck-on').css({
            'background-color':'#3498db'
          })
        })
        $('.luck-on').prevAll().addClass('luck-on').css({
          'background-color':'#3498db'
        })
        if(config.luckOn){
          $('.luckswitch-option').removeClass('selected');
          $('.luckswitch-on').addClass('selected');

          luckOrbListener();
        }
        else{
          // $.each($('.luck-amount'), function(i,v){
          //   $(this).find('li').first().addClass('luck-on').css({
          //     'background-color':'#3498db'
          //   })
          // })
          luckOrbDetachListener();
        }
      }
      // COUNT LUCK
      var countLuck=function(){
        if(config.luckOn){
          $.each($('.luck-amount'),function(i,v){
            var num=($(this).find('.luck-on').length)-1;
            config.settings.player[i].luck=num;
          })
        }
        else{
          $.each(config.settings.player, function(i,v){
            v.luck='';
          })
        }
      }




      // COUNTDOWN ANIMATION
      var countdown=function(){
        $('.button-start').one('click',function(){
          $(this).prop('disabled', true);
          $('.button-random').prop('disabled', true);
          if(!config.codeDash){
            $.each(config.settings.player,function(i,v){
              config.settings.player[i].code=''
            })
          }
          $('.settings-start').fadeOut(config.fadeTransition,function(){
            $('.settings-url').val('');
            $('.settings-goodluck').fadeIn(500,function(){
              $('.settings-goodluck').fadeOut(500);
              $('.settings-box').fadeOut(500,function(){
                $('.countdown-box').fadeIn(500,function(){
                  $('.countdown-3').fadeIn(500,function(){
                    $('.countdown-3').fadeOut(500,function(){
                      $('.countdown-2').fadeIn(500,function(){
                        $('.countdown-2').fadeOut(500,function(){
                          $('.countdown-1').fadeIn(500,function(){
                            $('.countdown-1').fadeOut(500,function(){
                              $('.countdown-box').fadeOut(500,function(){
                                startDash( $('.p-container') );
                              })
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      }


      // RUN ANIMATION
      var takeStep=function(element){
        // element.css('transform','scaleX(1)')
        var id=element.data('player');
        if(config.animationUp[id]==null){
          config.animationUp[id]=true;
        }
        if(parseInt(element.css('background-position-x'))===0){
          element.css('background-position-x','40%');
        }
        else if(parseInt(element.css('background-position-x'))===20){
          element.css('background-position-x','40%');
          config.animationUp[id]=true;
        }
        else if(parseInt(element.css('background-position-x'))===60){
          element.css('background-position-x','40%');
          config.animationUp[id]=false;
        }
        else if(parseInt(element.css('background-position-x'))===40){
          if(config.animationUp[id]){
            element.css('background-position-x','60%');
          }
          else{
            element.css('background-position-x','20%');
          }
        }
        else{
          element.css('background-position-x','20%');
        }
      }
      var victoryPose=function(element){
        element.css('background-position-x','80%');
      }
      var defeatPose=function(element){
        element.css('background-position-x','100%');
      }


      // START DASH, MOVEMENT ANIMATION
      var startDash=function(element){
        config.dashing=true;
        var minY=parseInt(config.settings.range.minY),
            maxY=(parseInt(config.settings.range.maxY)+1)-parseInt(config.settings.range.minY),
            minS=parseInt(config.settings.range.minS)*1000,
            maxS=(parseInt(config.settings.range.maxS)-parseInt(config.settings.range.minS))*1000,
            speed=config.settings.range.speed;
        $.each(element,function(i,v){
          var current=$(this),
              finished=false,
              id=current.find('.p-bar').data('player'),
              fieldWidth=current.width(),
              playerPosition=current.find('.p-bar').css('left'),
              playerPosition=parseFloat(playerPosition);
              currentPercent=(playerPosition/fieldWidth)*100;
          // REPLAY MODE
          if(config.replayMode){
            if(config.turn[id]===undefined || config.turn[id]===null){
              config.turn[id]=0;
            }
            var yardsUp=parseInt(config.settings.replay[id].yards[config.turn[id]]),
                timeMoved=parseInt(config.settings.replay[id].time[config.turn[id]]);
            config.turn[id]++;
            var yardLength=config.settings.replay[id].yards.length;
            if(config.turn[id]>yardLength){
              current.find('.p-bar').css({
                left:'200%'
              })
            }
          }
          else{
            // CODED MODE
            if(config.codeDash){
              if(config.turn[id]===undefined || config.turn[id]===null){
                config.turn[id]=0;
                config.code[id]=config.settings.player[id].code;
              }
              var values=hexToYards(config.code[id]);
              if(values.yards[config.turn[id]]===undefined || values.yards[config.turn[id]]===null){
                config.code[id]=flipHex(config.code[id]);
                config.turn[id]=0;
              }
              var yardsUp=parseInt(values.yards[config.turn[id]]),
                  timeMoved=parseInt(values.time[config.turn[id]]);

              config.turn[id]++;
            }
            // RANDOM MODE
            else{
              var yardsUp=randomNum = Math.floor(Math.random() * maxY) + minY,
                  timeMoved=Math.floor(Math.random() * maxS) + minS;
            }

            if(config.luckOn && !config.replayMode){
              var luck=config.settings.player[id].luck;
              if(luck>0){
                luck=luck/2;
                var roll=Math.floor(Math.random() * 20) + 1;
                roll=roll/2;
                if(roll<=luck){
                  yardsUp=yardsUp*2;
                }
              }

            }

            if(config.replayRecord[id]===undefined){
              config.replayRecord[id]={
                yards:'',
                time:'',
                place:''
              };
            }
            config.replayRecord[id].yards+=yardsUp+',';
            config.replayRecord[id].time+=timeMoved+',';
          }



          if(speed==='Fast'){
            yardsUp=yardsUp*2;
          }
          if(speed==='Faster'){
            yardsUp=yardsUp*2;
            timeMoved=timeMoved/2;
          }
          if(speed==='Fastest'){
            yardsUp=yardsUp*3;
            timeMoved=timeMoved/3;
          }
          var newPosition=currentPercent + yardsUp;
          current.find('.p-bar').animate({
            'left':newPosition+'%'
          }, {
            duration:timeMoved,
            easing:'swing',
            progress:function(){
              cW = current.width(),
              bW = current.find('.p-bar').css('left'),
              bW = parseFloat(bW),
              cP = (bW/cW)*100;
              if(config.animatedSprites){
                if(config.oldP[id]==null){
                  config.oldP[id]=Math.floor(cP);
                }
                else{
                  if(Math.floor(cP)>config.oldP[id]){
                    takeStep(current.find('.p-bar'));
                    config.oldP[id]=Math.floor(cP);
                  }
                }
              }
              if(cP>=(config.totalDashWidth)){
                finished = true;
                current.find('.p-bar').stop(false,true);
              }
            },
            complete:function(){
              if(finished){
                current.find('.p-bar').css({
                  'left':config.totalDashWidth+'%'
                })
                if(config.replayMode){
                  config.place=config.settings.replay[id].place;
                }
                else{
                  config.replayRecord[id].place=config.place;
                  config.replayRecord[id].yards=config.replayRecord[id].yards.slice(0, -1);
                  config.replayRecord[id].time=config.replayRecord[id].time.slice(0, -1);
                }
                config.finalPlaceOrder[config.place-1]={
                  place:config.place,
                  name:config.settings.player[id].name,
                  orig:id
                }
                current.find('.p-place').text(ordinal(config.place));
                if(config.place=='1'){
                  current.find('.p-place').addClass('gold');
                }
                else if(config.place=='2'){
                  current.find('.p-place').addClass('silver');
                }
                else if(config.place=='3'){
                  current.find('.p-place').addClass('bronze');
                }
                else{
                  current.find('.p-place').addClass('black-outline');
                }
                if(config.animatedSprites){
                  if(parseInt(config.place)<=3){
                    victoryPose(current.find('.p-bar'));
                  }
                  else{
                    defeatPose(current.find('.p-bar'));
                  }
                }
                if(config.finalPlaceOrder.length==config.settings.teams){
                  config.dashing=false;
                  config.dashOver=true;
                  finalPlacements(config.finalPlaceOrder);
                  fin();
                }
                else{
                  config.place++
                }
              }
              else{
                startDash(current);
              }
            }
          })
        })
      }





      // ACTIVATED FUNCTIONS
      config.settings=getSettingsFromUrl();
      setField();
      openSettings();
      fillSettings();
      clickHandler();
      settingsNavigator(1);
      countdown();
      onResize();
    })
  }
})
