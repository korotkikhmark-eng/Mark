import Container from "@mui/material/Container";
import { Routes,Route } from "react-router-dom";
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { useDispatch } from "react-redux";
import { fetchAuthMe, logout } from "./redux/slices/auth";
import { useEffect } from "react";
import { PostsByTags } from "./pages/PostsByTags";

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(logout())
    dispatch(fetchAuthMe())
  },[dispatch])
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/posts/:id' element={<FullPost/>}/>
          <Route path='/tags/:id' element={<PostsByTags/>}/>
          <Route path='/posts/:id/edit' element={<AddPost/>}/>
          <Route path='/add-post' element={<AddPost/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Registration/>}/>
        </Routes>
      </Container>
    </>
  );
}

export default App;
