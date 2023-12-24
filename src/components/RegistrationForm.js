import zxcvbn from "zxcvbn";
import {useState} from "react";

const PASSWORD_STRENGTH_THRESHOLD = 3;

const ATTEMPTS_THRESHOLD = 3;
const RESET_ATTEMPTS_MS = 60000;

function RegistrationForm() {
    const [password, setPassword] = useState("");
    const [attempts, setAttempts] = useState(0);

    const incrementAttempts = () => setAttempts(attempts + 1);
    const resetAttempts = () => setAttempts(0);

    if (attempts >= ATTEMPTS_THRESHOLD) {
        setTimeout(() => setAttempts(0), RESET_ATTEMPTS_MS);
    }

    return (
        <form onSubmit={e => checkPasswordStrength(e, password, incrementAttempts, resetAttempts)}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required/>

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required/>

            <label htmlFor="password">Password:</label>
            <input value={password} type="password" id="password" name="password"
                   onChange={e => setPassword(e.target.value)}
                   onBlur={e => checkPasswordStrength(e, e.target.value, incrementAttempts, resetAttempts)}
                   required
            />

            <label htmlFor="gender">Gender:</label>
            <select id="gender" name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>

            <button type="submit" disabled={attempts >= ATTEMPTS_THRESHOLD}>Register</button>
        </form>
    );
}

function checkPasswordStrength(e, password, incrementAttempts, resetAttempts) {
    const result = zxcvbn(password);
    if (result.score < PASSWORD_STRENGTH_THRESHOLD) {
        incrementAttempts();
        alert(`Password: '${password}' is not strong enough! ${result.feedback.warning ? 'Warning: ' + result.feedback.warning : ''}`);
        e.preventDefault();
    } else {
        resetAttempts();
    }
}

export default RegistrationForm;
