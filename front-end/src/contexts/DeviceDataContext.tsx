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
    openADeviceEUI(eui: string): void;
    deviceEUI: string;
}

interface DeviceDataProviderProps {
  children: ReactNode;
}

export const DeviceDataContext = createContext({} as DeviceDataContextData);


export function DeviceDataProvider({ children }: DeviceDataProviderProps) {
    const [deviceEUI, setDeviceEUI] = useState<string>();
    const [equipmentData, setEquipmentData] = useState([]);

    async function getEquipmentDatay() {
        try {
            const result = await axios.get("/equipmentData/"+deviceEUI);
            if (result.data.length > 0) {
                setEquipmentData(result.data);
            }
        } catch (error) {
            console.log("TableEquipmentData error",error)
        }
    }

    const openADeviceEUI = (eui: string) => setDeviceEUI(eui)

    useEffect(() => {
        if(deviceEUI !== undefined) getEquipmentDatay();
    }, [deviceEUI])



    return (
        <DeviceDataContext.Provider value={{
            equipmentData,
            openADeviceEUI,
            deviceEUI
        }}>
            {children}
        </DeviceDataContext.Provider>
    )
}