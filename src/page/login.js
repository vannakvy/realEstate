import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Image } from 'antd';
import { Redirect, useHistory, } from 'react-router-dom';
import Logo from '../asset/srLogo.png';
import {useDispatch} from 'react-redux'
import {login} from '../actions/authAction'


export default function Login() {
 const history = useHistory();
  const dispatch = useDispatch()

 const onFinish = (values) => {
  dispatch(login(values.email, values.password ))
 };

 const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
 }; 


 return (
  <Row>
   <Col
    xs={{ span: 24 }}
    md={{ span: 16, offset: 4 }}
    lg={{ span: 12, offset: 6 }}
    xl={{ span: 8, offset: 8 }}
   >
    <div className="login-form">
     <div className="login-logo">
      <Image width={'100%'} src={Logo} preview={false} />
     </div>
     <h2 style={{ color: '#707070' }}>ការចូលគណនី</h2>
     <div className="line-shape"></div>
     <Form
      autoComplete="off"
      name="basic"
      // style={{margin:'20%'}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
     >
      <Form.Item
       // label="Username"
       name="email"
       rules={[
        {
         required: true,
         message: 'ត្រូវបំពេញប្រអប់ខាងលើ!',
        },
       ]}
      >
       <Input type="email" placeholder="ឈ្មោះសម្គាល់" className="login-input" />
      </Form.Item>

      <Form.Item
       // label="Password"
       name="password"
       rules={[
        {
         required: true,
         message: 'ត្រូវបំពេញប្រអប់ខាងលើ!',
        },
       ]}
      >
       <Input
        type="password"
        placeholder="លេខសម្ងាត់"
        className="login-input"
       />
      </Form.Item>

      <Form.Item>
       <Button
        type="primary"
        htmlType="submit"
        style={{ width: '100%', height: 'auto', fontSize: 20 }}
       >
        ចូល
       </Button>
      </Form.Item>
     </Form>
    </div>
   </Col>
  </Row>
 );
}

{
 /* <Row>
<Col
    xs={{ span: 24}}
    md={{span: 16, offset: 4}}
    lg={{span: 12, offset: 6}}
    xl={{span: 8, offset: 8}}

>
    <div className="login-form">

        <div className="login-logo">
            <Image width={"100%"} src={Logo} preview={false} />
        </div>
        <h2 style={{ color: '#707070' }}>ការចូលគណនី</h2>
        <div className="line-shape"></div>
        <Form
            name="basic"
            // style={{margin:'20%'}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                // label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'ត្រូវបំពេញប្រអប់ខាងលើ!',
                    },
                ]}
            >
                <Input placeholder="ឈ្មោះសម្គាល់" className="login-input" />
            </Form.Item>

            <Form.Item
                // label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'ត្រូវបំពេញប្រអប់ខាងលើ!',
                    },
                ]}
            >
                <Input type="password" placeholder="លេខសម្ងាត់" className="login-input" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: "100%", height: 'auto', fontSize: 20 }}>
                    ចូល
                </Button>
            </Form.Item>
        </Form>
    </div>
</Col>
</Row> */
}

// <Row>
// <Col
//   xs={{ span: 6, offset: 9 }}
//   style={{
//     padding: 20,
//   }}
// >
//   <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
//     <Form.Item
//       label="Username"
//       name="username"
//       rules={[
//         {
//           required: true,
//           message: "Please input your username!",
//         },
//       ]}
//     >
//       <Input />
//     </Form.Item>
//     <Form.Item
//       label="Password"
//       name="password"
//       rules={[
//         {
//           required: true,
//           message: "Please input your password!",
//         },
//       ]}
//     >
//       <Input.Password />
//     </Form.Item>

//     <Form.Item>
//       <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
//         Submit
//       </Button>
//     </Form.Item>
//   </Form>
// </Col>
// </Row>
