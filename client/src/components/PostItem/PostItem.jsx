import React, { memo, useState } from 'react';
import {
  Button,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { deletePostAsync, updatePostAsync } from '../../redux/actions/postsActions';

function PostItem({ post, id }) {
  const dispatch = useDispatch();
  console.log('item render');
  const [input, setInput] = useState({
    name: '',
    address: '',
    about: '',
    image: '',
  });
  const changeHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updatePostAsync({ id, input }));
  };
  // обнаружили что все перерендеривается значит надо оптимизировать мемом
  // убрал из начала экспорт дефаулт и сделал мемо вконце и ТИРУЕм его также)
  return (
    <>
      <div className="card" style={{ width: '18rem' }}>
        <img src={post.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">
            {id}
            {post.name}
          </h5>
          <p className="card-text">{post.address}</p>
          {' '}
          <p className="card-text">{post.about}</p>
          {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
          <button type="button" data-bs-toggle="modal" data-bs-target={`#staticBackdrop${post.id}`}>
            Edit
          </button>
          <Button onClick={() => dispatch(deletePostAsync(id))} className="danger">Delete</Button>
        </div>
      </div>
      {/* modal part */}
      <div className="modal fade" id={`staticBackdrop${post.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Введите изменения</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">

              <form>
                <p>
                  This form for
                  {' '}
                  {id}
                </p>
                <div style={{ margin: 'auto', textAlign: 'center' }}>
                  <label htmlFor="exampleInputEmail1" className="form-label" style={{ textAlign: 'left' }}>
                    Name:
                    <input onChange={changeHandler} name="name" placeholder={post.name} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  </label>
                </div>
                <div style={{ margin: 'auto', textAlign: 'center' }}>
                  <label htmlFor="exampleInputEmail1" className="form-label" style={{ textAlign: 'left' }}>
                    Description:
                    <input onChange={changeHandler} name="address" placeholder={post.address} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  </label>
                </div>
                <div style={{ margin: 'auto', textAlign: 'center' }}>
                  <label htmlFor="exampleInputEmail1" className="form-label" style={{ textAlign: 'left' }}>
                    Description:
                    <input onChange={changeHandler} name="about" placeholder={post.about} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  </label>
                </div>
                <div style={{ margin: 'auto', textAlign: 'center' }}>
                  <label htmlFor="exampleInputEmail1" className="form-label" style={{ textAlign: 'left' }}>
                    Description:
                    <input onChange={changeHandler} name="image" placeholder={post.image} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  </label>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <button type="submit" onClick={submitHandler} className="btn btn-primary" style={{ backgroundColor: 'green' }} data-bs-dismiss="modal">Create post</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(PostItem); // HOC - higher order component
