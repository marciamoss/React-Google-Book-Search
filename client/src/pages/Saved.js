import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { FormBtn } from "../components/Form";
import DeleteBtn from "../components/DeleteBtn";
import { List, ListItem } from "../components/List";
import API from "../utils/API";

class Saved extends Component {
  state = {
    books: {}
  };

  // When this component mounts, grab all the saved books from database
  componentDidMount() {
    API.getBooks()
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
          <div className="row ml-5 mr-5 mt-5">
               <div  className="col-md-12 "> 
                {this.state.books.length ? (
                  <List>
                    <h4 style={{fontWeight: "bold", color:"white"}}>Saved Books:</h4>
                    {this.state.books.map(book => (
                      <ListItem key={book._id}>
                        <a href={book.booklink} target="blank">
                          <strong>
                            {book.title}{book.authors}    
                            <FormBtn>
                              View
                            </FormBtn>             
                          </strong>
                        </a>
                        <DeleteBtn onClick={() => this.deleteBook(book._id)} />   
                        <br/><br/>
                        <a href={book.booklink} target="blank">
                          <img src={book.bookimg} alt=""></img>
                          <br/><br/>
                          <p>{book.synopsis}</p>
                        </a>
                      </ListItem>
                      ))}
                  </List>
                ) : (
                  <h3 style={{color: "red"}}>No Saved Books yet</h3>
                )}
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <div className="row ml-5 mr-5 mt-5">
              <div className="col-md-12 ">
                <Link to="/">← Back to Search Page</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Saved;
