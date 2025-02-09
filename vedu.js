function shinyDiamondRug(n) {
    let mainstr=''
      for (var i=1;i<=n*2;i+=2)
      { var str ='';
        for(var x=((2*n-1)-i);x>0;x=x-2)
        { str=str+' ';  
            
        }

        for(var j=1;j<=i;j++)
        {
            str=str+'*';
        }
        mainstr +=str+'\n';
        
      //  console.log(str);
      }
      for(var i = (2*n)-3;i>0;i-=2)
      { 
        let str = '';
        for(var x=i;x<(2*n)-1;x=x+2)
            { str=str+' ';  
                
            }
        for(var j=i;j>0;j--)
        { 
            str = str+'*';
        }
             mainstr +=str+'\n';
              ;  
      }
    return mainstr.trimEnd();
    }

console.log("test info");
console.log("test info3");

console.log("test info");
  console.log(shinyDiamondRug(5));