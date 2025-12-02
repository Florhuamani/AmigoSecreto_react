import React, { useState } from 'react';
import './App.css';

function App() {
  // === ESTADOS ===
  const [participantes, setParticipantes] = useState([]);  // Lista de nombres
  const [nombre, setNombre] = useState('');               // Input actual
  const [fechaLimite, setFechaLimite] = useState('');     // Fecha del sorteo
  const [resultado, setResultado] = useState([]);         // Resultado del sorteo
  const [mostrarResultado, setMostrarResultado] = useState(false);

  // === FUNCIÓN: Agregar participante ===
  const agregarParticipante = (e) => {
    e.preventDefault();                     // Evita recargar la página
    if (nombre.trim() === '') return;       // No permite nombres vacíos
    if (participantes.includes(nombre.trim())) {
      alert('Esa persona ya está en la lista');
      return;
    }
    setParticipantes([...participantes, nombre.trim()]);
    setNombre('');                          // Limpia el input
  };

  // === FUNCIÓN: Sortear amigo secreto (sin repetición) ===
  const sortear = () => {
    if (participantes.length < 3) {
      alert('Necesitas al menos 3 participantes para sortear');
      return;
    }

    let disponibles = [...participantes];   // Copia del array
    const sorteo = participantes.map(persona => {
      // Filtra para que no se toque a sí mismo
      let posibles = disponibles.filter(p => p !== persona);
      if (posibles.length === 0) posibles = disponibles; // fallback raro

      const indice = Math.floor(Math.random() * posibles.length);
      const regalara = posibles[indice];
      disponibles = disponibles.filter(p => p !== regalara); // quita del pool
      return { da: persona, recibe: regalara };
    });

    setResultado(sorteo);
    setMostrarResultado(true);
  };

  // === FUNCIÓN: Reiniciar todo ===
  const reiniciar = () => {
    setParticipantes([]);
    setNombre('');
    setFechaLimite('');
    setResultado([]);
    setMostrarResultado(false);
  };

  return (
    <div className="amigo-secreto">
      <header className="header">
        <h1>Amigo Secreto 2025</h1>
        <p className="subtitle">¡Organiza tu intercambio navideño perfecto!</p>
      </header>

      <div className="container">
        {/* Formulario para agregar nombres */}
        <div className="panel">
          <h2>Agregar Participantes</h2>
          <form onSubmit={agregarParticipante}>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Escribe un nombre"
              className="input-nombre"
            />
            <button type="submit" className="btn-agregar">+ Agregar</button>
          </form>

          {/* Fecha límite */}
          <div className="fecha">
            <label>Fecha límite del regalo:</label>
            <input
              type="date"
              value={fechaLimite}
              onChange={(e) => setFechaLimite(e.target.value)}
            />
            {fechaLimite && <p className="fecha-texto">¡Tienen hasta el {new Date(fechaLimite).toLocaleDateString('es-ES')}!</p>}
          </div>

          {/* Lista de participantes */}
          <h3>Participantes ({participantes.length})</h3>
          <ul className="lista">
            {participantes.map((p, i) => (
              <li key={i}>✨ {p}</li>
            ))}
          </ul>

          {/* Botones principales */}
          <div className="botones">
            <button onClick={sortear} className="btn-sortear" disabled={participantes.length < 3}>
              Sortear Amigo Secreto
            </button>
            <button onClick={reiniciar} className="btn-reiniciar">
              Reiniciar todo
            </button>
          </div>
        </div>

        {/* Resultado del sorteo */}
        {mostrarResultado && (
          <div className="resultado">
            <h2>¡Resultados del sorteo!</h2>
            {resultado.map((r, i) => (
              <div key={i} className="pareja">
                <strong>{r.da}</strong> → le regala a → <strong>{r.recibe}</strong>
              </div>
            ))}
            <button onClick={() => setMostrarResultado(false)} className="btn-cerrar">
              Cerrar resultados
            </button>
          </div>
        )}
      </div>

      <footer>
        Avance, el jueves se entrega completo
      </footer>
    </div>
  );
}

export default App;