class Drumkit{
    constructor(){
        this.pads=document.querySelectorAll('.pad');
        this.playBtn=document.querySelector('.play');
        this.currentKick='./sounds/kick-classic.wav';
        this.currentSnare='./sounds/snare-acoustic01.wav';
        this.currentHihat='./sounds/hihat-acoustic01.wav';
        this.kickAudio=document.querySelector('.kick-sound');
        this.snareAudio=document.querySelector('.snare-sound');
        this.hihatAudio=document.querySelector('.hihat-sound');
        this.index=0;
        this.bpm=120;
        this.isPlaying=null;
        this.selects=document.querySelectorAll('select');
        this.muteBtns=document.querySelectorAll('.mute');
        this.tempoBtns=document.querySelectorAll('.tempo');
        this.timeout;
        this.html=document.querySelector('html');
    }
    activePad(){
        this.classList.toggle("active");
    }
    repeat(interval){
        let step=this.index%8;
        const activeBars=document.querySelectorAll(`.b${step}`);
        activeBars.forEach(bar=>{
            if(step%2===0){
                this.html.style.animation=`lights${step} ${Math.round(interval)*2}ms alternate ease-in-out 2`;
            }
            bar.style.animation=`playTrack 300ms alternate ease-in-out 2`;
            if(bar.classList.contains('active')){
                if(bar.classList.contains('kick-pad')){
                    this.kickAudio.currentTime=0;
                    this.kickAudio.play();
                }
                if(bar.classList.contains('snare-pad')){
                    this.snareAudio.currentTime=0;
                    this.snareAudio.play();
                }
                if(bar.classList.contains('hihat-pad')){
                    this.hihatAudio.currentTime=0;
                    this.hihatAudio.play();
                }
            }
        });
        
        this.index++;
    }
    start(){
        const interval=(60/this.bpm)*1000;
        if(!this.isPlaying){
            this.isPlaying=setInterval(()=> {
                this.repeat(interval);
            },interval)
        }else{
            clearInterval(this.isPlaying);
            this.isPlaying=null;
            this.index=0;
        }
    }
    updateBtn(){
        if(this.isPlaying){
            this.playBtn.innerHTML=`<i class="fas fa-stop"></i>`;
            this.playBtn.classList.add('active')
        }
        else{
            this.playBtn.innerHTML=`<i class="fas fa-play">`;
        this.playBtn.classList.remove('active')
        }
    }
    changeSound(e){
        const selectionName=e.target.name;
        const selectionValue=e.target.value;
        switch(selectionName){
            case 'kick-select':
                this.kickAudio.src= selectionValue;
                break;
            case 'snare-select':
                this.snareAudio.src= selectionValue;
                break;
            case 'hihat-select':
                this.hihatAudio.src= selectionValue;
                break;
        }
    }
    mute(e){
    const muteIndex=e.target.getAttribute('data-track');
        e.target.classList.toggle('active');
        if(e.target.classList.contains('active')){
            switch(muteIndex){
                case '0':
                    this.kickAudio.volume=0;
                    break;
                case '1':
                    this.snareAudio.volume=0;
                    break;
                case '2':
                    this.hihatAudio.volume=0;
                    break;
            }
        }
        else{
            switch(muteIndex){
                case '0':
                    this.kickAudio.volume=1;
                    break;
                case '1':
                    this.snareAudio.volume=1;
                    break;
                case '2':
                    this.hihatAudio.volume=1;
                    break;
            }
        }
    }
    changeTempo(e){
        if(e.target.classList.contains('plus')){
        const plusBtn=document.querySelector('.plus');
            if(this.bpm!==300){
                clearTimeout(this.timeout);
                this.bpm+=10;
                plusBtn.innerHTML=this.bpm;
                this.timeout=setTimeout(()=>plusBtn.innerHTML=`<i class="far fa-plus-square"></i>`,1500);
            }else{
                clearTimeout(this.timeout);
                this.bpm=300;
                plusBtn.innerHTML=this.bpm;
                this.timeout=setTimeout(()=>plusBtn.innerHTML=`<i class="far fa-plus-square"></i>`,1500);
            }
        }
        else if(e.target.classList.contains('minus')){
            const minusBtn=document.querySelector('.minus');
            if(this.bpm!==60){
                clearTimeout(this.timeout);
                this.bpm-=10;
                minusBtn.innerHTML=this.bpm;
                this.timeout=setTimeout(()=>minusBtn.innerHTML=`<i class="far fa-minus-square"></i>`,1500);
            }else{
                clearTimeout(this.timeout);
                this.bpm=60;
                minusBtn.innerHTML=this.bpm;
                this.timeout=setTimeout(()=>minusBtn.innerHTML=`<i class="far fa-minus-square"></i>`,1500);
            }
        }
    }
}

const drumkit = new Drumkit();

drumkit.pads.forEach(pad=>{
    pad.addEventListener('click',drumkit.activePad);
    pad.addEventListener('animationend',function(){
        pad.style.animation="";
    })
});

drumkit.playBtn.addEventListener('click',function(){
    drumkit.start();
    drumkit.updateBtn();
});

drumkit.selects.forEach(select=>{
    select.addEventListener('change',function(e){
        drumkit.changeSound(e);
    }
    )
});

drumkit.muteBtns.forEach(btn=>
    btn.addEventListener('click',function(e){
        drumkit.mute(e);
    }));

drumkit.tempoBtns.forEach(btn=>
    btn.addEventListener('click',function(e){
        drumkit.changeTempo(e);
    }));