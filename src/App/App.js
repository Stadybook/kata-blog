import React from "react";
import './App.scss';
import Header from "../Header";
import ArticleList from "../ArticleList";

export default function App(){
    return(
        <div className="container">
            <Header />
            <ArticleList />
       </div>
    )
}