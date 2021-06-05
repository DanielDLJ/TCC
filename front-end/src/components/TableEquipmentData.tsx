import React, { useEffect, useContext } from "react";
import Table from "react-bootstrap/Table";
import { DeviceDataContext } from '../contexts/deviceDataContext';
import styles from "../styles/components/TableEquipmentData.module.css";


export function TableEquipmentData() {
  const { equipmentData } = useContext(DeviceDataContext);

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
            {equipmentData && equipmentData.map((item, index)=>{
                return(
                    <tr key={index}>
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