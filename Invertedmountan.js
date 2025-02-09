function invertedMountain(n) {
    let str = '';
    for(var i=n;i>0;i--)
    { 
        str = str +'*'
    }
    if(n>1){
        str = str+'\n';
    }
    if(n>0){
    str = str+ invertedMountain(n-1);
    }
    return str;
}

console.log(invertedMountain(4));
