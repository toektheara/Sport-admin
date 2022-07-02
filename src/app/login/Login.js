import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios_instance from '../../libs/axiosInstance';

export class Login extends Component {

  constructor(props) {
    super(props);

    this.onHandleLogin = this.onHandleLogin.bind(this)
  }

  onHandleLogin = async (e) => {
    e.preventDefault();
    const x = e.target;

    const input = {
      email: x.email.value,
      password: x.password.value,
    };

    try {
      const res = await axios_instance.post('/login', {
          ...input
      })

      localStorage.setItem('token', res.data.token)

      window.location.replace('/')
    } catch(err) {
      console.error(err)
    }
  };


  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo  d-flex justify-content-center" >
                  <img src={"/bakery_shop.jpg"} alt="logo" />
                </div>
                <h4>Sign in to continue.</h4>
                <Form className="pt-3" onSubmit={this.onHandleLogin}>
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="email" placeholder="Username or Email" name="email" size="lg" className="h-auto" />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="password" placeholder="Password" name="password" size="lg" className="h-auto" />
                  </Form.Group>
                  <div className="mt-3">
                    <Button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="submit">SIGN IN</Button>
                  </div>
                  {/* <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input"/>
                        <i className="input-helper"></i>
                        Keep me signed in
                      </label>
                    </div>
                    <a href="!#" onClick={event => event.preventDefault()} className="auth-link text-black">Forgot password?</a>
                  </div> */}
                  {/* <div className="text-center mt-4 font-weight-light">
                    Don't have an account? <Link to="/user-pages/register" className="text-primary">Create</Link>
                  </div> */}
                </Form>
              </div>
            </div>
          </div>
        </div>  
      </div>
    )
  }
}

export default Login
