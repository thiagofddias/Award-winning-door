import styles from "../../../styles/Jogo.module.css";
import React, { useEffect, useState } from "react";
import Porta from "../../../components/Porta";
import { atualizarPortas, criarPortas } from "../../../functions/porta";
import Link from "next/link";
import { useRouter } from "next/router"; 

export default function jogo() {
  const router = useRouter()

  const [portas, setPortas] = useState([])
  const [valido, setValido] = useState(false)

  useEffect(() => {
    const portas = +router.query.portas
    const temPresente = +router.query.temPresente
    setPortas(criarPortas(portas, temPresente))
  }, [router?.query])

  useEffect(() => {
    const portas = +router.query.portas
    const temPresente = +router.query.temPresente
    
    const qtdePortasValidas = portas >= 3 && portas <= 100
    const temPresenteValido = temPresente >= 1 && temPresente <= portas

    setValido(qtdePortasValidas && temPresenteValido)
  }, [portas])

  router.query.portas
  router.query.temPresente

  function renderizarPortas() {
    return valido && portas.map(porta => {
      return <Porta key={porta.numero} value={porta} 
      onChange={novaPorta => setPortas(atualizarPortas(portas, novaPorta))}/>
    })
  }


  return (
    <div id={styles.jogo}>
        <div className={styles.portas}>
            {valido ? 
            renderizarPortas()
            : <h1>Valores inválidos</h1>
          }
        </div>
        <div className={styles.botoes}>
            <Link href="/">
                <button>Reiniciar Jogo</button>
            </Link>
        </div>
    </div>
  )
}