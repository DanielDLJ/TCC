import React, { useEffect, useState, useContext } from 'react';
import Head from 'next/head';
import Map from '../components/Map';
import styles from '../styles/pages/Dashboard.module.css';
import api from "../services/api"
import L from "leaflet";
import ColorIndicator from '../components/ColorIndicator'
import { DeviceDataContext } from '../contexts/DeviceDataContext'
const BRAZIL_CENTER = [-10.1868191,-48.3336937]


export interface Metric {
  value:number;
  color:string;
}
export interface Properties {
  id: string;
  name: string;
  deviceEUI?: string;
  description: string;
  amenity?: string;
  popupContent?: string;
  center_lat?: string;
  center_lng?: string;
  water?: Metric;
  ph?: Metric;
}

export interface Geometry {
  type: string;
  coordinates: number[][][];
}

export interface Style {
  color: string;
}

export interface Feature {
  type: string;
  properties: Properties;
  geometry: Geometry;
  style?: Style
}

export interface MapJson {
  type: string;
  features: Feature[];
}

export interface State {
  id: number;
  name: string;
  sigla: string;
  center_lat: number;
  center_lng: number;
}

export interface City {
  id: number;
  name: string;
  center_lat: number;
  center_lng: number;
}

const typeOfSearchArray = [{
  value: "water",
  name:"Água",
},{
  value: "ph",
  name:"pH",
}]


export default function Home() {
  const { openADeviceEUI } = useContext(DeviceDataContext)
  let mapRef = React.useRef();
  const[typeOfSearch, setTypeOfSearch] = useState<'water' | 'pH'>("water")
  const[center, setCenter] = useState(BRAZIL_CENTER)

  //1 Level all Brazil
  const[mapBrazilData, setMapBrazilData] = useState<MapJson>(undefined)
  

  const[selectState, setSelectState] = useState<string>(undefined)
  //Array with all states of Brazil
  const[stateData, setStateData] = useState<State[]>([])
  //2 Level only 1 state
  const[mapStateData, setMapStateData] = useState<MapJson>(undefined)


  const[citySelect, setCitySelect] = useState<string>(undefined)
  //Array with all cities in the selected state 
  const[cityData, setCityData] = useState<City[]>()
  //3 Level only 1 city
  const[mapCityData, setMapCityData] = useState<MapJson>(undefined)

  //What to render (1 Level| 2 Level | 3 Level)
  const[dataRender, setDataRender] = useState<any>([])
  

  function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    // if (feature.properties && feature.properties.popupContent) {
    //     layer.bindPopup(feature.properties.popupContent);
    // }
    const value = typeOfSearch === 'water' ?  feature.properties.water.value.toFixed(3) : feature.properties.ph.value.toFixed(3)
    const type = typeOfSearchArray.filter(fitem => fitem.value == typeOfSearch)[0].name
    layer.on('mouseover', function (e) {
      layer.bindPopup(`${feature.properties.name} - ${type}: ${value}`).openPopup();
    });
    layer.on('mouseout', function (e) {
      layer.bindPopup(`${feature.properties.name} - ${type}: ${value}`).closePopup();
    });
  }

  const getStates = async () =>{
    try {
      const response = await api.get("/state")
      let first = {
        id: -1,
        sigla: "",
        name: "Todos"
      }
      const onlyStates = response.data.features.map(item=>{
        return {
          id: item.properties.id,
          name: item.properties.name,
          sigla: item.properties.sigla,
          center_lat: item.properties.center_lat,
          center_lng: item.properties.center_lng,
        }
      })

      setSelectState("")
      setStateData([first,...onlyStates])
      setCitySelect("-1")
      const dataTeste = response.data.features.map(item=>{
        return {
          id: item.properties.id,
          name: item.properties.name,
          sigla: item.properties.sigla,
          turbidity: item.properties.water,
          ph: item.properties.ph,
        }
      })
      console.log(dataTeste)
      setMapBrazilData(response.data)
    } catch (error) {
      
    }
  }
  const getCities = async () =>{
    const idState = stateData.filter(fitem => fitem.sigla === selectState)[0].id
    try {
      const response = await api.get(`/state/${idState}/citys`)
      let first = {
        id: -1,
        name: "Todas"
      }

      const onlyCities = response.data.features.map(item=>{
        return {
          id: item.properties.id,
          name: item.properties.name,
          center_lat: item.properties.center_lat,
          center_lng: item.properties.center_lng,
        }
      })
      setCitySelect("-1")
      setCityData([first,...onlyCities])
      setMapStateData(response.data)
      // setDataRender(response.data.features)
      setDataRender(response.data)
    } catch (error) {
      
    }
  }

  const getCity = async () =>{
    const idState = stateData.filter(fitem => fitem.sigla === selectState)[0].id
    try {
      const response = await api.get(`/city/${citySelect}`)
      console.log(response.data)
      setMapCityData(response.data)
      // setDataRender(response.data.features)
      setDataRender(response.data)
    } catch (error) {
      
    }
  }



  const render_selectStateed_CityEmpty = () =>{
    if(mapStateData === undefined) return
    // setDataRender(mapStateData.features)
    setDataRender(mapStateData)
    setMapCityData(undefined)
  }

  useEffect(()=>{
    console.log("mapBrazilData",mapBrazilData)
  },[mapBrazilData])

  useEffect(()=>{
    console.log("mapStateData",mapStateData)
  },[mapStateData])
  useEffect(()=>{
    console.log("mapCityData",mapCityData)
  },[mapCityData])

  useEffect(()=>{
    console.log(typeOfSearch)
  },[typeOfSearch])

  useEffect(()=>{
    getStates()
  },[])

  useEffect(()=>{
    if(cityData && cityData.length > 0) render_selectStateed_CityEmpty()
  },[cityData])

  useEffect(()=>{
    if(mapBrazilData === undefined) return
    if(selectState !== undefined){
      if(selectState === ""){
        setCenter(()=>{return BRAZIL_CENTER})
        // setDataRender(mapBrazilData.features)
        setDataRender(mapBrazilData)
        //clear city
        setCitySelect("-1")
        setCityData([])
        setMapCityData(undefined)
      }else{
        console.log("Get Data das cidades")
        const state = stateData.filter(fitem => fitem.sigla === selectState)[0]
        setCenter([state.center_lat, state.center_lng])
        getCities()
      }
    }
  },[selectState, mapBrazilData])

  useEffect(()=>{
    if(citySelect !== undefined){
      if(citySelect === "-1" && selectState !== ""){
        render_selectStateed_CityEmpty()
      }else if(citySelect !== "-1"){
        getCity()
      }
    }
  },[citySelect])

  useEffect(()=>{
    console.log("dataRender",dataRender)
    if(mapRef){
      // @ts-ignore
      mapRef.current.retry()
    }
  },[dataRender, typeOfSearch])


  useEffect(()=>{
  },[dataRender,mapCityData])



  return (
    <>
      <Head>
        <title>Dashboard | TCC</title>
        <meta name="title" content="TCC" />
        <meta name="description" content="TCC" />
      </Head>
      <h1 className={styles.title}> {typeOfSearch && typeOfSearchArray.filter(fitem => fitem.value == typeOfSearch)[0].name} </h1>
      <div className={styles.IndicatorContainer}>
          {/* <span className={styles.IndicatorContainerSpan}> Indicador</span> */}
          <ColorIndicator type={typeOfSearch}/>
      </div>

      <main className={styles.main}>
        <div className={styles.containerMap}>
          {/* <ColorIndicator type={typeOfSearch}/> */}
          <Map 
            className={styles.homeMap} 
            center={center} 
            zoom={center === BRAZIL_CENTER ? 4 : 6} 
            ref={mapRef} 
            key={"map"}
          >
            {({ TileLayer, Marker, Popup, GeoJSON, CircleMarker, Circle, Tooltip }) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                  key={"TileLayer"}
                />
                {typeOfSearch && dataRender !== undefined && dataRender.features?.map((item,index)=>{
                  return <GeoJSON
                    attribution="Capa de Hospitales de ESRI"
                    data={item}
                    onEachFeature={onEachFeature}
                    key={"my-geojson-"+index}
                    style={typeOfSearch === 'water' ? item.properties.water : item.properties.ph}
                  />
                })}
                {mapCityData && dataRender && dataRender.type === "PointCollection" && dataRender.features?.map((item,index)=>{
                  console.log("item",item)
                  return(
                    <Circle  
                      key={"CircleMarker-"+index}
                      center={{lat: parseFloat(item.geometry.coordinates[0]), lng: parseFloat(item.geometry.coordinates[1])}} 
                      fillColor={typeOfSearch === 'water' ? item.properties.water.color : item.properties.ph.color}
                      style={typeOfSearch === 'water' ? item.properties.water : item.properties.ph}
                      onEachFeature={onEachFeature}
                      weight={0}
                      radius={5000}
                      eventHandlers={{ click: ()=>{
                        console.log("deviceEUI", item.properties.deviceEUI) 
                        openADeviceEUI(item.properties.deviceEUI)
                      }}}
                      // onClick={()=>{console.log("deviceEUI", item.properties.deviceEUI)}}
                    >
                      <Tooltip direction="bottom" offset={[0, 20]} opacity={1} >
                        {typeOfSearch === 'water' ? `Turbidez: ${item.properties.water.value}` : `pH: ${item.properties.water.value}`}
                      </Tooltip>
                    </Circle>
                  )
                })}
              </>
            )}
          </Map>
        </div>
        <div className={styles.containerActions}>
          <select 
            id={"TypeOfSearch"}
            //@ts-ignore
            onChange={(event)=>{setTypeOfSearch(event.target.value)}}>
            {typeOfSearchArray.map(item=>{
              return (<option id={item.value} value={item.value} key={item.value+"-typeOfSearchArray"}>{item.name}</option>)
            })}
          </select>
          {stateData && stateData.length > 0 &&
            <select 
              id={"states"}
              onChange={(event)=>{setSelectState(event.target.value)}}>
              {stateData.map(item=>{
                return (<option id={item.sigla+item.id} value={item.sigla} key={item.sigla+"-states"}>{item.name}</option>)
              })}
            </select>
          }
          {cityData && cityData.length > 0 &&
            <select
              id={"Cities"}
              value={citySelect ? citySelect : "-1"}
              onChange={(event)=>{setCitySelect(event.target.value)}}>
              {cityData.map(item=>{
                return (<option id={item.name+item.id} value={item.id} key={item.id+"-Cities"}>{item.name}</option>)
              })}
            </select>
          }
        </div>
      </main>
      
    </>
  )
}
