import { ThumbsUp, Trash } from 'phosphor-react';
import styles from './Comment.module.css';
import { Avatar } from './Avatar';
import { useState } from 'react';

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {

  // criação de um novo estado para o contador de likes
  const [likeCount, setLikeCount] = useState(0);

  // função para adicionar um like ao comentário
  function handleDeleteComment() {
    onDeleteComment(content);
  }
  // função para adicionar um like ao comentário
  function handleLikeComment() {
    setLikeCount((prevState) => {
      return prevState + 1
    });
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/crlaila.png" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Laila Silva</strong>
              <time title="03 de Agosto ás 21:08" dateTime="2024-08-03 21:08:30">Cerca de 1h atrás</time>
            </div> 

            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>
          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp size={20} />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}