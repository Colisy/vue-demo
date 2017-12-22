export const incre=({commit}) => commit('incre')
export const changeState=({commit,state},{item,index})=>{
    var obj={};
    obj.item=item;
    obj.index=index;
    commit('changeState',obj)
    // commit('changeState',index)
}
export const playNextSong=({commit,state})=>{
    commit('playNextSong')
}
