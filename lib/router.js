 // Router.configure({
 //   layoutTemplate: 'layout'  //can be any template name
 // });

Router.route('/', function () {
  this.render('home', {
    data: function () { 
      post = { posts: Posts.find({}, {sort: {createdAt: -1}}) };
      return post;
    }
  })
});

// this.route('authors', {
//   data: function() {
//     templateData = { authors: Authors.find({}) };
//     return templateData;
//   }
// });