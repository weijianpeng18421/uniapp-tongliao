export function isNullOrEmpty (str) {
  return str == null || str === '' || str === undefined || str === 'undefined'
}
export function objIsNullOrEmpty (obj) {
	for(var i in obj){
		if(obj[i] == null || obj[i] === '' || obj[i] === undefined || obj[i] === 'undefined'){
			return true
		}
	}
  return false
}
//用于生成uuid
export function getUUID () {
	function S4() {
	    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	}
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
//截取指定字符，返回数组
export function getStr (string,str) {
  return string.split(str);
}
