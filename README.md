A simple module allow you to create gists
=========================================

simple usage(all the methods below):
------------

```javascript
var Gists=require('nodegist')

var g=new Gists()
g.add('a.txt','aaaaa')
g.add('b.txt','bbbbb')
g.setDescription('test desc')
g.setPublic(true)
g.create().then(response=>{
	console.log(response)
})

//chaining
new Gists().add('a.txt','aaaaa').create().then(response=>{
	console.log(response)
})
```

Respose Object Documentation:
[github api v3](https://developer.github.com/v3/gists/#response-5)