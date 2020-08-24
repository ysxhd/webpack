import React, { useRef, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import {
    Typography,
    Form,
    Tabs
} from "antd";
import './App.scss';
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { todoListData } from "./utils/data";
const { Title } = Typography;
const { TabPane } = Tabs;
import { MenuKey } from "./TodoList";

function App() {
    const callback = () => { };
    const [todoList, setTodoList] = useState(todoListData);

    const activeTodoList = todoList.filter(todo => !todo.isCompleted);
    const completedTodoList = todoList.filter(todo => todo.isCompleted);
   
    const onFinish = () => { };
    const ref = useRef(null);

    const onClick = (todoId: string, key: MenuKey) => {
        if (key === "complete") {
          const newTodoList = todoList.map(todo => {
            if (todo.id === todoId) {
              return { ...todo, isCompleted: !todo.isCompleted };
            }
    
            return todo;
          });
    
          setTodoList(newTodoList);
        } else if (key === "delete") {
          const newTodoList = todoList.filter(todo => todo.id !== todoId);
          setTodoList(newTodoList);
        }
    };
    return (
        <div className="App" ref={ref}>
            <div className="container header">
                <Title level={3}>图雀社区111：汇聚精彩的免费实战教程</Title>
            </div>
            <div className="container">
                <Form onFinish={onFinish}>
                    <Form.Item name="todo">
                        <TodoInput />
                    </Form.Item>
                </Form>
            </div>
            <div className="container">
                <Tabs onChange={callback} type="card">
                    <TabPane tab="所有" key="1">
                        <TodoList todoList={todoList} onClick={onClick}/>
                    </TabPane>
                    <TabPane tab="进行中" key="2">
                        <TodoList todoList={activeTodoList} onClick={onClick}/>
                    </TabPane>
                    <TabPane tab="已完成" key="3">
                        <TodoList todoList={completedTodoList} onClick={onClick}/>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}

export default hot(App);
