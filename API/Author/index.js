const Router = require("express").Router();

const AuthorModel = require("../../Database/author");

/*
route       - /author
description - Get all author
acess       - PUBLIC
parameter   - NONE
method      - GET
*/

Router.get("/", async(req , res) => {
    const getAllAuthors = await AuthorModel.find();
   return res.json({author:getAllAuthors});
});

/*
route       - /author
description - Get author based on id
acess       - PUBLIC
parameter   - id
method      - GET
*/

Router.get("/:Id" , async(req , res) => {

const getSpecificAuthor = await AuthorModel.findOne({Id: parseInt(req.params.id)});

// const getSpecificAuthor = database.authors.filter((author) =>{
//     author.id.includes(parseInt(req.params.id));
// });
   
   if(!getSpecificAuthor){
       return res.json({
           error:`no author found for ${req.params.Id}`
       })
   }
   return res.json({author:getSpecificAuthor});
});

/*
route       - /author/add
description - add new author
acess       - PUBLIC
parameter   - NONE
method      - post
*/

Router.post("/add", async (req, res) =>{

    const { newAuthor } = req.body;
    
     AuthorModel.create(newAuthor);
     
    // database.authors.push(newAuthor);
    return res.json({message:"author is added"});

});


module.exports = Router;