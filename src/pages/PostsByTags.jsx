import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import { Post } from '../components/Post';
import { fetchPostsByTags} from '../redux/slices/posts';

export const PostsByTags = () => {
  const dispatch = useDispatch()
  const {posts} = useSelector(state =>state.posts)
  const {id} = useParams()
  console.log(id)
  const userData = useSelector(state =>state.auth.data)
  useEffect(()=>{
    dispatch(fetchPostsByTags(id))
  },[dispatch,id])
  const _isTagsLoading = posts.status === 'loading'
  if(_isTagsLoading){
    return <Post isLoading={_isTagsLoading} isFullPost/>
  }


  return (
    <>
      <h1 style={{ marginTop:70,marginLeft:0}}>#{id}</h1>
      <Grid  container spacing={4}>
        <Grid xs={8}  item>
          {(_isTagsLoading ? [...Array(5)] : posts.items).map((obj,index) => (
            _isTagsLoading ? <div style={{transform:'translateX(-250px)'}} ><Post key={index} isLoading={true} /></div> : <div style={{transform:'translateX(-250px)'}}><Post
              _id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}`:''}
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
