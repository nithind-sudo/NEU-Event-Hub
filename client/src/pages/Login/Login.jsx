import React, { useState } from "react";
import TextInput from "../../components/form/TextInput";
import Button from "../../components/ui/Button";

const Login = () => {

    const handleClick = () => {
        console.log("Button clicked!");
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle login here
        console.log("Email:", email, "Password:", password);
    };

    return (
        <div>
            <TextInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
            />
            <Button variant="primary" onClick={handleClick}>
                Click Me
            </Button>
        </div>
    )
    
}

export default Login;