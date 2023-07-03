import React from "react";
import { useState } from "react";
import style from "./Combination.module.css";

const Combination = ()=>{

    const [equipos, setEquipos] = useState([
        { equipo: '', rival: '' },
      
      ]);
    const [combinaciones, setCombinaciones] = useState([]);
  
    // Manejar el cambio en los inputs de equipos y rivales
    const handleChange = (index, field, value) => {
      const nuevosEquipos = [...equipos];
      nuevosEquipos[index][field] = value;
      setEquipos(nuevosEquipos);
    };
  
    // Agregar un nuevo equipo y su rival
    const agregarEquipo = () => {
      setEquipos([...equipos, { equipo: '', rival: '' }]);
    };
  
   // Generar combinaciones basadas en los equipos y rivales ingresados
const generarCombinaciones = () => {
    const combinations = [];
   
  
    const equiposValidos = equipos.every(
      (equipo) => equipo.equipo.trim() !== '' && equipo.rival.trim() !== ''
    );
  
    if (!equiposValidos) {
      console.log('Ingrese todos los equipos y rivales');
      return;
    }
  
    // Generar todas las combinaciones posibles de manera recursiva
    const generarRecursivo = (index, combinacionActual) => {
      if (index === numEquipos) {
        combinations.push(combinacionActual);
        return;
      }
  
      for (let i = 0; i < 3; i++) {
        const equipo = equipos[index].equipo;
        const rival = equipos[index].rival;
        const resultados = [`${equipo} gana`, `${rival} gana`, 'Empate'];
        const resultado = resultados[i];
        const nuevaCombinacion = `${combinacionActual} ***${equipo} vs ${rival}: ${resultado}, `;
        generarRecursivo(index + 1, nuevaCombinacion);
      }
    };
  
    const numEquipos = equipos.length;
    generarRecursivo(0, '');
  
    setCombinaciones(combinations);
  };
  
  
    return (
      <div>
        <h2>Ingresar equipos y rivales:</h2>
        {equipos.map((equipo, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Equipo"
              value={equipo.equipo}
              onChange={(event) => handleChange(index, 'equipo', event.target.value)}
            />
            <input
              type="text"
              placeholder="Rival"
              value={equipo.rival}
              onChange={(event) => handleChange(index, 'rival', event.target.value)}
            />
          </div>
        ))}
        <button onClick={agregarEquipo}>Agregar Equipo</button>
        <button onClick={generarCombinaciones}>Generar Combinaciones</button>
        {/* <ul>
          {combinaciones.map((combinacion, index) => (
            <li key={index}>{`Combinación ${index + 1}: ${combinacion}`}</li>
          ))}
        </ul> */}

<table className={style.talbla}>
  <thead>
    <tr>
      <th>Combinación</th>
      <th>Resultado</th>
    </tr>
  </thead>
  <tbody>
    {combinaciones.map((combinacion, index) => (
      <tr key={index}>
        <td>{`Combinación ${index + 1}`}</td>
        <td>{combinacion}</td>
      </tr>
    ))}
  </tbody>
</table>
      </div>
    );
};


export default Combination;


