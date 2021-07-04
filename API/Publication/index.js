const Router = require("express").Router();

const PublicationModel = require("../../Database/publication");
/*
route       - /Publication
description - Get all publication
acess       - PUBLIC
parameter   - NONE
method      - GET
*/

Router.get("/", async(req , res) =>{

    const getAllPublication = await PublicationModel.find();

    return res.json({getAllPublication})
});

/*
route       - /publication/add
description - add new publication
acess       - PUBLIC
parameter   - NONE
method      - post
*/

Router.post("/add", async(req ,res) =>{
    const {newPublication} = req.body;
    
    PublicationModel.create(newPublication);
    // database.publications.push(newPublication);
    return res.json({message:"publication is added"})
});

/*
route       - /book/update/Id
description - update publication name
acess       - PUBLIC
parameter   - id
method      - put
*/

Router.put("/update/:Id", (req , res)=>{
    database.publications.forEach((publication) => {
        if(publication.id === parseInt(req.params.Id)){
            publication.name = req.body.newName;
            return;
        }
    });
    return res.json({publication: database.publications});
  });

  /*
route       - /publication/update/book/
description - uodate or add book to publication
acess       - PUBLIC
parameter   - id
method      - put
*/

Router.put("/update/book/:isbn", (req , res)=>{
    //update the publiation database 
    database.publications.forEach((publication)=>{
        if (publication.id === req.body.pubId){
            return publication.books.push(req.params.isbn);
        }
    });
    
    //update the book database
    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
             book.publication = req.body.pubId;
             return;
        }
    });
    
    
    return res.json({
      books:database.books,
      publications:database.publications,
      message: "seccessfully updated"
    });
    
    });
    

/*
Route           /publication/delete/book
Description     delete a book from a publication
Access          PUBLIC
Parameters      isbn, author id
Method          DELETE
*/

Router.delete("/delete/book/:isbn/:pubId" , (req , res) =>{
    // update a publication database
    database.publications.forEach((publication) => {
                 if(publication.id === parseInt(req.params.pubId)){
                     const newBooksList = publication.books.filter(
                         (book) => book !== req.params.isbn
                     );                 
                    publication.books = newBooksList;
                    return;
                }
    });

    // update book database 
    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
            book.publication = 0;
            return;
        }
    });

   return res.json({books: database.books , publications:database.publications})
});


module.exports = Router;