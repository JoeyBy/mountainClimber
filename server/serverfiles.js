  Meteor.startup(function () {
    // code to run on server at startup
    Meteor.publish("posts", function() {
      return Posts.find();
    })
  });