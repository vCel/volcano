
import Panel from "../components/UserForm"

function Login() {
    return (
            <Form/>
    );
}

function Form() {
    return (
        <div className="login__panel">
            <div className="form__window">
                <Panel title={"Login"}/>
            </div>
        </div>
    );
    
};

export default Login;