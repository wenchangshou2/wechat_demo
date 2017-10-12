const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
var arrayDeepCopy=function(source){
  
  console.log('tt',source,source.length)
  var result=[]
  // for(let i=0,len=source.length;i<=len;i++){
  //   console.log('1111111111111')
  //   let tmp=result[i]
  //   let obj={}
  //   for(var key in tmp){
  //     obj=deepCopy(tmp)
  //   }
  //   result.push(obj)
  // }
  return result
}
var deepCopy = function (source) {
  var result = {};
  for (var key in source) {
    result[key] = typeof source[key] ==='object'? deepCopy(source[key]): source[key];
  }
  return result;
}
export{
  formatTime,
  deepCopy,
  arrayDeepCopy
}
