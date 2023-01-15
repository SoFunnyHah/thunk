import React, { useCallback, useState } from 'react';
import {
  Form, FormGroup, Label, Input, Button, Row, Col,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { submitPostAsync } from '../../redux/actions/postsActions';

export default function MyForm() {
  const [input, setInput] = useState({
    name: '',
    address: '',
    about: '',
    image: '',
  });
  const dispatch = useDispatch();
  const changeHandler = useCallback((e) => setInput((prev) => (
    { ...prev, [e.target.name]: e.target.value })), []);
  const submitHandler = useCallback((e) => {
    e.preventDefault();
    dispatch(submitPostAsync(input));
    setInput({
      name: '',
      address: '',
      about: '',
      image: '',
    });
  }, [input]);
  return (
    <Row>
      <Col>
        <Form onSubmit={submitHandler}>
          <FormGroup>
            <Label for="exampleEmail">
              Название ресторана
            </Label>
            <Input
              value={input.name}
              name="name"
              placeholder="..."
              type="text"
              onChange={changeHandler}
            />
          </FormGroup>

          <FormGroup>
            <Label for="exampleEmail">
              Адрес
            </Label>
            <Input
              value={input.address}
              name="address"
              placeholder="..."
              type="text"
              onChange={changeHandler}
            />
          </FormGroup>

          <FormGroup>
            <Label for="exampleEmail">
              О ресторане
            </Label>
            <Input
              value={input.about}
              name="about"
              placeholder="..."
              type="text"
              onChange={changeHandler}
            />
          </FormGroup>

          <FormGroup>
            <Label for="exampleEmail">
              Ссылка на изображение
            </Label>
            <Input
              value={input.image}
              name="image"
              placeholder="..."
              type="text"
              onChange={changeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Button type="submit">Send</Button>
          </FormGroup>
        </Form>
      </Col>
    </Row>
  );
}
