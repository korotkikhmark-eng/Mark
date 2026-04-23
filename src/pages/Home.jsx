import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchComments, fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch()
  const {posts,tags,comments} = useSelector(state =>state.posts)
  const userData = useSelector(state =>state.auth.data)

  const _isPostsLoading = posts.status === 'loading'
  const _isTagsLoading = tags.status === 'loading'
  const _isCommentsLoading = comments.status === 'loading'

  React.useEffect(()=>{
    dispatch(fetchPosts())
    dispatch(fetchTags())
    dispatch(fetchComments())
  },[dispatch])





  return (
    <>
      {/*<Tabs style={{ marginTop:70,marginBottom:15,transform:'translateX(-250px)' }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab onClick={Popular} label="Популярные" />
      </Tabs>*/}

      <Grid style={{ marginTop:70,}} container spacing={4}>
        <Grid xs={8}  item>
          {(_isPostsLoading ? [...Array(5)] : posts.items).map((obj,index) => (
            _isPostsLoading ? <div style={{transform:'translateX(-250px)'}} ><Post key={index} isLoading={true} /></div> : <div style={{transform:'translateX(-250px)'}}><Post
              _id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}`:''}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              tags={obj.tags}
              commentsCount={obj.comments.length}
              isEditable={userData?._id === obj.user._id}
            /></div>
          ))}
        </Grid>
        <Grid style={{position:'fixed', right:120, width:600}} xs={4} item>
          <TagsBlock  items={tags.items} isLoading={_isTagsLoading} >
          </TagsBlock>
          <CommentsBlock
            items={comments.items}
            isLoading={_isCommentsLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};
