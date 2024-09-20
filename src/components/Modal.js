"use client";
import {useRef} from 'react'
import styles from './modal.module.scss'


export default function Modal({ props }) {
  const { open, setOpen, tarefas, setTarefas, type, index } = props;


  const tarefa = useRef(null);

  const saveTask = () => {
    const newTarefas = [...tarefas.tarefasAFazer, tarefa.current.value];
    setTarefas({...tarefas, tarefasAFazer: newTarefas});
    setOpen(false);
    localStorage.setItem('tarefas', JSON.stringify({...tarefas, tarefasAFazer: newTarefas}));
  };

  const removeTask = () => {
    const newTarefas = [...tarefas[type]]
    newTarefas.splice(index, 1)
    setTarefas({...tarefas, [type]: newTarefas})
    setOpen(false);
    localStorage.setItem('tarefas', JSON.stringify({...tarefas, [type]: newTarefas}));
  }


  if (!open) return null


  return (
    <div className={styles.modalOverlay}>
    <div className={styles.modalContent}>
      <div className={styles.modalHeader}>{index !== null ? 'Deletar Tarefa' : 'Nova Tarefa'} </div>
      <div className={styles.modalBody}>
        <label>{index !== null ? 'Tem certeza que você deseja deletar essa tarefa?' : 'Titulo'}</label>
        {
          index === null ? (
            <input
              type="text"
              ref={tarefa}
              placeholder="Digite"
            />
          ) : null
        }
      </div>
      <div className={styles.modalFooter}>
        <button onClick={() => index !== null ? removeTask() : saveTask()}
        className={index !== null ? styles.danger : styles.primary}>
          {index !== null ? 'Deletar' : 'Adicionar'}
          </button>
        <button onClick={() => setOpen(false)} className={styles.secondary} >Cancelar</button>
      </div>
    </div>
  </div>
  )
}
