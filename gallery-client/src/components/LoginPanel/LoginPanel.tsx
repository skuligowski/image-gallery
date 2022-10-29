import { useState } from 'react';
import style from './LoginPanel.module.scss';
import { useLogin } from './useLogin';

const LoginPanel: React.FC = () => {
    const login = useLogin();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const handleLogin = () => login({ username, password });
    return (
        <div>
            <input onChange={(e) => setUsername(e.target.value)} />
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default LoginPanel;