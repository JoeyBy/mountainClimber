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
  currentUser: function(userId) {
    db.Posts.find({ _id: userId})
  },
  deletePost: function(postId) {
    var post = Posts.findOne(postId);
    if (Meteor.userId() !== post.owner) {
      throw new Meteor.Error("not-authorized");
    }
    Posts.remove(postId);
  },
  writeComment: function(body, postId) {
    var post = Posts.findOne(postId);
    if (! Meteor.userId()) {
      throw new Meteor.Error("sign in to comment!");
    }
    db.Posts.update(
      { 'post_id': postId },
      { '$push': { 'comments': {
        'posted': datetime.utcnow(),
        'author': Meteor.userId(),
        'body': body } } 
      } 
    )
  },
  createNewUser: function(username, email, aboutMe, location, password, picture) {
    if(Meteor.userId()) {
      throw new Meteor.Error("You are already signed in!");
    }
    console.log(email)
    console.log(aboutMe)
    console.log(location)
    console.log(password)
    console.log(picture)
    Accounts.createUser({
      username: username,
      email: email,
      profile: {
        aboutMe: aboutMe,
        location: location,
        createdAt: new Date()
      }, 
      password: password, 
      profilePicture: imagesURL
    });
  }
})




