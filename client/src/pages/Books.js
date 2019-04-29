import React, { Component } from "react";
import SaveBtn from "../components/SaveBtn";
import API from "../utils/API";
import GOOGLEAPI from "../utils/GOOGLEAPI";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import PopUps from "../components/PopUps";

class Books extends Component {
  state = {
    books:[],
    book:"",
    author:"",
    show: false,
    handleClose() {
      this.setState({ show: false });
    },
    handleShow() {
      this.setState({ show: true });
    }
  };
  
  saveBook = book =>  {
    if (book.title && book.id) {
      API.saveBook({
        bid: book.id,
        title: book.title,
        authors: book.authors,
        booklink: book.booklink,
        bookimg: book.bookimg,
        synopsis: book.synopsis
      })
        .then(res => console.log("book added"))
        .catch(err => console.log(err));
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // display all the search results
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.book) {
      GOOGLEAPI.search({
        book: this.state.book,
        author: this.state.author
      })
        .then(res => 
              {
                let books=[];
                res.data.items.forEach((element,i) => {
                  let id="", title="", authors="", booklink="", bookimg="", synopsis="";
                  if(element.id){
                    if("etag" in element){
                      id=element.id+element.etag;
                    }
                  }
                  if(element.volumeInfo.title){
                    title=element.volumeInfo.title;
                  }
                  if(element.volumeInfo.authors){
                    authors=" by " + (element.volumeInfo.authors).join(", ");
                  }
                  if(element.volumeInfo.infoLink){
                    booklink=element.volumeInfo.infoLink;
                  }
                  if("imageLinks" in element.volumeInfo){
                    if("smallThumbnail" in element.volumeInfo.imageLinks){
                      bookimg= element.volumeInfo.imageLinks.smallThumbnail;
                    }
                  }
                  if(element.volumeInfo.description){
                    synopsis=element.volumeInfo.description;
                  }
                  books.push({ 
                    id,
                    title,
                    authors,
                    booklink, 
                    bookimg,
                    synopsis
                  });

                });
                
                this.setState({ 
                  books
                }); 
              }
             )
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <div className="row border ml-5 mr-5 mt-5" style={{backgroundColor: "lightblue"}}>
              <PopUps show={this.state.show} handleClose={this.state.handleClose}></PopUps>
              <div  className="col-md-12 ">
                <h1>(React) Google Books Search</h1>           
                <h3>Search for and save books of interest</h3>
              </div>
            </div>     
            <div className="row border ml-5 mr-5 mt-5" style={{backgroundColor: "lightblue"}}>
              <div  className="col-md-12 ">
                <form>            
                  <label style={{fontWeight: "bold", color:"black"}}>Book Search</label>
                  <Input
                    value={this.state.book}
                    onChange={this.handleInputChange}
                    name="book"
                    placeholder="Book Title" 
                  />
                  <Input
                    value={this.state.author}
                    onChange={this.handleInputChange}
                    name="author"
                    placeholder="Author (optional)" 
                  />
                  <FormBtn
                    disabled={!(this.state.book)}
                    onClick={this.handleFormSubmit}
                  >
                    Search
                  </FormBtn>
                </form>
              </div>
            </div>
            <div className="row ml-5 mr-5 mt-5">
               <div  className="col-md-12 "> 
                {this.state.books.length ? (
                  <List>
                    <h4 style={{fontWeight: "bold", color:"white"}}>Results:</h4>
                    {this.state.books.map(book => (
                      <ListItem key={book.id}>
                        <a href={book.booklink} target="blank">
                          <strong>
                            {book.title}{book.authors}                    
                            <FormBtn>
                              View
                            </FormBtn>
                          </strong>
                        </a>
                        <SaveBtn onClick=
                          {(event) => 
                            {
                              event.preventDefault();
                              let handleCloseCopy = this.state.handleClose.bind(this);
                              this.setState({show:true, handleClose: handleCloseCopy});
                              this.saveBook(book)
                            }
                          }  
                        />
                        <br/><br/>
                        <img src={book.bookimg} alt=""></img>
                        <br/><br/>
                        <p>{book.synopsis}</p>
                      </ListItem>
                      ))}
                  </List>
                ) : (
                  <h3 style={{color: "red"}}>No Results to Display</h3>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
