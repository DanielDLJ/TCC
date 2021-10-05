var DataAC = require("../data/municipios/AC.json");
var DataAL = require("../data/municipios/AL.json");
var DataAM = require("../data/municipios/AM.json");
var DataAP = require("../data/municipios/AP.json");
var DataBA = require("../data/municipios/BA.json");
var DataCE = require("../data/municipios/CE.json");
var DataDF = require("../data/municipios/DF.json");
var DataES = require("../data/municipios/ES.json");
var DataGO = require("../data/municipios/GO.json");
var DataMA = require("../data/municipios/MA.json");
var DataMG = require("../data/municipios/MG.json");
var DataMS = require("../data/municipios/MS.json");
var DataMT = require("../data/municipios/MT.json");
var DataPA = require("../data/municipios/PA.json");
var DataPB = require("../data/municipios/PB.json");
var DataPE = require("../data/municipios/PE.json");
var DataPI = require("../data/municipios/PI.json");
var DataPR = require("../data/municipios/PR.json");
var DataRJ = require("../data/municipios/RJ.json");
var DataRN = require("../data/municipios/RN.json");
var DataRO = require("../data/municipios/RO.json");
var DataRR = require("../data/municipios/RR.json");
var DataRS = require("../data/municipios/RS.json");
var DataSC = require("../data/municipios/SC.json");
var DataSE = require("../data/municipios/SE.json");
var DataSP = require("../data/municipios/SP.json");
var DataTO = require("../data/municipios/TO.json");
var DataALL = require("../data/municipios/ALL-BR.json");

module.exports = function( sigla ) {
// exports.getCitysByState = function( sigla ) { 
// export default function getCitysByState(sigla) {
    switch (sigla) {
        case 'AC': return DataAC;
        case 'AL': return DataAL;
        case 'AM': return DataAM;
        case 'AP': return DataAP;
        case 'BA': return DataBA;
        case 'CE': return DataCE;
        case 'DF': return DataDF;
        case 'ES': return DataES;
        case 'GO': return DataGO;
        case 'MA': return DataMA;
        case 'MG': return DataMG;
        case 'MS': return DataMS;
        case 'MT': return DataMT;
        case 'PA': return DataPA;
        case 'PB': return DataPB;
        case 'PE': return DataPE;
        case 'PI': return DataPI;
        case 'PR': return DataPR;
        case 'RJ': return DataRJ;
        case 'RN': return DataRN;
        case 'RO': return DataRO;
        case 'RR': return DataRR;
        case 'RS': return DataRS;
        case 'SC': return DataSC;
        case 'SE': return DataSE;
        case 'SP': return DataSP;
        case 'TO': return DataTO;
        default: return DataALL;
    }
}