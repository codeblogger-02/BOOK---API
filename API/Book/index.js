// Initilazing Express Router
const Router = require("express").Router();

//Database Models
const BookModel = require("../../Database/book");


/*
route       - /
description - Get all books
acess       - PUBLIC
parameter   - NONE
method      - GET
*/
Router.get("/", async(req,res)=>{
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
})

/*
route       - /is/:isbn
description - Get specific books based on ISBN 
acess       - PUBLIC
parameter   - ISBN
method      - GET
*/

Router.get("/is/:isbn", async (req,res)=>{

const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn});

     
     // without mongodb 
    // const getSpecificBook = database.books.filter(
    //     (book)=> book.ISBN === req.params.isbn
    // );

    if (!getSpecificBook){
        return res.json({
            error: `No book foud ISBN of ${req.params.isbn}`,
        });
    }

    return res.json({book:getSpecificBook});
})

/*
route       - /c
description - Get specific books based on category
acess       - PUBLIC
parameter   - category
method      - GET
*/

Router.get("/c/:category", async (req , res) => {
    const getSpecificBook = await BookModel.findOne({category: req.params.category});

//   const getSpecificBook = database.books.filter((book) => book.category.includes(req.params.category));
    
  if (!getSpecificBook){
    return res.json({
        error: `No book found for category of ${req.params.category}`,
    });
}
return res.json({book:getSpecificBook});
});

/*
route       - /E
description - Get specific books based on language
acess       - PUBLIC
parameter   - language
method      - GET
*/

Router.get("/E/:language", async(req , res) => {

const getSpecificBook = await BookModel.findOne({language: req.params.language});

// const getSpecificBook = database.books.filter(
//   (book) => book.language === req.params.language
// );

if (!getSpecificBook){
    return res.json({
        error: `No book found for language ${req.params.language}`,
    });
}

return res.json({book:getSpecificBook});
});


/*
route       - /Book/add
description - add new book
acess       - PUBLIC
parameter   - NONE
method      - post
*/

Router.post("/add", async (req,res)=>{
    try {
        
    const { newBook } = req.body;

    await BookModel.create(newBook);

    // database.books.push(newBook);
    return res.json({ message:"book was added"});
        
    } catch (error) {
        return res.json({error: error.message});
    }

});

/*
route       - /book/update/title
description - update book title
acess       - PUBLIC
parameter   - isbn
method      - put
*/

Router.put("/update/title/:isbn", async (req , res)=>{

    const updatedBook = await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn,
    },
    {
       title: req.body.bookTitle,    
    },
    {
        new: true,
    }
    );
    //   database.books.forEach((book) => {
    //       if(book.ISBN === req.params.isbn){
    //           book.title = req.body.newBookTitle;
    //           return;
    //       }
    //   });
    
      return res.json({books: updatedBook});
    });

    
/*
route       - /book/update/author
description - update/add new author for a book
acess       - PUBLIC
parameter   - isbn
method      - put
*/

Router.put("/update/author/:isbn" , async (req,res) =>{
    //update book database
    
    const updatedBook = await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn,
    },
    {
        $addToSet:{
            author: req.body.newAuthor,
        },
    },
    {
        new: true,
    }
    );
    // database.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn){
    //         return book.author.push(req.body.newAuthor);
    //     }
    //     });
    //update author database
    
    const updatedAuthor = await AuthorModel.findOneAndUpdate({
        id: req.body.newAuthor,
    },
    {
     $push: {
         books: req.params.isbn,
     },
    },
    {
        new: true,
    }
    );
    // database.authors.forEach((author) => {
    //   if(author.id === req.body.newAuthor) 
    //   return author.books.push(req.params.isbn);
    // });
    
    return res.json({books: updatedBook , authors: updatedAuthor})
    });

    
    /*
route       - /book/delete
description - delete a book
acess       - PUBLIC
parameter   - isbn
method      - DELETE
*/

Router.delete("/delete/:isbn", async (req , res) =>{

    const updatedBookDatabase = await BookModel.findOneAndDelete({
        ISBN: req.params.isbn,
    });
    
        // const updatedBookDatabase = database.books.filter(
        //     (book) => book.ISBN !== req.params.isbn
        // );
        // database.books = updatedBookDatabase;
        return res.json({books: updatedBookDatabase});
    });


    /*
Route           /book/delete/author
Description     delete a author from a book
Access          PUBLIC
Parameters      isbn, author id
Method          DELETE
*/

Router.delete("/delete/author/:isbn/:authorId" ,async (req , res) =>{
    // update the book database
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn,
        },
        {
            $pull:{
                author: parseInt(req.params.authorId),
            }
        },
        {new:true}
    );
    
    
    // database.books.forEach((book) => {
    // if (book.ISBN === req.params.isbn){
       
    //   const newAuthorList = book.authors.filter(
    //       (author) => author !== parseInt(req.params.authorId)
    //   );
    // book.authors = newAuthorList;
    // return;
    // }
    // });
    
    // update the author database
    const updatedAuthor = await AuthorModel.findOneAndUpdate({
        id: parseInt(req.params.authorId),
    },
    {
        $pull:{
            books: req.params.isbn,
        },
    },
    {new:true});
    
    
    
    // database.authors.forEach((author)=>{
    //     if (author.id === parseInt(req.params.authorId)){
    //         const newBooksList = author.books.filter(
    //             (book) => book !== req.params.isbn
    //         );
    //         author.books = newBooksList;
    //         return;
    //     }
    // });
    
    
    return res.json({
        message: " author was deleted",
        book: updatedBook,
        author : updatedAuthor,
    });
    });


module.exports = Router;