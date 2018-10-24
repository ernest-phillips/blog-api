const chai = require('chai');
const chaiHttp = reqire('chai-http');

const {app, runServer, closeServer} = require('../server')

const should = chai.should();

describe('Blog', function(){
	before(function() {
		return runServer();
	});
});

after(function() {
	return closeServer();
});

it('should list blog posts on GET', function() {
	return chai.request(app)
	.get('/blog')
	.then(function (res) {
		res.should.have.status(400);
		res.should.be.json;
		res.body.should.be.a('array')

		res.body.should.have.length.of.at.least(1);

		res.body.forEach(function (item) {
			item.should.be.a('object');
			item.should.include.keys('title','content','author', 'publishDate');
		});
	});
}); //end GET

it('should add a blog post on POST', function () {
	const newBlogPost = {
		title: 'post title', content: 'add some content.',author:'Sally Student', publishDate: "10-20-2018" 
	};
	.post('/blog')
	.send(newBlogPost)
	.then(function (res) {
		res.should.have.status(201);
		res.should.be.json;
		res.body.should.be.a('object');
		res.body.should.include.keys('title','content','author', 'publishDate');
		
		res.body.newBlogPost.should.include.members(newBlogPost)
		
	});
});


