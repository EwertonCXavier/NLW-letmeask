import {useParams} from 'react-router-dom';

import logoImg from '../assets/images/logo.svg'
import {Button} from '../Components/Button';
import '../styles/room.scss';
import {RoomCode} from '../Components/RoomCode';
import {useState, FormEvent, useEffect} from 'react';
import {useAuth} from '../Hooks/useAuth';


import {database} from '../Services/firebase';


type RoomParams = {
    id: string;
}

type FirebaseQuestions = Record<string,{
    author: {
        name: string,
        avatar: string,
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>

type Question = {
    id: string;
    author: {
        name: string,
        avatar: string
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}


export function Room() {
    const {user} = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [title, setTitle] = useState('');
    useEffect(() => {
        console.log(roomId);
        const roomRef = database.ref(`rooms/${roomId}`);
        // Ouvindo um evento somente por uma vez
        roomRef.once('value', room => {
            //console.log(room.val()); // .val() -> Busca os valores dentro de room
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}; 

            // É necessário dar um parse no código (Objeto -> Array)
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                }
            })
            
            console.log(parsedQuestions);

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        })
    }, [roomId]); // Antes estava como []

    // OBS: Caso um usuário troque de tela, o código do useEffect no formato corrente é atualizado apenas uma vez,
    // deixando o sistema inconsistente.
    // Para evitar esse problema, é necessário colocar a variável a ser escutada no parâmetro da "lista", após a função; 

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault(); // Não recarregar a tela
        // Caso não tenha nada digitado, "retorna" para a mesma tela
        if(newQuestion.trim() === ""){
            return;
        }

        if(!user) {
            throw new Error('');
        }
        // Cria a questão (dúvida)
        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswered: false,
        }

        await database.ref(`rooms/${roomId}/questions`).push(question);
    }


    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <RoomCode code={roomId}/>
                </div>
            </header>
            <main className="content">
                 <div className="room-title">
                     <h1>Sala {title}</h1>
                     {
                        questions.length > 0 && (questions.length == 1 ?  <span> {questions.length} pergunta</span> : <span> {questions.length} perguntas</span>)
                     }
                 </div>

                 <form onSubmit={handleSendQuestion}>
                     <textarea 
                        placeholder="O que deseja perguntar?"
                        onChange = { (e)  => setNewQuestion(e.target.value)}
                     />
                    <div className="form-footer">
                        {user ? 
                        (
                        <div className="user-info">
                            <img src={user.avatar} alt={user.name} />
                            <span>{user.name}</span>
                        </div>
                        ) : (
                            <span>Para enviar uma pergunta, <button>faça seu login</button></span>
                        )}
                        
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                 </form>
                 {JSON.stringify(questions)}
            </main>
        </div>
    )
}