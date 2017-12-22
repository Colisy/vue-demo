import {testing} from 'script/commonVarite'

export const incre = state=>{
    state.playing=!state.playing
}
export const changeState=(state,obj)=>{
    var item=obj.item[obj.index];
    state.isShowplay=true
    state.picture=item
    state.playIndex=obj.index
    state.songs=[{}]
    state.playing=false
    setTimeout(()=>{
        state.songs=[{
            url: testing.address+item.audio_url,
            pic: item.cover_url
        }]
        state.playing=true
    },70)
}

export const playNextSong=(state)=>{
    let lists=JSON.parse(localStorage.getItem('lists'))
    state.playing=false
    let item=lists[state.playIndex+1]
    state.isShowplay=true
    state.picture=item
    state.playIndex=state.playIndex+1
    state.songs=[{}]
    state.playing=false
    setTimeout(()=>{
        state.songs=[{
            url: testing.address+item.audio_url,
            pic: item.cover_url
        }]
        state.playing=true
    },70)
}













//
