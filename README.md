A simple module allow you to create gists
=========================================

simple usage(all the methods below):
------------

```javascript
var Gists=require('nodegist')

var g=new Gists({
	files: {
		'c.js': {
			'content': 'var a=1'
		}
	}
})
g.add('a.txt','a')
g.add('b.txt','b')
g.remove('b.txt')
g.desc('aaaaa')
console.log(g.desc())
g.public(true)
	.description('test')
	.create()
	.then(d=>console.log(d.html_url))
	.catch(e=>console.error(e))
```

Respose Object Documentation:
[github api v3](https://developer.github.com/v3/gists/#response-5)