var hash=require('object-hash')
var axios = require('axios')
/**
 * @constructor
 * @param {object=} options
 * @param {string=} options.desc same as options.description
 * @param {string=} options.description description of gist
 * @param {boolean=} options.public public or private
 */
function Gists(options){
	options = options || {}
	this._obj={
		description: options.desc||options.description||'',
		public: options.public||false,
		files: options.files||{}
	}
	this._result={}
}
/**
 * add file
 * @function
 * @memberof Gists
 * @param  {string} filename name of new file
 * @param  {string} content content of new file
 * @return {Gists} return this for chaining
 */
Gists.prototype.add=function(filename,content){
	if(!filename)throw new TypeError('argument "filename" required')
	content=content||''
	this._obj.files[filename]={
		content: content
	}
	return this
}
/**
 * remove file, do nothing if filename not exist
 * @param  {string} filename name of the file you want to delete
 * @return {Gists} return this for chaining
 */
Gists.prototype.remove=function(filename){
	if(arguments.length===0)throw new TypeError('argument "filename" required')
	delete this._obj.files[filename]
	return this
}
/**
 * set description of the gist
 * @param  {string=} desc description of the gist
 * @return {Gists|string} return current description if no parameter, other case return this
 */
Gists.prototype.description=function(desc){
	if(arguments.length===0)return this._obj.description
	this._obj.description=desc
	return this
}
/**
 * alias of description()
 * @param  {string=} desc description of the gist
 * @return {Gists|string} return current description if no parameter, other case return this
 */
Gists.prototype.desc = function (desc) {
	return this.description(desc)
}
/**
 * set public state of the gist
 * @param  {boolean=} state set true to public, other is private
 * @return {Gists|string} return public or not if no parameter, other case return this
 */
Gists.prototype.public=function(state){
	if(arguments.length===0)return this._obj.state
	this._obj.public=state
	return this
}
/**
 * Response Object
 * @external ResponseObject
 * @see {@link https://developer.github.com/v3/gists/#response-5}
 */
/**
 * @return {Promise.<ResponseObject>} return promise
 */
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

module.exports = Gists