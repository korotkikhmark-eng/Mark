import React,{useEffect} from "react";

import styles from "./AddComment.module.scss";
import { useNavigate, useParams } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "../../axios";

export const Index = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const [comments, setComments] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [taags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  useEffect(()=>{
      if(id){
        axios.get(`/posts-comments/${id}`).then(({data})=>{
          setTitle(data.title)
          setText(data.text)
          setImageUrl(data.imageUrl)
          setTags(data.tags.join(','))
          setComments(data.comments)
        }).catch((e)=>{
          console.warn(e)
          alert("Ошибка")
        })
      }
    },[id])
    const onSubmit = async () =>{
      try{
        setComments(comments.push(comment))
        const tags = taags.split(',')
        const fields = {
          title,
          text,
          imageUrl,
          tags,
          comments
        }

        const {data} = await axios.patch(`${process.env.REACT_APP_API_URL}posts/${id}`, fields)
        const _id = data._id
        console.log(Boolean(_id))

      }catch(e){
        console.warn(e)
        alert("Ошибка при создании статьи")
      }
    }
  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src=""
        />
        <div className={styles.form}>
          <TextField
           value={comment}
            onChange={e=>setComment(e.target.value)}
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button disabled={!Boolean(comment)} variant="contained" onClick={onSubmit}>Отправить</Button>
        </div>
      </div>
    </>
  );
};
