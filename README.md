A simple module allow you to create gists
=========================================

[![Greenkeeper badge](https://badges.greenkeeper.io/maple3142/nodegist.svg)](https://greenkeeper.io/)

example:
------------

```javascript
var Gists=require('nodegist')

var g=new Gists({
	files: {
		'c.js': {
			content: 'var a=1'
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

more information [here](https://maple3142.github.io/docs/nodegist/index.html)