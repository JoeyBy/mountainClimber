 // Router.configure({
 //   layoutTemplate: 'layout'  //can be any template name
 // });
Router.route('/', function () {
  this.render('home', {
    data: function () { 
      var post = { posts: Posts.find({}, {sort: {createdAt: -1}}) };
      return post;
    }
  })
});

Router.route('user/new', function() {
  this.render('newUser')
})

Router.route('post/:_postId', function() {
  Session.set('postId', this.params._postId);
  this.render("postView", {
    data: function() {
      var onePost = {singlePost: Posts.findOne({_id: this.params._postId})}
      return onePost
    }
  })
})