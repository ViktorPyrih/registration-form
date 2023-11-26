import zxcvbn from "zxcvbn";
import {useState} from "react";

const PASSWORD_STRENGTH_THRESHOLD = 3;

function RegistrationForm() {
    const [password, setPassword] = useState("");
    return (
        <form onSubmit={e => checkPasswordStrength(e, password)}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required/>

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required/>

            <label htmlFor="password">Password:</label>
            <input value={password} type="password" id="password" name="password"
                   onChange={e => setPassword(e.target.value)}
                   onBlur={e => checkPasswordStrength(e, e.target.value)}
                   required
            />

            <label htmlFor="gender">Gender:</label>
            <select id="gender" name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>

            <button type="submit">Register</button>
        </form>
    );
}

function checkPasswordStrength(e, password) {
    const result = zxcvbn(password);
    if (result.score < PASSWORD_STRENGTH_THRESHOLD) {
        alert(`Password: '${password}' is not strong enough! Warning: ${result.feedback.warning}`);
        e.preventDefault();
    }
}

export default RegistrationForm;
