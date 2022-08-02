import {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';


const URL = 'https://api.citybik.es/v2/networks/bicing';

function Bicis() {

    const [lista, setLista]= useState([]);
    const [ filtro, setFilter]= useState(10)


    const handleChange = (e)=>{
        setFilter(e.target.value)
    }

    useEffect(() => {
        fetch(URL)
            .then(x => x.json())
            .then(z => setLista(z.network.stations))
            .catch(e => console.log(e))
    }, [])

    let listaFinal = lista
        .filter(est=>est.free_bikes>=filtro)
        .map(estacion=>
        <tr key={estacion.id}>
            <td>{estacion.name}</td>
            <td>{estacion.free_bikes}</td>
            <td>{estacion.empty_slots}</td>
            <td>{estacion.latitude}</td>
            <td>{estacion.longitude}</td>
            <td>{estacion.extra.ebikes}</td>
        </tr>
        )

  return (<>
    <InputGroup className="mb-3"> 
        <Form.Control onChange={handleChange} placeholder="Buscar" aria-label="Buscar" aria-describedby="basic-addon1"/>
    </InputGroup>

    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
            <th>Estación</th>
            <th>Bicis Disponibles</th>
            <th>Slots Libres</th>
            <th>Latitud</th>
            <th>Longitud</th>
            <th>e-bikes</th>
        </tr>
      </thead>
      <tbody>
            {listaFinal}
      </tbody>
    </Table>
    </>);
}

export default Bicis;