let books = [
    {
    ISBN: "12345Book",
    title: "Getting started with MERN",
    pubDate: "2021-07-07",
    language: "en",
    numPage: 250,
    author: [1, 2],
    publication: 1,
    category: ["tech","programming","education","thriller"],

  },
   {
    ISBN: "12345Two",
    title: "Getting started with Python",
    pubDate: "2021-07-07",
    language: "en",
    numPage: 225,
    author: [1, 2],
    publication: 1,
    category: ["fiction", "tech", "web dev"],
    },
];

let authors = [{
    id: 1,
    name: "pavan",
    books: ["12345Book"],
},
{
    id: 2,
    name: "elon musk",
    books: ["12345Book"],
},
];

const publications = [{
    id: 1,
    name: "writex",
    books: ["12345Book"],
},
{
    id: 2,
    name: "Vickie Publications",
    books: [],
  },
];

module.exports = {books,authors,publications};