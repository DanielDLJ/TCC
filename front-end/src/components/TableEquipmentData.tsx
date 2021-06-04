import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from '../services/api';
import styles from "../styles/components/TableEquipmentData.module.css";

interface equipmentDataType {
    deviceEUI: string;
    ph: Number;
    turbidity: Number;
    date: string;
}

export function TableEquipmentData() {
  const [data, setData] = useState<equipmentDataType[] | null>(null);
  async function getEquipmentDatay() {
        try {
            const result = await axios.get("/equipmentData");
            if (result.data.length > 0) {
                setData(result.data);
            }
        } catch (error) {
            console.log("TableEquipmentData error",error)
        }
  }
  useEffect(() => {
    getEquipmentDatay();
  }, []);

  return (
    <div className={styles.container}>
       <Table className={styles.TableEquipmentData} responsive="sm">
        <thead>
          <tr>
            <th>deviceEUI</th>
            <th>ph</th>
            <th>turbidity</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>
            {data && data.map((item, index)=>{
                return(
                    <tr>
                        <td>{item.deviceEUI}</td>
                        <td>{item.ph}</td>
                        <td>{item.turbidity}</td>
                        <td>{item.date}</td>
                    </tr>
                )
            })}
        </tbody>
      </Table>
    </div>
  );
}