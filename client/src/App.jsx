import React, { useEffect } from 'react';
import { Container } from 'reactstrap';
import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MyNavbar from './components/MyNavbar/MyNavbar';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import ProtectedRoute from './HOCs/ProtectedRoute';
import HomePage from './components/HomePage/HomePage';
import CounterPage from './components/CounterPage';
import { checkAuth } from './redux/actions/userActions';
import { fetchPosts } from './redux/actions/postsActions';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchPosts());
  }, []);

  const user = useSelector((state) => state.user);

  return (
    <Container>
      <MyNavbar />
      <Routes>
        <Route element={<ProtectedRoute redirect="/posts" isAllowed={!user.id} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<ProtectedRoute redirect="/login" isAllowed={!!user.id} />}>
          <Route path="/posts" element={<HomePage />} />
          <Route path="/counter" element={<CounterPage />} />
        </Route>
        {/* <Route
          path="/admin"
          element={(
            <ProtectedRoute redirect="/login" isAllowed={!!user.id && user.name === 'admin'}>
              <AdminPage />
            </ProtectedRoute>
          )}
        /> */}
      </Routes>
    </Container>
  );
}

export default App;
