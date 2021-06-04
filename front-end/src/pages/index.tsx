import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { TableEquipmentData } from '../components/TableEquipmentData'
import styles from '../styles/pages/Home.module.css'
import { useEffect } from 'react';
import api from '../services/api'

interface HomeProps {
}

export default function Home(props: HomeProps) {


  return (
      <div className={styles.container}>
        <Head>
          <title>Inicio | TCC</title>
          <meta name="title" content="TCC" />
          <meta name="description" content="TCC" />
        </Head>
        <TableEquipmentData />
      </div>
  )
}