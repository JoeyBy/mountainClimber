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
  }

});

Template.post.helpers({
    isOwner:function(owner){
       return (Meteor.userId() == owner)
    }
})


// Template.body.helpers({
//   posts: function() {
//     return Posts.find({}, {sort: {createdAt: -1}});
//   }
// });

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});