import React, { useEffect, useState } from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
  const [data,setData] = useState()
  const [load,setLoad] = useState(true)
  const {id} = useParams()

  useEffect(()=>{
    axios
      .get(`${process.env.REACT_APP_API_URL}posts/${id}`)
      .then((res)=>{
        setData(res.data)
        setLoad(false)
    })
      .catch((e)=>{console.log(e)})
  },[id])

  if(load){
    return <Post isLoading={load} isFullPost/>
  }
  

  return (
    <div style={{marginTop:100,width:1000,position:'relative',display:'grid',justifyContent:'center', marginLeft:'auto',marginRight:'auto'}}>
      <Post
        _id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}`:""}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={0}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text}></ReactMarkdown>
      </Post>
      <CommentsBlock
        items={data.comments}
        isLoading={load}
      >
        <Index />
      </CommentsBlock>
    </div>
  );
};
