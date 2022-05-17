import Panel from "../components/UserForm"

function Register() {
    return (
        <div>
            <Form/>
        </div>
    );
}

const Form = () => (
    <div className="register__panel">
        <div className="register__panel">
            <div className="form__window">
                <Panel title={"Register"}/>
            </div>
        </div>
    </div>
);

export default Register;