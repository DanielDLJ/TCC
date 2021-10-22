import styles from "./ColorIndicator.module.css";
//@ts-ignore
import chroma from "chroma-js";

const getIndices = (length) =>
  Array.from({ length }, (k, v) => v * (1 / length));

const getColors = (scale, length) =>
  getIndices(length)
    .map(scale)
    //@ts-ignore
    .map((x) => `rgba(${x._rgb.map((x) => parseInt(x, 10)).join(",")})`);

const indexSelector = (index: number) =>{
  if(index < 10 ) return index
  if(index < 50 ) return index % 2 == 0 ? index : ""
  if(index === 50) return 50
  if(index === 60) return 600
  if(index === 70) return 700
  if(index === 80) return 800
  if(index === 90) return 900
  if(index === 99) return 1000
}
const Scale = ({type = "turbidez"}:{type: string}) => {
  const LENGTH_PH = 14;
  const LENGTH_turbidez = 100;
  
  if (type === "turbidity") {
    const colors = getColors( chroma.scale(["green", "red"]).padding([0.3, 0]), LENGTH_turbidez );
    console.log(colors.length)
    return (
        <div className={styles.ContainerTurbidez}>
            {colors &&
                colors.map((curr, index) => {
                return (
                    <div key={`${index}-row`}>
                      <div key={`${index}-color`} style={{ backgroundColor: curr }} />
                      <span key={`${index}-text`}>{indexSelector(index)}</span>
                    </div>
                );
            })}
        </div>
    );
  } else {
    const pHUniversalIndicator = chroma.scale([
        "#cd1719", // firebrick
        "#d92521", //crimson
        "#ed6a18", //chocolate
        "#f5990d", //orange
        "#dec401", //gold
        "#bdc403", //goldenrod
        "#92c020", //yellowgreen
        "#40a535", //limegreen
        "#609bb5", //cadetblue
        "#6499d2", //cornflowerblue
        "#3869b1", //steelblue
        "#2e4c9b", //darkslateblue
        "#41348b", //darkslateblue
        "#422985", //darkslateblue
        "#61257d" //darkslateblue
    ]);
    const colors = getColors(pHUniversalIndicator, LENGTH_PH);
    return (
      <div className={styles.ContainerPh}>
        {colors &&
          colors.map((curr, index) => {
            return (
              <div className="colorDivWraper" key={`${index}-row`}>
                <div key={`${index}-color`} style={{ backgroundColor: curr }} />
                <span key={`${index}-text`}>{index + 1}</span>
              </div>
            );
          })}
      </div>
    );
  }
};

export default function App({type}:{type:string}) {
  return (
    <div className={styles.containerWrapper} >
      <Scale type={type} />
    </div>
  );
}
