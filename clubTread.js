

if (Meteor.isClient) {

}

if (Meteor.isServer) {

}

// Meteor.methods({
//   addPost: function(title, body) {
//     if(! Meteor.userId()) {
//       throw new Meteor.Error("sign in to post!");
//     }
//     Posts.insert({
//       title: title,
//       body: body,
//       owner: Meteor.userId(),
//       username: Meteor.user().username,
//       createdAt: new Date(),
//       comments: []
//     });
//   },
//   deletePost: function(postID) {
//     var post = Posts.findOne(postId);
//     if (Meteor.userId() !== post.owner) {
//       throw new Meteor.Error("not-authorized");
//     }
//     Posts.remove(postID);
//   },
//   updatePost: function(postID, title, body) {
//     var post = Posts.findOne(postID);
//     if (Meteor.userId() !== post.owner) {
//       throw new Meteor.Error("not-authorized");
//     }
//     db.post.update({
//       title: title,
//       body: body
//     });
//   },
//   writeComment: function(body, postID) {
//     var post = Posts.findOne(postID);
//     if (! Meteor.userId()) {
//       throw new Meteor.Error("sign in to comment!");
//     }
//     db.post.update(
//       { 'post_id': postID },
//       { '$push': { 'comments': {
//         'posted': datetime.utcnow(),
//         'author': Meteor.userId(),
//         'body': body } } 
//       } 
//     )
//   }
// })

  
