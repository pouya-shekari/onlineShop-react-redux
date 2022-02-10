import {PATHS} from 'configs/routes.config';
import React, {useRef} from 'react';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {login} from 'redux/actions/user.action';

const PanelLoginPage = props => {
    const formRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const data = Object.fromEntries(form);

        try {
            const response = await props.login(data);
            navigate(PATHS.HOME);
            console.log('submit: ', response);
        } catch (e) {

        }
    };

    const handleBlur = (e) => {
        if (!formRef.current) return;

        const form = new FormData(formRef.current);
        const data = Object.fromEntries(form);
    }

    return (
        <>
            <Helmet>
                <title>Article | Sign In</title>
                <meta name="keyword" content="article, sign in" />
            </Helmet>
            <div style={{width:'100%' , height:'90vh' , display:'flex' , justifyContent:'center' , alignItems:'center'}}>
                <div className="uk-width-medium uk-margin-auto uk-padding-large uk-padding-remove-horizontal">
                    <form onSubmit={handleSubmit} ref={formRef}>
                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="username">Username</label>
                            <div className="uk-form-controls">
                                <input onBlur={handleBlur} name="username" className="uk-input" id="username" type="text" placeholder="username..." />
                            </div>
                        </div>
                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="password">Password</label>
                            <div className="uk-form-controls">
                                <input name="password" className="uk-input" id="password" type="password" placeholder="password..." />
                            </div>
                        </div>

                        <button className="uk-button uk-button-primary uk-width-1-1" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </>
    );
};

const mapDispatchToProps = dispatch => ({
    login: (data) => dispatch(login(data))
});

const PanelLogin = connect(undefined, mapDispatchToProps)(PanelLoginPage);

export {PanelLogin};
