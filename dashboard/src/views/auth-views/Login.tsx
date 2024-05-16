import React, {useCallback, useState} from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import {Button, Col, Form, Input, Row} from "antd";
import {AuthFormWrap} from './styled-elements';
import {Checkbox} from "../../components/checkbox/Checkbox";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {signIn} from "../../redux/auth/actionCreator";
import {RootState} from "../../redux/store";


const Login = () => {
    // TODO: check double render
    console.log("login component")
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const isLoading = false;

    const dispatch = useAppDispatch();
    const {isLoggedIn} = useAppSelector((state: RootState) => {
        return {
            isLoggedIn: state.auth.isLoggedIn,
        };
    });

    const [state, setState] = useState({
        checked: false,
    });

    const onChange = useCallback(
        (checked: boolean, value?: unknown) => {
            setState({...state, checked});
        },
        [state],
    );

    const handleSubmit = useCallback(
        (value: { email: string, password: string }) => {
            const controller = new AbortController();
            const {signal} = controller;
            dispatch(signIn({...value, signal}));
            return () => {
                controller.abort();
            };
        },
        [dispatch],
    );

    // TODO: Redirect handle

    // useEffect(() => {
    //     console.log("Login useEffect", isLoggedIn)
    //     if (isLoggedIn) {
    //         window.location.href = '/admin'
    //     }
    // }, [isLoggedIn])
    //
    // if (isLoggedIn) {
    //     return <Navigate to="/admin"/>;
    // }

    return (
        <Row justify="center">
            <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
                <AuthFormWrap>
                    <div className="ninjadash-authentication-top">
                        <h2 className="ninjadash-authentication-top__title">Sign in EasyLearner</h2>
                    </div>
                    <div className="ninjadash-authentication-content">
                        <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
                            <Form.Item
                                name="email"
                                rules={[{message: 'Please input your username or Email!', required: true}]}
                                initialValue=""
                                label="Username or Email Address"
                            >
                                <Input placeholder="name@example.com"/>
                            </Form.Item>
                            <Form.Item name="password" initialValue="123456" label="Password">
                                <Input.Password placeholder="Password"/>
                            </Form.Item>
                            <div className="ninjadash-auth-extra-links">
                                <Checkbox onChange={onChange} checked={state.checked}>
                                    Keep me logged in
                                </Checkbox>
                                <NavLink className="forgot-pass-link" to="/forgotPassword">
                                    Forgot password?
                                </NavLink>
                            </div>
                            <Form.Item>
                                <Button className="btn-signin" htmlType="submit" type="primary" size="large">
                                    {isLoading ? 'Loading...' : 'Sign In'}
                                </Button>
                            </Form.Item>
                            {/* <p className="ninjadash-form-divider">
                                <span>Or</span>
                            </p>
                            <ul className="ninjadash-social-login">
                                <li>
                                    <Link className="google-social" to="#">
                                        <ReactSVG src={require(`../../static/icon/google-plus.svg`).default}/>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="facebook-social" to="#">
                                        <Facebook/>
                                    </Link>
                                </li>
                            </ul>
                            <div className="auth0-login">
                                <Link to="#">
                                    SignIn
                                </Link>
                            </div>*/}
                        </Form>
                    </div>
                    <div className="ninjadash-authentication-bottom">
                        <p>
                            Don`t have an account?<Link to="/register">Sign up</Link>
                        </p>
                    </div>
                </AuthFormWrap>
            </Col>
        </Row>
    );
};

export default Login;
