import {useHistory} from 'react-router-dom';

import {firebase, auth} from '../Services/firebase'
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import {Button} from '../Components/Button';

//  webpack (snowpack, vite, ..);
// Module Bundler -> 

import '../styles/auth.scss'

export function Home() {
    const history = useHistory();



    function handleCreateRoom() {
        const provider = new firebase.auth.GoogleAuthProvider(); // Permite instanciar uma autenticação via Google no sistema
        auth.signInWithPopup(provider).then(result => {   //Abre um popup do Gmail
            console.log(result);
        })
        //history.push('/rooms/new');
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