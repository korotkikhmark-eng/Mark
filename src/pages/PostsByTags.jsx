import React, { useEffect,useState } from 'react';
import Tabs from '@mui/material/Tabs';
import { useDispatch, useSelector } from 'react-redux';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import axios from '../axios';
import { useParams } from 'react-router-dom';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchPostsByTags, fetchTags } from '../redux/slices/posts';

export const PostsByTags = () => {
  const dispatch = useDispatch()
  const {posts} = useSelector(state =>state.posts)
  const [data,setData] = useState()
  const {id} = useParams()
  console.log(id)
  const userData = useSelector(state =>state.auth.data)
  useEffect(()=>{
    setData(false)
    dispatch(fetchPostsByTags(id))
  },[])
  const _isTagsLoading = posts.status === 'loading'
  if(_isTagsLoading){
    return <Post isLoading={_isTagsLoading} isFullPost/>
  }


  return (
    <>
      <h1 style={{ marginTop:70,marginLeft:0,transform: 'translateX(-240px)', fontSize:40}}>#{id}</h1>
      <Grid  container spacing={4}>
        <Grid xs={8}  item>
          {(_isTagsLoading ? [...Array(5)] : posts.items).map((obj,index) => (
            _isTagsLoading ? <div style={{transform:'translateX(-250px)'}} ><Post key={index} isLoading={true} /></div> : <div style={{transform:'translateX(-250px)'}}><Post
              _id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}`:''}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={0}
              tags={obj.tags}
              isEditable={userData?._id === obj.user._id}
            /></div>
          ))}
        </Grid>
      </Grid>
      
    </>
  );
};
