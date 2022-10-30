import { useState } from 'react';
import { ButtonLoader } from '../Loader/Loader';
import style from './LoginPanel.module.scss';
import { useLogin } from './useLogin';

const LoginPanel: React.FC = () => {
    const { login, loading, error } = useLogin();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const handleLogin = () => username && password && login({ username, password });
    const onEnter = (callback: () => any) => (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            callback();
        }
    } 
    return (
        <div className={style.container}>
            <div className={style.loginPane}>
                <div className={style.pic} />
                <div className={style.form}>
                    <h2>Login</h2>
                    <div className={style.formField}>
                        <input 
                            onChange={(e) => setUsername(e.target.value)} 
                            placeholder="Username" 
                            disabled={loading}
                        />
                    </div>
                    <div className={style.formField}>
                        <input 
                            type="password" 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Password" 
                            disabled={loading}
                            onKeyDown={onEnter(handleLogin)}
                        />
                    </div>
                    <div className={style.formField}>
                        <button onClick={handleLogin} disabled={!username || !password} className={loading ? style.loading : undefined}>
                            <span className={style.label}>Login</span>
                        </button>
                        {loading ? <ButtonLoader className={style.loader} /> : null}
                    </div>
                    { error ? (
                        <div className={style.errorInfo}>
                            The username or password is incorrect, please try again.
                        </div>
                    ) : null }
                </div>
            </div>
        </div>
    );
}

export default LoginPanel;