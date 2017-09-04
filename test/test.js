const should = require('should')
const axios = require('axios')
const Gists = require('../')
describe('Tests', function () {
	this.timeout(10000)
	var r
	before(done => {
		new Gists()
			.add('a.txt', 'Hello World')
			.add('b.txt', '')
			.remove('b.txt')
			.public(true)
			.desc('nodegist unittest')
			.create()
			.then(res => {
				r = res
				done()
			})
	})
	it('file could be remove', () => {
		Object.keys(r.files).should.not.containEql('b.txt')
	})
	it('content must be right', done => {
		axios.get(r.files['a.txt'].raw_url).then(d => {
			d.data.should.equal('Hello World')
			done()
		})
	})
	it('should be public', () => {
		r.public.should.be.equal(true)
	})
	it('description should be same', () => {
		r.description.should.be.equal('nodegist unittest')
	})
})