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

Template.post.events({
  "click .delete": function () {
    Meteor.call("deletePost", this._id);
  },

  "click .update": function() {
    Meteor.call("updatePost", this._id);
  },

  "click .post-innerbox": function() {
    Router.go('post/:_postId', {_postId: this._id});
  }

});

Template.nav.events({
  "click #logout-button": function() {
    Meteor.logout();
  },
})

Template.post.helpers({
  isOwner:function(owner){
     return (Meteor.userId() == owner)
  }
})

Template.postView.helpers({
  postOwner: function(owner) {
    return Meteor.user()
  }
})

Template.nav.helpers({
  currentUser: function() {
    return Meteor.user();
  }
})


Template.login.events({
  'submit #login-form' : function(event, t){
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


