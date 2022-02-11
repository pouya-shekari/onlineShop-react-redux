import {PATHS} from 'configs/routes.config';
import {useRef} from 'react';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {login} from 'redux/actions/user.action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import styles from './login.module.scss'

const PanelLoginPage = props => {

    const formRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const data = Object.fromEntries(form);
        try {
            const response = await props.login(data);
            navigate(PATHS.PANEL_PRODUCT);
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
                <title>Project | Login</title>
            </Helmet>
            <div className={styles.loginPage}>
                <div className={styles.userIcon}>
                    <FontAwesomeIcon style={{fontSize:'10rem' , color:'lightgray'}} icon={faUser} />
                </div>
                <form className={styles.mainForm} onSubmit={handleSubmit} ref={formRef}>
                    <div className={styles.inputMargin}>
                        <label className={styles.loginLabels} htmlFor="username">نام کاربری</label>
                        <div>
                            <input className={styles.loginInput} required={true} name="username"  id="username" type="text" placeholder="نام کاربری ..." />
                        </div>
                    </div>
                    <div className={styles.inputMargin}>
                        <label className={styles.loginLabels} htmlFor="password">رمز عبور</label>
                        <div>
                            <input className={styles.loginInput} required={true} name="password" id="password" type="password" placeholder="کلمه عبور ..." />
                        </div>
                    </div>

                    <button className={styles.button} type="submit">Login</button>
                </form>
            </div>

        </>
    );
};

const mapDispatchToProps = dispatch => ({
    login: (data) => dispatch(login(data))
});

const PanelLogin = connect(undefined, mapDispatchToProps)(PanelLoginPage);

export {PanelLogin};
