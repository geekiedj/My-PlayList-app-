//Song class: Represents a Book
class Song{
    //make the methods a parameter
    constructor(title, artist, songlink){
        //pass parameters and assign to properties of the object using this
        this.title = title;
        this.artist = artist;
        this.songlink = songlink;
    }
}
//UI class: Handle anything in the user interface, remove, add or display a song and alert
class UI {
    //in order not to extansiate the UI class the static method is used
    static displaySongs() {
        //hard coded array of songs
         //got rid of the dummy data and set songs to store method of songs by reaching through local storage
        // const storedSongs = [
        //   {
        //     title: 'Bad to Me',
        //     artist: 'Our Popsi Big Wiz',
        //     songlink: '<a href="https://open.spotify.com/track/2pUlBBWq8R10ylbBvZJV9j?si=eb34a554dc474e7d"> '
        //   },
        //   {
        //     title: 'Kulosa',
        //     artist: 'Oxlaide',
        //     songlink: '<a href="https://open.spotify.com/track/2pUlBBWq8R10ylbBvZJV9j?si=eb34a554dc474e7d"> '
        //   },
        //   {
        //     title: 'PBUY',
        //     artist: 'Asake',
        //     songlink: '<a href="https://open.spotify.com/track/2pUlBBWq8R10ylbBvZJV9j?si=eb34a554dc474e7d"> '
        //   }
        // ];
       //storing the hard coded storedsongs into a variable songs(i'd pretend this my song derived from an api or local storage or something)
        //setting songs to stored method so that it could reach into local storage to access 
       const songs = Store.getSongs;
        //loop through the storedSongs and then call method add songs to list
          //using a forEach method cos its an array
          songs.forEach((songs)=> UI.addSongToList(songs));
    }
    //calling the addSongToList method
    static addSongToList(song) {
    //creating a row to put the songs in the song list from html
    const list = document.querySelector('#song-list');
    //now creating a table row element
    const row = document.createElement('tr');
    //grabbing the row variable and adding some html tags and then we'd be using variables inside the string so using back ticks and bling works
     row.innerHTML = `
     <td>${song.title}</td>
     <td>${song.artist}</td>
     <td>${song.songlink}</td>
     <td> <a href="#" class = "btn btn-danger btn-sm delete">X</a></td>
     `;

     //now appending the row into the list cos thats gna be the content of the list anyway
     list.appendChild(row)
    }
     //adding delete song method
     static deleteSong(el) {
      if (el.classList.container('delete')) {
        //targeting the actual list and targeting the parent parent of the element
        el.parentElement.parentElement.remove();
      }
     }

     //show alerts method
    static showAlert(message, className) {
      //since no placeholder for alerts we'd build from scratch
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      //adding the tezt, putting something in the div
      div.appendChild(document.createTextNode(message));
      //grabbing the parent element in the container to put the alert
      const container = document.querySelector('.container');
      const form = document.querySelector('#song-form');
      //inserting the alert
      container.insertBefore(div, form);
     //want the alert vanishing from screen
      //make vanishing four seconds
      setTimeout(() => document.querySelector('.alert').remove(),4000);
    }
     //adding the clearing fields method
     static clearfields() {
      document.querySelector('#title').value = '';
      document.querySelector('#artist').value = '';
      document.querySelector('#songlink').value = '';
    }
}
//Store class: Takes care of storage

class Store {
  static getSongs() {
    let  songs;
     if (localStorage.getItem('songs') === null ) {
       songs = [];
    } else {
      //because it'll be stored as a string we'd run it through a json.parse 
      //method so that we can use as a regular javascript array of objects and then return it.
      songs = JSON.parselocalStorage.getItem('songs');
    }
    return songs;

  }
  static addSongs(song) {
    //add a song
     //get the song from local storage by doing this:
     const songs = Store.getSongs
     //and then push whatever its passed in as a song
     songs.push (song);
     //then set to local storage and then stringify it 
     localStorage.setItem('songs', JSON.stringify(songs));
  }
  static removeSong(songlink) {
    //removing the book by its linkurl
    const songs = Store.getSongs();
     //loop through them using a forEach
    songs.forEach((song, index) => {
      //checking if the current song being looped through matches the link url passed in for remove song
       if (song.songlink === songlink) {
        // if equal then we'd slice moutta the array using splice method
        songs.splice(index, 1);
      }
    });
     //now we need to reset local storage with the song removed
     localStorage.setItem ('songs', JSON.stringify(songs));
  }
}

//Events: To display song show songs in the list
 //now call display songs, loop through them and add them to the list provided in the row
 //we're listening for when the DOM loads it should run a function
 document.addEventListener('DOMContentLoaded', UI.displaySongs);

//Event: To add song
 //sdding a song
 document.querySelector('#song-form').addEventListener('submit', (e) =>{
  //prevent actual sumit because it is a submit event
  e.preventDefault();
  //get form values
  const title = document.querySelector('#title').value
  const artist = document.querySelector('#artist').value
  const songlink = document.querySelector('#songlink').value

  //validate and check if form is filled
  if(title === '' || artist === '' || songlink === ''){
    UI.showAlert ('Please enter your favorite song!', 'danger');
  }else {
    //instantiate song from the class
   const song = new Song (title, artist, songlink);
  
   //add song to UI
   UI.addSongToList(song) //we'd need to get a method to clear form after submitting and add to local storage. coming back to this
   //console.log(song)

   //Add songs to store
   Store.addSongs(song);

   //show succes message
   UI.showAlert('Song Added', 'success');

   //clearing form
   UI.clearfields();
   }
});

//Event: To remove a song
//targeting an element in the song list, console.log to see that it works
document.querySelector('#song-list').addEventListener('click', (e)=>{
  //remove song from UI
  UI.deleteBook(e.target)

  //Remove song from store
  Store.removeSong(e.target.parentElement.previousElementSibling.textContent);


  //show deleted song message
  UI.showAlert('Song Removed', 'success');
   
});

