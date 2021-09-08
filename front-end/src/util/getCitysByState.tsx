import dataAC from "../data/municipios/AC.json"
import dataAL from "../data/municipios/AL.json"
import dataAM from "../data/municipios/AM.json"
import dataAP from "../data/municipios/AP.json"
import dataBA from "../data/municipios/BA.json"
import dataCE from "../data/municipios/CE.json"
import dataDF from "../data/municipios/DF.json"
import dataES from "../data/municipios/ES.json"
import dataGO from "../data/municipios/GO.json"
import dataMA from "../data/municipios/MA.json"
import dataMG from "../data/municipios/MG.json"
import dataMS from "../data/municipios/MS.json"
import dataMT from "../data/municipios/MT.json"
import dataPA from "../data/municipios/PA.json"
import dataPB from "../data/municipios/PB.json"
import dataPE from "../data/municipios/PE.json"
import dataPI from "../data/municipios/PI.json"
import dataPR from "../data/municipios/PR.json"
import dataRJ from "../data/municipios/RJ.json"
import dataRN from "../data/municipios/RN.json"
import dataRO from "../data/municipios/RO.json"
import dataRR from "../data/municipios/RR.json"
import dataRS from "../data/municipios/RS.json"
import dataSC from "../data/municipios/SC.json"
import dataSE from "../data/municipios/SE.json"
import dataSP from "../data/municipios/SP.json"
import dataTO from "../data/municipios/TO.json"
import dataALL from "../data/municipios/ALL-BR.json"


interface Props {
    sigla: string
}

export default function getCitysByState({sigla}: Props) {
    switch (sigla) {
        case 'AC': return dataAC;
        case 'AL': return dataAL;
        case 'AM': return dataAM;
        case 'AP': return dataAP;
        case 'BA': return dataBA;
        case 'CE': return dataCE;
        case 'DF': return dataDF;
        case 'ES': return dataES;
        case 'GO': return dataGO;
        case 'MA': return dataMA;
        case 'MG': return dataMG;
        case 'MS': return dataMS;
        case 'MT': return dataMT;
        case 'PA': return dataPA;
        case 'PB': return dataPB;
        case 'PE': return dataPE;
        case 'PI': return dataPI;
        case 'PR': return dataPR;
        case 'RJ': return dataRJ;
        case 'RN': return dataRN;
        case 'RO': return dataRO;
        case 'RR': return dataRR;
        case 'RS': return dataRS;
        case 'SC': return dataSC;
        case 'SE': return dataSE;
        case 'SP': return dataSP;
        case 'TO': return dataTO;
        default: return dataALL;
    }
}