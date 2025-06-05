
//get book details during runtime
const bookImgById = document.getElementById("bookImage");
const bookNameById = document.getElementById("bookName");
const authorNameById = document.getElementById("authorName");
const publishedDateById = document.getElementById("publishedDate");
const descriptionById = document.getElementById("description");
const isbnById = document.getElementById("isbn");
const genreInput = document.getElementById("genreInput");
//ensures async function is executed
document.getElementById("searchBtn").onclick = function(){
  console.log("hello");
  return ValidateIsbnAndSearchBook();
}
async function ValidateIsbnAndSearchBook(){
  //check isbn value first
  const isbn = isbnById.value;
  if(isbn === ""){
    alert("Please Add Book ISBN");
  } else{
    try{
      /*fetches info from google books api. 
      we use the url to query a search for a isbn 
      from the api using ?q, inputting the isbn 
      that was retrieved from the input bubble*/
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);

      if(!response.ok){
        throw new Error('Book Not Found');
      }
      //waits for the response once it comes
      const data = await response.json();
      //retrieves the json data, and we use a book variable to separate the info
      const book = data.items[0].volumeInfo;
      //console.log(data);
      //gets details of the book, separates it into other variables to be shown on the compendium
      bookImgById.src = book.imageLinks ? book.imageLinks.thumbnail: 'https://images.pexels.com/photos/256450/pexels-photo-256450.jpeg';
      bookNameById.value = book.title;
      authorNameById.value = book.authors ? book.authors.join(','): 'Unknown Author'
      publishedDateById.value = book.publishedDate ? book.publishedDate : 'Not Available';
      descriptionById.value = book.description ? book.description : 'Not Available';
      genreInput.value = book.categories ? book.categories : 'Not Available';
    }
    catch(error){
      alert(error.message);
    }
  }
}
