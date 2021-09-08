import Head from 'next/head';
import { TableEquipmentData } from '../components/TableEquipmentData'
import styles from '../styles/pages/Home.module.css'
import { LineChartpH } from '../components/LineChartpH'
import { LineChartTurbidity } from '../components/LineChartTurbidity'

interface EquipmentProps {
}

export default function Equipment(props: EquipmentProps) {
  return (
      <div className={styles.container}>
        <Head>
          <title>Inicio | TCC</title>
          <meta name="title" content="TCC" />
          <meta name="description" content="TCC" />
        </Head>
            <TableEquipmentData />
            <div className={styles.containerChart}>
              <LineChartTurbidity width={400} height={300} />
              <LineChartpH width={400} height={300} />
            </div>
      </div>
  )
}