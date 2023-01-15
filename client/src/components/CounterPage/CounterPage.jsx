import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  addNumberCounter, clearCounter, decrementCounter, incrementCounter, setCounter,
} from '../../redux/actions/counterActions';

export default function CounterPage() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <Row>
      <Col xs={6}>
        <Button onClick={() => dispatch(incrementCounter())}>+1</Button>
      </Col>
      <Col xs={6}>
        <Button onClick={() => dispatch(decrementCounter())}>-1</Button>
      </Col>
      <Col xs={6}>
        <Button onClick={() => dispatch(clearCounter())}>Clear</Button>
      </Col>
      <Col xs={6}>
        <Button onClick={() => dispatch(setCounter(7))}>set on 7</Button>
      </Col>
      <Col xs={6}>
        <Button onClick={() => dispatch(addNumberCounter(32))}>add +32</Button>
      </Col>
      <Col xs={12}>
        <h2>{counter}</h2>
      </Col>
    </Row>
  );
}
