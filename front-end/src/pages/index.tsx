import Head from 'next/head';
import { TableEquipmentData } from '../components/TableEquipmentData'
import styles from '../styles/pages/Home.module.css'
import { LineChartpH } from '../components/LineChartpH'
import { LineChartTurbidity } from '../components/LineChartTurbidity'
import Dasboard from './Dasboard'

interface HomeProps {
}

export default function Home(props: HomeProps) {
  return (
    <Dasboard/>
  )
}