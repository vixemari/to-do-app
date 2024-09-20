"use client";
import { useRef } from "react";
import Image from "next/image";
import FocalPoint from "./public/FocalPoint.png";
import styles from "./Inicio.module.scss";

export default function Inicio() {
  const inputRef = useRef(null);

  const handleStart = () => {
    const name = inputRef.current.value;
    localStorage.setItem("name", name);
    if (name) {
      window.location.href = "/home";
    } else {
      alert("Por favor, digite seu nome");
    }
  };

  return (
    <>
      <header>
        <Image
          src={FocalPoint}
          alt="logoFocalPoint"
          width={180}
          height={50}
          className={styles.image}
        />
      </header>
      <section className={styles.container}>
        <h1 className={styles.title}>Bem vindo ao FocalPoint</h1>
        <h3 className={styles.subTitle}>
          Aqui você pode fazer uma lista de tarefas
        </h3>
        <label className={styles.label}>Digite seu nome para começar</label>
        <input type="text" placeholder="digite aqui..." ref={inputRef} />
        <button onClick={handleStart} className={styles.button}>
          Iniciar
        </button>
      </section>
    </>
  );
}
