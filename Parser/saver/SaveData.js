const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb+srv://search123:search123@bigdb.robcs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

const URLSchema = new Schema({
    title: String,

    url: {
        type:String,
        required: true,
    },
    
    text: String,
    
    dateOfupdate: Date

})

const content = mongoose.model('content',URLSchema);


module.exports = function SaveData(pageTitle,pageURL,pageContent){
    console.log("saving");
         const Link = new content({
             title: pageTitle,
             url: pageURL,
             text: pageContent,
             dateOfupdate: new Date()
         });
       Link.save(function(err){
             if(err){
                 console.log("error from saving in db");
             }else{
                 console.log("ok");
             }
         })
}
 