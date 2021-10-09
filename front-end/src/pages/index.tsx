import Head from 'next/head';
import { TableEquipmentData } from '../components/TableEquipmentData'
import styles from '../styles/pages/Home.module.css'
import { LineChartpH } from '../components/LineChartpH'
import { LineChartTurbidity } from '../components/LineChartTurbidity'
import Equipment  from './Equipment'
import Dasboard from './Dasboard'
import { DeviceDataContext } from '../contexts/DeviceDataContext'
import { useContext } from 'react';
interface HomeProps {
}

export default function Home(props: HomeProps) {
  const { deviceEUI } = useContext(DeviceDataContext)


  if(deviceEUI === undefined) return <Dasboard/>
  else return <Equipment/> 

}