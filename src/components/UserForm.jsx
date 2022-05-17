import { useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik";
import { GetUser } from "../api/volcano_api"
import * as Yup from 'yup';

const Panel = ({title}) => {
    const navigate = useNavigate();

    const initialState = { email: '', password: ''};

    const formValidate = Yup.object().shape({
        email: Yup.string()
        .email('Invalid email')
        .required('Email Required'),
        password: Yup.string()
        .required('Password Required'),
    });

    return (
        <div className="form__panel">
            <h1 className="form__title">{title}</h1>
            <Formik 
                initialValues={{...initialState}}
                validationSchema={formValidate}
                onSubmit={values => GetUser(title, values, navigate)}
            >
                <Form>
                    <div className="email__field">
                        <label htmlFor="email">
                            Email
                            <span id="error"><ErrorMessage name="email"/></span>
                        </label>
                        <Field name="email" type="email"/>
                        
                    </div>
                    <div className="password__field">
                        <label htmlFor="password">
                            Password
                            <span id="error"><ErrorMessage name="password"/></span>
                        </label>
                        <Field name="password" type="password"/>
                    </div>
                    <div className="submit-button">
                        <button type="submit">{title}</button>
                    </div>
                    
                </Form>
            </Formik>
        </div>
    );
    
};

export default Panel;
