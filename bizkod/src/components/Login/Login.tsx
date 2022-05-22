import { Button, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { stringify } from "querystring";
import { FC, useState } from "react";
import "./Login.css";

async function loginUser(credentials: { username: string; password: string }) {
  return fetch("http://localhost:5000/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}
interface loginProps {
  setToken: (token: string) => void;
}
const Login: FC<loginProps> = ({ setToken }) => {
  const [formValues, setFormValues] = useState({ username: "", password: "" });
  const [form] = useForm();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = await loginUser(formValues);
    setToken(token.token);
  };

  return (
    <div className="container">
      <h1>InfoTour</h1>
      <div className="login-wrapper">
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onValuesChange={(_, values) => setFormValues(values)}
          onSubmitCapture={handleSubmit}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

// return(
//     <div className="login-wrapper">
//     <h1>Please Log In</h1>
//     <form onSubmit={handleSubmit}>
//       <label>
//         <p>Username</p>
//         <input type="text" onChange={e => setUserName(e.target.value)}/>
//       </label>
//       <label>
//         <p>Password</p>
//         <input type="password" onChange={e => setPassword(e.target.value)}/>
//       </label>
//       <div>
//         <button type="submit" >Submit</button>
//       </div>
//     </form>
//   </div>
// )
export default Login;
