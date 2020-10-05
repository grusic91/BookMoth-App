import React, { useState, useEffect } from "react";
import { Switch, Route, withRouter} from "react-router-dom";

//import components
import Homepage from "./Homepage";
import BookListing from "./books-containers/books-page/BookListing";
import BookCreate from "./books-containers/book-create/BookCreate";
import BookManage from "./books-containers/manage/BookManage";
import BookSearchListing from "./books-containers/BookSearchListing";
import BookDetail from "./books-containers/book-detail/BookDetail";
import BookUpdate from "./books-containers/book-detail/BookUpdate";
import Register from "./auth/Register";
import Login from "./auth/Login";
import EmailConfirmation from "./auth/EmailConfirmation";


import { ProtectedRoute } from "./shared/authRoutes/ProtectedRoute";
import { LoggedInRoute } from "./shared/authRoutes/LoggedInRoute";

const Main = (props) => {
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    setImgUrl(`url(${process.env.PUBLIC_URL} /img/ergita-sela-xRHaJgNlFGc-unsplash.jpg)`)
  }, [imgUrl])
  console.log(imgUrl)

  if (imgUrl) {
    return (
      <div
        id="main-page"
        className="component-container"
        style={{
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: imgUrl,
          backgroundAttachment: 'fixed',
          zIndex: -1,
        }}
        >
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/books" component={BookListing}/>
          <ProtectedRoute exact path="/books/new" component={BookCreate}/>
          <ProtectedRoute exact path="/books/manage" component={BookManage} />
          <ProtectedRoute exact path="/books/:title/books" component={BookSearchListing}/>
          <Route exact path="/books/:id" component={BookDetail}/>
          <ProtectedRoute exact path="/books/:id/edit" component={BookUpdate}/>
          <LoggedInRoute exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/confirm/:id" component={EmailConfirmation} />
        </Switch>
        {/*
          Photo by  Ergita Sela on Unsplash
          <span>
            Photo by 
            <a href="https://unsplash.com/@gitsela?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Ergita Sela</a> on <a href="https://unsplash.com/s/photos/book?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>  
        */}
      </div>
    )
  } else {
    return <div><h1>----LOADING-----</h1></div>
  }
 
}


export default withRouter(Main);
