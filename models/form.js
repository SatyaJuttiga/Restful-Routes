var mongoose = require('mongoose');

var formSchema = new mongoose.Schema({
  name: String,
  fatherName: String,
  email: String,
  mobileNumber: Number,
  address: String 
});

var Form = module.exports = mongoose.model('Form', formSchema);
/*
Recipe.create({
    name:'Pasta',
    image:'https://images.media-allrecipes.com/images/56589.png',
    description:'Pasta is among the most popular Italian pastas. This easy-to-make recipe can be quickly prepared at home using some simple ingredients',
});
*/
