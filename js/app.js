let globalDataSet = null;
let currentDataSet = null;

const fetchData = () => {
    fetch('https://www.googleapis.com/books/v1/volumes?q=fiction').then((response) => {
        response.json().then((data) => {
            console.log(data);
            globalDataSet = data.items;
            currentDataSet = data.items;
            sortBooksByName(globalDataSet);
            generateGallery(globalDataSet);
        })
    })
}

const generateBookDetails = (book) => {
    return `<div class='book-container col col-2'> <img src=${book.imageLinks.smallThumbnail} />
     <div class='title'>${book.title}</div><div class='year'>Year: ${book.publishedDate}</div></div>`;
}

const sortBooksByYear = (books) => {
    //parseInt(b.volumeInfo.publishedDate.split("-")[0]);
    books.sort((a,b) => parseInt(a.volumeInfo.publishedDate.split("-")[0]) > parseInt(b.volumeInfo.publishedDate.split("-")[0]) ? 1 : -1);
}

const sortBooksByName = (books) => {
    // Custom sort on title
    books.sort((a,b) => a.volumeInfo.title.toLowerCase() > b.volumeInfo.title.toLowerCase() ? 1 :-1);
}

const sortBooks = () => {
    const sortingSelected = document.querySelector('#sortingCriteria').value;
    console.log("Sorting By: ", sortingSelected);
    if (sortingSelected === 'year') {
        sortBooksByYear(currentDataSet);
    }
    else {
        sortBooksByName(currentDataSet);
    }
    generateGallery(currentDataSet);
}

const generateGallery = (listOfBooks) => {
    currentDataSet = listOfBooks;
    const galleryRow = document.querySelector('#galleryRow');
    let html = "";
    listOfBooks.forEach((book) => {
        html += generateBookDetails(book.volumeInfo);
    });
    galleryRow.innerHTML = html;
}

const doSearch = () => {
    const searchText = document.querySelector('#searchText').value;
    console.log("Searching with value: ", searchText);
    const filteredData = globalDataSet.filter((book) => book.volumeInfo.title.toLowerCase().includes(searchText.toLowerCase()));
    generateGallery(filteredData);
}

fetchData();
