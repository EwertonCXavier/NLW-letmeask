import {useHistory} from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';
import {Button} from '../Components/Button';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss'

// import {TextContext} from '../App';
// import {useContext} from 'react';
//  webpack (snowpack, vite, ..);
// Module Bundler -> 

export function Home() {
    const history = useHistory();
    // const {value, setValue} = useContext(TextContext);
    const {user, signInWithGoogle} = useAuth();

    async function handleCreateRoom() {
        if(!user){  // Se o usuário não estiver autenticado, faz o login
            await signInWithGoogle();
        }
        history.push('/rooms/new'); // Caso esteja, acessa a rota
    }
    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="letmeask" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie a sua sala com o Google
                    </button>
                    <div className="separator">Ou entre em uma sala</div>
                    <form>
                        <input
                        type="text"
                        placeholder="Digite o código da sala"
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}