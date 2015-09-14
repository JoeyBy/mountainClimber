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
      var userReference = {posterUser: Meteor.users.findOne({_id: onePost.singlePost.owner })}
        return {
          onePost: onePost,
          poster: userReference
        }
      }
    })
})

Router.route('/post/new', function() {
  this.render("newPost")
})