import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Map from '../components/Map';
import styles from '../styles/pages/Dashboard.module.css';
import dataEstados from "../data/estados/estados.json"
import getCitysByState from "../util/getCitysByState"
import api from "../services/api"

const BRAZIL_CENTER = [-10.1868191,-48.3336937]


export interface Properties {
  id: string;
  name: string;
  description: string;
  amenity?: string;
  popupContent?: string;
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

const typeOfSearchArray = [{
  type: "water",
  name:"Água",
},{
  type: "ph",
  name:"pH",
}]


export default function Home() {
  let mapRef = React.useRef();
  const[typeOfSearch, setTypeOfSearch] = useState<string>("Água")
  const[selectState, setSelectState] = useState<string>(undefined)
  const[stateData, setStateData] = useState<State[]>([])
  const[citySelect, setCitySelect] = useState<string>(undefined)
  const[cityData, setCityData] = useState<any[]>()
  const[dataRender, setDataRender] = useState<any>([])
  const[center, setCenter] = useState(BRAZIL_CENTER)

  function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    // if (feature.properties && feature.properties.popupContent) {
    //     layer.bindPopup(feature.properties.popupContent);
    // }
    layer.on('mouseover', function (e) {
      layer.bindPopup(feature.properties.name).openPopup();
    });
    layer.on('mouseout', function (e) {
      layer.bindPopup(feature.properties.name).closePopup();
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
      setSelectState("")
      setStateData([first,...response.data])
      setCitySelect("-1")
    } catch (error) {
      
    }
  }
  const getCitys = async () =>{
    const idState = stateData.filter(fitem => fitem.sigla === selectState)[0].id
    try {
      const response = await api.get(`/state/${idState}/citys`)
      let first = {
        id: -1,
        name: "Todas"
      }
      console.log("old cid id", citySelect)
      console.log("city",response.data)
      setCitySelect("-1")
      setCityData([first,...response.data])
    } catch (error) {
      
    }
  }

  const render_selectStateed_CityEmpty = () =>{
    let aux = getCitysByState({sigla: selectState})
    const features: Feature[] =
    (aux as MapJson).features.map((item, index)=>{
      // console.log(item)
      item.style = {
        color: index%2 === 0 ? "#ff0000": "#00ff33" 
      }
      return item
    })
    setDataRender(features)
  }

  useEffect(()=>{
    getStates()
  },[])

  useEffect(()=>{
    if(cityData && cityData.length > 0) render_selectStateed_CityEmpty()
  },[cityData])

  useEffect(()=>{
    if(selectState !== undefined){
      if(selectState === ""){
        console.log("Todos os Estados")
        let aux: any = dataEstados
        const features: Feature[] =
        (aux as MapJson).features.map((item, index)=>{
          item.style = {
            color: index%2 === 0 ? "#ff0000": "#00ff33" 
          }
          return item
        })
        setCenter(()=>{return BRAZIL_CENTER})
        setDataRender(features)
        //clear city
        setCitySelect("-1")
        setCityData([])
      }else{
        console.log("Get Data das cidades")
        const state = stateData.filter(fitem => fitem.sigla === selectState)[0]
        setCenter([state.center_lat, state.center_lng])
        getCitys()
      }
    }
  },[selectState])

  useEffect(()=>{
    if(citySelect !== undefined){
      if(citySelect === "-1" && selectState !== ""){
        render_selectStateed_CityEmpty()
      }else if(citySelect !== "-1"){
        let aux = getCitysByState({sigla: selectState})
        aux = aux.features
        .filter(fitem => fitem.properties.id === citySelect)

        let atualCity = cityData.filter(fitem=>fitem.id === parseInt(citySelect))[0]
        aux[0].centroide = {latitude: atualCity.center_lat, longitude: atualCity.center_lng}

        console.log("citySelect",aux)
        setDataRender(aux)
      }
    }
  },[citySelect])

  useEffect(()=>{
    if(mapRef){
      // @ts-ignore
      mapRef.current.retry()
    }
  },[dataRender])


  return (
    <>
      <Head>
        <title>Dashboard | TCC</title>
        <meta name="title" content="TCC" />
        <meta name="description" content="TCC" />
      </Head>

      <h1 className={styles.title}> {typeOfSearch} </h1>
      <main className={styles.main}>
        <div className={styles.containerMap}>
          <Map 
            className={styles.homeMap} 
            center={center} 
            zoom={center === BRAZIL_CENTER ? 4 : 6} 
            ref={mapRef} 
          >
            {({ TileLayer, Marker, Popup, GeoJSON, CircleMarker }) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {dataRender && dataRender.map(item=>
                  <GeoJSON
                    attribution="Capa de Hospitales de ESRI"
                    data={item}
                    onEachFeature={onEachFeature}
                    style={item.style}
                  />
                )}

                {dataRender && dataRender.map(item=>{
                  return item.centroide ? 
                    <CircleMarker center={[item.centroide.latitude, item.centroide.longitude]} pathOptions={{ color: 'red' }} radius={2}>
                      <Popup>Popup in CircleMarker</Popup>
                    </CircleMarker>
                    :
                    null
                })}
              </>
            )}
          </Map>
        </div>
        <div className={styles.containerActions}>
        
          <select 
            id={"TypeOfSearch"}
            onChange={(event)=>{setTypeOfSearch(event.target.value)}}>
            {typeOfSearchArray.map(item=>{
              return (<option id={item.type} value={item.name}>{item.name}</option>)
            })}
          </select>
          {stateData && stateData.length > 0 &&
            <select 
              id={"states"}
              onChange={(event)=>{setSelectState(event.target.value)}}>
              {stateData.map(item=>{
                return (<option id={item.sigla+item.id} value={item.sigla}>{item.name}</option>)
              })}
            </select>
          }
          {cityData && cityData.length > 0 &&
            <select
              id={"citys"}
              value={citySelect ? citySelect : "-1"}
              onChange={(event)=>{setCitySelect(event.target.value)}}>
              {cityData.map(item=>{
                return (<option id={item.name+item.id} value={item.id}>{item.name}</option>)
              })}
            </select>
          }
        </div>

      </main>
    </>
  )
}
