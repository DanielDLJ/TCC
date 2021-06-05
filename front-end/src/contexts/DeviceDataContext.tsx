import { createContext, ReactNode, useEffect, useState } from "react";
import axios from '../services/api';

interface equipmentDataType {
    id: number;
    deviceEUI: string;
    ph: number;
    turbidity: number;
    date: string | Date;
}

interface DeviceDataContextData {
    equipmentData: equipmentDataType[];
}

interface DeviceDataProviderProps {
  children: ReactNode;
}

export const DeviceDataContext = createContext({} as DeviceDataContextData);


export function DeviceDataProvider({ children }: DeviceDataProviderProps) {

    const [equipmentData, setEquipmentData] = useState([]);

    async function getEquipmentDatay() {
        try {
            const result = await axios.get("/equipmentData");
            if (result.data.length > 0) {
                setEquipmentData(result.data);
            }
        } catch (error) {
            console.log("TableEquipmentData error",error)
        }
    }

    useEffect(() => {
        getEquipmentDatay();
    }, [])

    return (
        <DeviceDataContext.Provider value={{
            equipmentData,
        }}>
            {children}
        </DeviceDataContext.Provider>
    )
}