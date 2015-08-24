Posts = new Mongo.Collection("Posts");

if (Meteor.isClient) {
  //This code only runs on the client
  Meteor.subscribe("posts")

  Template.addPostForm.events({
    'submit .new-post': function(event) {
      event.preventDefault();

      var title = event.target.title.value;
      var body = event.target.body.value;

      Meteor.call("addPost", title, body);

      event.target.title.value = '';
      event.target.body.value = '';
    }
  })

  Template.body.helpers({
    posts: function() {
      return Posts.find({}, {sort: {createdAt: -1}});
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Meteor.publish("posts", function() {
      console.log("PUBLISHED!")
      return Posts.find();
    })
  });
}

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
  deletePost: function(postID) {
    var post = Posts.findOne(postId);
    if (Meteor.userId() !== post.owner) {
      throw new Meteor.Error("not-authorized");
    }
    Posts.remove(postID);
  },
  updatePost: function(postID, title, body) {
    var post = Posts.findOne(postID);
    if (Meteor.userId() !== post.owner) {
      throw new Meteor.Error("not-authorized");
    }
    db.post.update({
      title: title,
      body: body
    });
  },
  writeComment: function(body, postID) {
    var post = Posts.findOne(postID);
    if (! Meteor.userId()) {
      throw new Meteor.Error("sign in to comment!");
    }
    db.post.update(
      { 'post_id': postID },
      { '$push': { 'comments': {
        'posted': datetime.utcnow(),
        'author': Meteor.userId(),
        'body': body } } 
      } 
    )
  }
})

  
