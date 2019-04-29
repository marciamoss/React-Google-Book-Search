import axios from "axios";

const BASEURL = "https://www.googleapis.com/books/v1/volumes?q=";
const APIKEY = ":keyes&key=AIzaSyA5c5WsLSg30PL4WJkx92HtHn8JitM_DEo&startIndex=0&maxResults=40";

// Export an object with a "search" method that searches the Giphy API for the passed query
export default {
  search: function(query) {
    let q=(query.book).split(" ").join("+")+(query.author).split(" ").join("+");
    return axios.get(BASEURL + q + APIKEY);
  }
};