var axios=require('axios')
function Gists(){
	this._obj={
		description: '',
		public: false,
		files: {}
	}
}
Gists.prototype.add=function(filename,content){
	this._obj.files[filename]={
		content: content
	}
	return this
}
Gists.prototype.setDescription=function(desc){
	this._obj.description=desc
	return this
}
Gists.prototype.setPublic=function(public){
	this._obj.public=public
	return this
}
Gists.prototype.create=function(){
	var self=this
	return new Promise(function(res,rej){
		axios.post('https://api.github.com/gists',self._obj).then(function(r){
			res(r.data)
		}).catch(function(e){
			rej(e)
		})
	})
}

module.exports=Gists