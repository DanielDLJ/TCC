import Head from 'next/head';
import { TableEquipmentData } from '../components/TableEquipmentData'
import styles from '../styles/pages/Home.module.css'
import { LineChartpH } from '../components/LineChartpH'
import { LineChartTurbidity } from '../components/LineChartTurbidity'
import { DeviceDataContext } from '../contexts/DeviceDataContext'
import { useContext } from 'react';

interface EquipmentProps {
}

export default function Equipment(props: EquipmentProps) {
  const { openADeviceEUI } = useContext(DeviceDataContext)
  return (
      <div className={styles.container}>
        <Head>
          <title>Inicio | TCC</title>
          <meta name="title" content="TCC" />
          <meta name="description" content="TCC" />
        </Head>
            <img className={styles.imageBTN} src="back.png"  onClick={()=>openADeviceEUI(undefined)}/>
            <div className={styles.containerChart}>
              <LineChartTurbidity width={400} height={300} />
              <LineChartpH width={400} height={300} />
            </div>
            <TableEquipmentData />
      </div>
  )
}