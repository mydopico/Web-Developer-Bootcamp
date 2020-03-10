# RESTful Routing

## Intro

* Define REST
REST - it's a pattern or defining a route
a mapping between HTTP routes and CRUD
CRUD - 
ex. blog
create   
read       /allBlogs
update     /updateBlog/:id
destroy    /destroy/:id

REST make you follow a pattern, it's conventional and reliable

* List all 7 RESTful routes

name     path         HTTP verb    description
============================================
INDEX    /dogs           GET        Display a list of all dog

NEW      /dogs/new       GET        Displays a form to make a new dog

CREATE   /dogs           POST       Add new dog to DB, then redirect somewhere

SHOW     /dogs/:id       GET        Shows info about one specific dog

EDIT     /dogs/:id/edit  GET        Shows edit form for one dog

UPDATE   /dogs/:id       PUT        Update a particular dog, then redirect somewhere

DESTROY   /dogs/:id      DELETE     Delete a particular dog, then redirect somewhere


* Show example of RESTful routing in practice

# Blog Index

* Setup the Blog App
  mkdir RESTfulBlodApp
  cd RESTfulBlodApp
  npm init
  npm install express mongoose body-parser --save
  touch app.js and open it
  app.js - require packages, app config, mongose/model config, routes
  npm install ejs --save

  mkdir views 
  touch views/index.ejs and open it

  app.get("/blogs", function(req, res){
  //retrieve from db
  Blog.find({}, function(err, blogs){
     if(err){
       console.log("error!");
     } else {
       res.render("index", {blogs: blogs})
      }
  });
});


* Create the Blog model

* Add INDEX route and template

 app.get("/blogs", function(req, res){
  //retrieve from db
  Blog.find({}, function(err, blogs){
     if(err){
       console.log("error!");
     } else {
       res.render("index", {blogs: blogs})
      }
  });
});

  * template
  <h1>INDEX PAGE</h1>
  <% blogs.forEach(function(blog){ %>
      <div>
        <h2><%=blog.title%></h2>
        <img src="<%= blog.image %>">
        <span><%= blog.created %></span>
        <p><%= blog.body %></p>
      </div>

  <% }); %>

# Basic Layout

* Add header and footer partials
mkdir views/partials
touch views/partials/header.ejs and open them
include partials in index.ejs ...


* Include Semantic IU

* Add Simple Nav Bar



