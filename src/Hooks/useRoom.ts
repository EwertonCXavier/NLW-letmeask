import {useState, useEffect} from 'react';
import {database} from '../Services/firebase';
import {useAuth} from '../Hooks/useAuth';

type QuestionType = {
    id: string;
    author: {
        name: string,
        avatar: string
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
        likeCount: number;
    likeId: string | undefined;
}

type FirebaseQuestions = Record<string,{
    author: {
        name: string,
        avatar: string,
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<string, {
        authorId: string;
    }>;
}>

export function useRoom (roomId: string) {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [title, setTitle] = useState('');
    const {user} = useAuth();
    
    useEffect(() => {
        console.log(roomId);
        const roomRef = database.ref(`rooms/${roomId}`);
        // Ouvindo um evento somente por uma vez
        roomRef.on('value', room => {
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
                    likeCount: Object.values(value.likes ??  {}).length,
                    //hasLiked: Object.values(value.likes ?? {}).some(like => like.authorId === user?.id) //some permite que eu retorne true or false
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
                }
            })
            
            console.log(parsedQuestions);

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        })

        return () => {
            roomRef.off('value'); //Desativa o listener deste método das perguntas da sala
        }
    }, [roomId, user?.id]); // Antes estava como []
    // id do usuário mudar, é preciso mudar o id, por isso ele fica nos parâmetros do array

    // OBS: Caso um usuário troque de tela, o código do useEffect no formato corrente é atualizado apenas uma vez,
    // deixando o sistema inconsistente.
    // Para evitar esse problema, é necessário colocar a variável a ser escutada no parâmetro da "lista", após a função; 

    return {questions, title}


}