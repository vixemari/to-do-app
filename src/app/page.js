"use client";
import { useState } from "react";
import Image from "next/image";
import FocalPoint from "./public/FocalPoint.png"
import Modal from "@/components/Modal";
import styles from './Home.module.scss'
import { Trash } from "react-feather";

export default function Home() {
  const [tarefas, setTarefas] = useState({
    tarefasAFazer: [],
    tarefasFeitas: [],
  })
  const [openModal, setOpenModal] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const [modalType, setModalType] = useState(null);

  const DateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const taskDone = (index) => {
    const newTarefas = [...tarefas.tarefasAFazer]
    newTarefas.splice(index, 1)
    setTarefas({...tarefas, tarefasAFazer: newTarefas, tarefasFeitas: [...tarefas.tarefasFeitas, tarefas.tarefasAFazer[index]]})
  }

  const handleModal = (index, type) => {
    setModalType(type);
    setCurrentTaskIndex(index);
    setOpenModal(true);
  }


  return (
    <>
      {
        openModal && <Modal
        props={{
          open: openModal,
          setOpen: setOpenModal,
          tarefas: tarefas,
          setTarefas: setTarefas,
          type: modalType,
          index: currentTaskIndex
        }} />
      }
      <header>
      <Image
        src={FocalPoint}
        alt="logoFocalPoint"
        width={180}
        height={50}
      />
        <h2 className={styles.headerText}>Bem vindo de volta, Marcus!</h2>
        <div>
          {new Date().toLocaleDateString("pt-BR", DateOptions)}
        </div>
      </header>
      <section className={styles.container}>
        <p>Suas tarefas de hoje</p>
          {
            tarefas.tarefasAFazer.length > 0 ? ( tarefas.tarefasAFazer.map((tarefa, index) => (
              <div className={styles.row} key={index}>
                <div>
                  <input
                  type="checkbox"
                  onClick={() => taskDone(index)}
                  />
                  <label>{tarefa}</label>
                </div>
                <div>
                <Trash size={20} color="#b0bbd1"  onClick={() => handleModal(index, "tarefasAFazer")} />
                </div>
              </div>
            ))
            ) : (
              <p className={styles.empty}>Você ja concluiu todas tarefas!</p>
            )
          }
        {
           tarefas.tarefasFeitas.length > 0 && <p >Tarefas finalizadas</p>
        }
        {
         tarefas.tarefasFeitas.map((tarefa, index) => (
            <div className={styles.row} key={index}>
              <div>
                <input type="checkbox" checked />
                <label className={styles.completed}>{tarefa}</label>
              </div>
              <div>
              <Trash size={20} color="#b0bbd1"  onClick={() => handleModal(index, 'tarefasFeitas')} />
            </div>
            </div>
          ))
        }
      </section>
      <footer className={styles.footer}>
        <button onClick={() => handleModal(null, 'tarefasAFazer')} className={styles.buttonPrimary}>Nova Tarefa</button>
      </footer>
    </>

  );
}
