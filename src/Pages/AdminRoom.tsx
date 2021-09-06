import {useHistory} from 'react-router-dom'

import logoImg from '../assets/images/logo.svg'
import {Button} from '../Components/Button';
import '../styles/room.scss';
import {RoomCode} from '../Components/RoomCode';

import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';


import {database} from '../Services/firebase';
import {Question} from '../Components/Question';

//import {useAuth} from '../Hooks/useAuth'

import {useRoom} from '../Hooks/useRoom';
import {useParams} from 'react-router-dom';

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    // const {user} = useAuth();
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const {title, questions} = useRoom(roomId);

    async function handleDeleteQuestion(questionId: string){
        if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }


    async function handleEndRoom() {
        database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })
        history.push('/');
    }


    async function handleCheckQuestionAsAnswered (questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        })
    }

    async function handleHighlightQuestion (questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        })
    }


    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div className="">
                        <RoomCode code={roomId}/>
                        <Button isOutlined={true} onClick={handleEndRoom}>Encerrar Sala</Button>
                    </div>
                </div>
            </header>
            <main className="content">
                 <div className="room-title">
                     <h1>Sala {title}</h1>
                     {
                        questions.length > 0 && (questions.length == 1 ?  <span> {questions.length} pergunta</span> : <span> {questions.length} perguntas</span>)
                     }
                 </div>
                 <div className="question-list">
                    {questions.map(question=> {
                    return (
                        <Question 
                        key={question.id}
                        content = {question.content}
                        author = {question.author}
                        isAnswered = {question.isAnswered}
                        isHighlighted= {question.isHighlighted}    
                        
                        >
                        {!question.isAnswered && (
                            <>
                            <button
                                type="button"
                                onClick={() => handleCheckQuestionAsAnswered(question.id)}
                            >
                                <img src={checkImg} alt="Marcar a pergunta como respondida" />
                            </button>
                            <button
                                type="button"
                                onClick={() => handleHighlightQuestion(question.id)}
                            >
                                <img src={answerImg} alt="Responder a pergunta" />
                            </button>
                            </>
                        )}
                        <button
                            type="button"
                            onClick={() => handleDeleteQuestion(question.id)}
                        
                        >
                            <img src={deleteImg} alt="Remover pergunta" />
                        </button>
                            
                        </Question>
                    )
                    })}
                 </div>
            </main>
        </div>
    )
}

// Algoritmo de reconciliação (A respeito da chave/identificador (key))