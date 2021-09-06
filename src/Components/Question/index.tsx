import './styles.scss';
import {ReactNode} from 'react'; // Qualquer conteúdo JSX 
import classname from 'classnames';



type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode;
    isAnswered?: boolean;
    isHighlighted?: boolean;

}

export function Question ({
    content,
    author,
    isAnswered = false,
    isHighlighted = false,
    children
}: QuestionProps) {
    return (
        //<div className={`question ${isAnswered && 'answered'} ${isHighlighted && 'highlighted'}`}>
        <div 
            className={classname(
                'question',
                { answered: isAnswered },
                { highlighted: isHighlighted && !isAnswered}
            )}>    
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />    
                    <span>{author.name}</span>
                </div>
                <div className="teste">
                    {children}
                </div>
            </footer>
        </div>
    )
}