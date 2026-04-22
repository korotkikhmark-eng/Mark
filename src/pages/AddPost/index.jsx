import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { useRef } from 'react';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios';

export const AddPost = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const isAuth = useSelector(selectIsAuth)
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [taags, setTags] = React.useState('');
  const [load, setLoad] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState('');
  const input = useRef(null)
  const tags = taags.split(",")

  const isEditing = Boolean(id)

  const handleChangeFile = async (event) => {
    try{
      const formData = new FormData()
      const file = event.target.files[0]
      formData.append('image', file)
      const {data} = await axios.post('/upload', formData)
      setImageUrl(data.url  )
    }catch(e){
      console.log(e);
      alert('Ошибка')
    }
  };  

  useEffect(()=>{
    if(id){
      axios.get(`/posts/${id}`).then(({data})=>{
        setTitle(data.title)
        setText(data.text)
        setImageUrl(data.imageUrl)
        setTags(data.tags.join(','))
      }).catch((e)=>{
        console.warn(e)
        alert("Ошибка")
      })
    }
  },[])

  const onClickRemoveImage = () => {
    setImageUrl('')
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if(!isAuth){
    return <Navigate to={'/'} ></Navigate>
  }


  const onSubmit = async () =>{
    try{
      setLoad(true)
      const fields = {
        title,
        text,
        imageUrl,
        tags
      }

      const {data} = isEditing? await axios.patch(`${process.env.REACT_APP_API_URL}/posts/${id}`, fields) : await axios.post(`${process.env.REACT_APP_API_URL}/posts/`, fields);
      const _id = isEditing ? id : data._id
      

      navigate(`/posts/${_id}`)

    }catch(e){
      console.warn(e)
      alert("Ошибка при создании статьи")
    }
  }

  return (
    <Paper style={{ padding: 30,marginTop:80 }}>
      <Button onClick={()=>{input.current.click()}} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={input} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {imageUrl && (
        <img className={styles.image} src={`${process.env.REACT_APP_API_URL}${imageUrl}`} alt="Uploaded" />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
      />
      <TextField classes={{ root: styles.tags }} value={tags} onChange={e=>setTags(e.target.value)} variant="standard" placeholder="Тэги" fullWidth />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ?'Сохранить':'Опубликовать'}
        </Button>
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};
