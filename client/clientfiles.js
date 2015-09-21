Template.newPost.events({
  'submit .new-post': function(event) {
    event.preventDefault();

    var title = event.target.title.value;
    var body = event.target.body.value;

    Meteor.call("addPost", title, body);

    event.target.title.value = '';
    event.target.body.value = '';
  }
});
Template.post.events({
  "click .delete": function () {
    Meteor.call("deletePost", this._id);
  },
  "click .update": function() {
    Meteor.call("updatePost", this._id);
  },
  "click .post-image": function() {
    Router.go('post/:_postId', {_postId: this._id});
  },
  "mouseenter .post-outerbox": function(event, template) {
    template.$('.post-title').css('visibility', 'visible'),
    template.$('.post-outerbox').css('cursor', 'pointer')
  },
  "mouseleave .post-outerbox": function() {
    $('.post-title').css('visibility', 'hidden'),
    $('.post-outerbox').css('cursor', 'default')
  }

});
Template.nav.events({
  "click #logout-button": function() {
    Meteor.logout();
  }
});
Template.newUser.events({
  'submit .register': function(event, t){
    event.preventDefault();
    var username = t.find('#create-username').value;
    var email = t.find('#create-email').value;
    var aboutMe = t.find('#create-about-me').value;
    var location = t.find('#create-location').value;
    var password = t.find('#create-password').value;

    Meteor.call("createNewUser", username, email, aboutMe, location, password)
      event.target.username.value = '';
      event.target.email.value = '';
      event.target.aboutMe.value = '';
      event.target.location.value = '';
      event.target.password.value = '';
  }
});
Template.login.events({
  'submit #login-form': function(event, t){
    event.preventDefault();
    // retrieve the input field values
    var username = t.find('#login-username').value
      , password = t.find('#login-password').value;
      // Trim and validate your fields here.... 

      // Meteor.loginWithPassword() function.
      Meteor.loginWithPassword(username, password, function(err){
      if (err)
        console.log("SOMETHING DIDNT WORK!")
      else
        console.log("Success!")
    });
    return false; 
  }
});
Template.postView.helpers({
  isOwner: function(owner){
     return (Meteor.userId() == owner);
  }
});
// Template.postView.helpers({
//   postOwner: function(owner) {
//     console.log(Meteor.users.find({_id: owner}))
//   }
// });
Template.nav.helpers({
  currentUser: function() {
    return Meteor.user();
  }
});





