const mongoose = require('mongoose');
// help from chatgptwith Thought model
const Thought = mongoose.model('Thought');

Thought.find({}, '_id', (err, thoughts) => {
   if (err) {
    console.error(err);
   }else {

    const thoughtIDs = thoughts.map(thought => thought._id);

    console.log(thoughtIDs);
   }
})



const userSchema = new mongoose.Schema(
    {
    username: String,
              Unique,
              Required,
              Trimmed,
    email: String,
           Required,
           Unique,
        // Must match a valid email address
    
    thoughts: [_id],  

    

      toJSON: {
        virtuals: true
      }
    }
);


userSchema
   .virtual('friendCount')
//    ?getter
   .get(function () {
     return `${this.friend}`
   })
   // setter to set friends
   .set(function (v) {
    const friend = v.split(' ')[0];
    this.set({friend});
   }) 
   
   


const User = mongoose.model('User', userSchema);

User.findById('yourUserId', (err, user) => {
    if (err) {
     console.error(err);
    } else{

      const friendIds = user.friends.map(friend => friend._id);

      console.log(friendIds);
    }
})


module.exports = User;
// const handleError = (err) => console.error(err);