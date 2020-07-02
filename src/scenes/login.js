import React, {Component} from "react";
import {
  Form,
  Icon,
  Alert,
  Input,
  Card,
  Button,
  Checkbox
} from "antd";
import "./login.css";
import {login,} from "../api";
// import logo from '../img/Claircofinallogo.png';
// import {setToken, setEmail, setCsrId, setAdminToken, setUsername} from "../helper";
const FormItem = Form.Item;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class Login extends Component {
  state = {
    loggingIn: false,
    showAlert: false,
    error: "Something has gone wrong"
  };
  handleSubmit = e => {
    console.log("logges");
    this.setState({loggingIn: true, showAlert: false});
    e.preventDefault();
    this
      .props
      .form
      .validateFields(async(err, values) => {
        if (!err) {
          // try {
          //   const userData = (await typeOfLogin(values.email)).data;
          //   // console.log('userData: ',userData);
          //   let res;
          //   if(userData.role === ROLE_ADMIN.str) {
          //     res = await adminLogin(values.email, values.password);              
          //     setAdminToken(res.data.token);
          //     setUsername(res.data.name);
          //     this.props.history.push('/admin');
          //   } else if(userData.role === ROLE_CUSTOMER.str) {
          //     res = await login(values.email, values.password);
          //     setToken(res.data.token);
          //     setCsrId(res.data.CsrId);
          //     setEmail(values.email);
          //     this.props.history.push('/dashboard');
          //   }
          // } catch (err) {
          //   // console.log(err);
          //   this.setState({showAlert: true, error: err.response.data.message});
          // }
          try {
            const userData = (await login(values.email, values.password)).data;
            console.log(userData);
          }catch (err) {
            console.log(err);
          }
          this.setState({loggingIn: false});
        }
      });
  };

  onFinish = (values) => {
      console.log('Success:', values);
    };
  
  onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="loginContainer">
        <Card bordered={false} className="loginBox">
          <div className="loginLogoContainer">
            <a href="/"><img className="loginLogo" src={null}/>
            </a>
          </div>
          <Form
            onSubmit={this.handleSubmit}
            className="login-form"
            style={{
            width: 300,
            textAlign: "center"
          }}>
            <FormItem>
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "Please put valid email!"
                  }, {
                    required: true,
                    message: "Please input your email!"
                  }
                ]
              })(
                <Input
                  prefix={< Icon type = "user" style = {{ color: "rgba(0,0,0,.25)" }}/>}
                  placeholder="Email"/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Please input your Password!"
                  }
                ]
              })(
                <Input.Password
                  prefix={< Icon type = "lock" style = {{ color: "rgba(0,0,0,.25)" }}/>}
                  type="password"
                  placeholder="Password"/>
              )}
            </FormItem>

            <FormItem>
              
            {getFieldDecorator('remember', {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
              <br/>
              <Button
                loading={this.state.loggingIn}
                type="primary"
                htmlType="submit"
                className="loginFormButton">
                Log in
              </Button>
              
              {this.state.showAlert && (<Alert
                style={{
                marginTop: 20
              }}
                message={this.state.error}
                type="error"
                showIcon/>)}
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  };
}

export default Form.create()(Login);
