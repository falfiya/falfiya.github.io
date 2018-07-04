/* I'm not using jQuery here for anything more than typed.js. I'd like my code to not give me cancer */
var currentTitle,
    currentState,
    d=document,
    l=localStorage;
    m=Math,
    r=1,
    data={
        timesVisited:1,
        dogTrolld:0,
        dogTrolldBySans:0,
        tamperedWithDevtools:0,
        scolded:0,
        specialSans:0,
        closeDevtoolsOnOpen:0,
        devToolsRekt:0,
    },
    dogHandler={
        set(target,key,value){
            target[key]=value;
            save();
        },
    },
    dogData=new Proxy(data,dogHandler),
    state = {
        selected : 'dog',
        music: null,
        playbackRate:1,
        swapMusic(s){
            var lastMusic=window[this.music];
            if(lastMusic){
                console.log(lastMusic);
                lastMusic.pause(lastMusic.currentTime=0);
            }
            var currentMusicName=s.music();
            this.music=currentMusicName;
            window[currentMusicName].play();
            window[currentMusicName].playbackRate=this.playbackRate;
        },
        applyState(){
            s=this[this.selected];
            this.swapMusic(s);
            img.src='image/'+s.image();
            text.innerHTML=s.text();
            (s.exec?s.exec:_=>{})();
        },
        select(state){
            this.selected=state;
            this.applyState();
        },
        dog : {
            music(){
                this.playbackRate=m.random()+.6;
                return r>2?'DS':'D'+randomNumber(3);
            },
            image(){
                return 'AnnoyingDog.gif';
            },
            text(){
                return dogData.timesVisited;
            }
        },
        sans : {
            music(){
                return dogData.specialSans&&(randomNumber(7)>3?'M':'SP')||'S';
            },
            image(){
                return 'Sans.png';
            },
            text(){
                return dogData.timesVisited;
            },
            exec(){

            }
        },
        asriel : {
            music(){
                return 'MU';
            },
            image(){
                return 'AsrielDreemur.gif';
            },
            text(){
                return '';
            },
            exec(){
                d.body.style.backgroundColor='#000';
            }
        },
        devroom : {
            music(){
                this.playbackRate=m.random()+.6;
                return 'DR';
            },
            image(){
                return 'Devroom.png';
            },
            text(){
                text.hidden=!0;
                var id=setTimeout(_=>{},0);
                while (id--){
                    clearTimeout(id);
                }
                dogData.tamperedWithDevtools++;
            },
            exec(){
                d.body.style.backgroundColor='#000';
            }
        }
    };
/* * F U N C T I O N S * */
function setTimesVisited(times){
    dogData.timesVisited=times;
    location.reload();
}
function setText(string){
	text.innerHTML=string;
}
function randomNumber(n){
    return ~~(m.random()*n);
}
function trueReset() {
   l.removeItem('dogData');
}
function crashPage(){
    dogData.devToolsRekt=!0;
    for(var b=[0],a=0;a<b.length;a++){b.push(a*a*a*a*a);}
}
function type(...arr){
    arr=typeof arr[0]=="object"&&arr[0]||arr;
    $('#text').typed({
        strings: arr,
        showCursor: true,
        cursorChar: "|",
    });
}
function load(){
    var d=l.dogData,p;
    try {
        p=JSON.parse(d);
    }
    catch(e) {
        console.warn('JSON.parse has failed. Resetting localStorage data');
        l.dogData=null;
    }
    finally {
        return p;
    }
}
function save(){
    l.dogData=JSON.stringify(data);
    return this;
}
Object.assign(data,load());
dogData.timesVisited++;
switch(data.timesVisited) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
        state.select('dog')
        break;
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
        state.select('sans');
        break;
    default:
        state.select('asriel');
}
randomNumber(7)<1&&history.pushState({},"",'/dogtrolld');
var currentTitle=0;
var changeTitleInterval = setInterval(_=>{d.title=currentTitle?'Rekt':'Get';currentTitle^=1;},500);
var e=new Image();
Object.defineProperty(e,"id",{
    get(){
        dogData.devToolsRekt||dogData.closeDevtoolsOnOpen&&crashPage();
        state.select('devroom');
    }
});console.log("%c",e);
