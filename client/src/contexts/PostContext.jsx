import axios from 'axios';
import React, {
  createContext, useCallback, useEffect, useState,
  useMemo,
} from 'react';

const PostContext = createContext();
const DeleteContext = createContext();
const SubmitContext = createContext();

function PostContextProvider({ children }) {
  const [input, setInput] = useState({
    name: '',
    address: '',
    about: '',
    image: '',
  });
  const [posts, setPosts] = useState([]);

  const changeHandler = (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // создание карточки ресторана
  const submitHandler = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BASEURL}/api/posts`, { input })
      .then((res) => setPosts((prev) => [...prev, res.data]))
      .catch(console.log);
    setInput('');
  };

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASEURL}/api/posts`)
      .then((res) => setPosts(res.data))
      .catch(console.log);
  }, []);

  const deleteHandler = useCallback((id) => {
    axios.delete(`${process.env.REACT_APP_BASEURL}/api/posts/${id}`)
      .then(() => setPosts((prev) => prev.filter((el) => el.id !== id)))
      .catch(console.log);
  }, []);

  // ??
  const submitCheckBox = useCallback((id) => {
    axios.patch(`${process.env.REACT_APP_BASEURL}/api/posts/${id}`)
      .then((res) => setPosts(res.data))
      .catch(console.log);
  }, []);

  const sender = useMemo(() => ({
    input, posts, submitHandler, changeHandler,
  }), [
    input, posts, submitHandler, changeHandler,
  ]);

  const sender2 = useMemo(() => ({
    submitCheckBox,
  }), [
    submitCheckBox,
  ]);
  return (
    <PostContext.Provider value={sender}>
      <SubmitContext.Provider value={sender2}>
        <DeleteContext.Provider value={deleteHandler}>
          {children}
        </DeleteContext.Provider>
      </SubmitContext.Provider>
    </PostContext.Provider>
  );
}

// export const usePostContext = () => useContext(PostContext);

export { PostContext, DeleteContext, SubmitContext };

export default PostContextProvider;
