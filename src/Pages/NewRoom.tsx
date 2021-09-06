import {Link} from 'react-router-dom';
import {Button} from '../Components/Button';
import { useAuth } from '../Hooks/useAuth';
import {database} from '../Services/firebase';
import {FormEvent, useState} from 'react';
import {useHistory} from 'react-router-dom';


import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss'

// import {TextContext} from '../App';
//  webpack (snowpack, vite, ..);
// Module Bundler -> 

export function NewRoom() {

    //const {value, setValue} = useContext(TextContext);
    const history = useHistory();
    const {user} = useAuth();
    const [newRoom, setNewRoom] = useState("");
    function handleCreateRoom(event: FormEvent) {
        event.preventDefault();
        

        if(newRoom.trim() === "") {
            return;
        }
        // referência para o banco de dados
        // 
        const roomRef = database.ref('rooms');

        const firebaseRoom = roomRef.push({
            title: newRoom,
            authorId: user?.id,
        });

        history.push(`/rooms/${firebaseRoom.key}`)
    }

    // Verificar a autenticação do login nessa página
    // Contextos => Formas de compartilhar informações entre dois ou mais objetos no  React
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
                    {/* <h1>{user?.name} </h1> */}
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                        type="text"
                        placeholder="Nome da sala"
                        onChange = { event => {
                            setNewRoom(event.target.value);
                        }}
                        value={newRoom}
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}