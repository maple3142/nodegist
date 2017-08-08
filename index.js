var hash=require('object-hash')
var axios=require('axios')
function Gists(options){
	options=options||{}
	this._obj={
		description: options.desc||options.description||'',
		public: options.public||false,
		files: options.files||{}
	}
	this._result={}
}
Gists.prototype.add=function(filename,content){
	if(!filename)throw new TypeError('argument "filename" required')
	content=content||''
	this._obj.files[filename]={
		content: content
	}
	return this
}
Gists.prototype.remove=function(filename){
	if(arguments.length===0)throw new TypeError('argument "filename" required')
	delete this._obj.files[filename]
	return this
}
Gists.prototype.description=Gists.prototype.desc=function(desc){
	if(arguments.length===0)return this._obj.description
	this._obj.description=desc
	return this
}
Gists.prototype.public=function(public){
	if(arguments.length===0)return this._obj.public
	this._obj.public=public
	return this
}
Gists.prototype.create=function(){
	var objhash=hash(this._obj)
	var self=this
	return new Promise(function(res,rej){
		if(self._result[objhash]){
			res(self._result[objhash])
			return
		}
		axios.post('https://api.github.com/gists',self._obj).then(function(r){
			self._result[objhash]=r.data
			res(r.data)
		}).catch(function(e){
			rej(e)
		})
	})
}

module.exports=Gists