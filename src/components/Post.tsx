import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

import { Comment } from "./Comment";
import { Avatar } from './Avatar';

import styles from "./Post.module.css";
import { useState, type ChangeEvent, type FormEvent, type InvalidEvent } from "react";

interface Author{
  name: string;
  avatarUrl: string;
  role: string;
}

interface Content{
  type: 'paragraph' | 'link';
  content: string;
}

interface PostProps{
  author: Author;
  publishedAt: Date;
  content: Content[];
}

// desestruturação do objeto props para usar apenas as propriedades necessárias
export function Post({ author, publishedAt, content } : PostProps) {
  const [comments, setComments] = useState([
    'Poste legal!',
  ]);
  // criação de um novo estado, função começa com o mesmo nome do estado e set no início
  const [newCommentText, setNewCommentText] = useState('');

  //format -> função que formata a data para o formato desejado
  const publishedDateFormatted = format(new Date(publishedAt), "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  });

  //formatDistanceToNow -> função que formata a data para o tempo relativo em relação ao momento atual
  const publishedDateRelativeToNow  = formatDistanceToNow(new Date(publishedAt), {
    locale: ptBR,
    addSuffix: true,
  });

  //função para criar um novo comentário
  function handleCreateNewComment(event: FormEvent){
    event.preventDefault();

    setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  //função para atualizar o estado do campo de comentário
  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  }

  //função para validar o campo de comentário
  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('O comentário não pode estar vazio');
  }

  //função para deletar comentários conectando o componente Comment com o Post
  //imutabilidade -> as variáveis de estado não podem ser alteradas diretamente, por isso é necessário criar uma nova variável na memória
  function deleteComment(commentToDelete: string){
    //criar uma nova lista de comentários sem o comentário que foi deletado
    const commentsWithouDeletedOne = comments.filter(comment => comment !== commentToDelete);
    setComments(commentsWithouDeletedOne);
  }

  //verifica se o campo de comentário está vazio
  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl}/>
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        {/*Precisamos tornar a data em string / INTL para formatação da data ou instalando date-fns*/}
        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(item => {
          switch (item.type) {
            case "paragraph":
              return <p key={item.content}>{item.content}</p>;
            case "link":
              return <p key={item.content}><a href={item.content}>{item.content}</a></p>;
            default:
              return null;
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe o seu feedback</strong>

        <textarea 
          name="comment"
          placeholder="Deixe um comentário"
          value={newCommentText}
          onChange={handleNewCommentChange}
          //evento para validar o campo de comentário
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          {/* disabled -> propriedade que desabilita o botão */}
          <button type="submit" disabled={isNewCommentEmpty} >
            Publicar
          </button>
        </footer>

      </form>

      <div className={styles.commentsList}>
        {comments.map(comment => {
          return (
            <Comment 
              key={comment} 
              content={comment} 
              onDeleteComment={deleteComment}
            />
          )
        })}
       
      </div>
    </article>
  )
}