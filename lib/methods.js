Meteor.methods({
  addPost: function(title, body) {
    if(! Meteor.userId()) {
      throw new Meteor.Error("sign in to post!");
    }
    Posts.insert({
      title: title,
      body: body,
      owner: Meteor.userId(),
      username: Meteor.user().username,
      createdAt: new Date(),
      comments: []
    });
  },
  deletePost: function(postId) {
    var post = Posts.findOne(postId);
    if (Meteor.userId() !== post.owner) {
      throw new Meteor.Error("not-authorized");
    }
    Posts.remove(postId);
  },
  // updatePost: function(postId, title, body) {
  //   var post = Posts.findOne(postId);
  //   if (Meteor.userId() !== post.owner) {
  //     throw new Meteor.Error("not-authorized");
  //   }
  //   db.post.update({
  //     title: title,
  //     body: body
  //   });
  // },
  writeComment: function(body, postId) {
    var post = Posts.findOne(postId);
    if (! Meteor.userId()) {
      throw new Meteor.Error("sign in to comment!");
    }
    db.post.update(
      { 'post_id': postId },
      { '$push': { 'comments': {
        'posted': datetime.utcnow(),
        'author': Meteor.userId(),
        'body': body } } 
      } 
    )
  }
})