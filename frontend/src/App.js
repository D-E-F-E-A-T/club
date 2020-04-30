import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import CustomInputs from './components/CustomInputs'

function App() {
  const [users, setUser] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function load() {
      const response = await axios.get('http://localhost:8000/usuarios');
      //console.log(response.data);
      setUser(response.data);
    }
    load();
    console.log(users)
  }, [])


  const MySwal = withReactContent(Swal);


  const [idValue, setIdValue] = useState();
  const [nameValue, setNameValue] = useState();
  const [userValue, setUserValue] = useState();

  function showModalInputs(idParam, nomeParam, userParam) {
    MySwal.fire({
      html:
        <>
          <CustomInputs id="inputID" type={'text'} valueInput={idParam} onChangeEvent={e => setIdValue(e.target.idValue)} />
          <CustomInputs id="inputUser" type={'text'} valueInput={nomeParam} onChangeEvent={e => setNameValue(e.target.nameValue)} />
          <CustomInputs id="inputName" type={'text'} valueInput={userParam} onChangeEvent={e => setUserValue(e.target.userValue)} />
        </>
      ,
      preConfirm: () => {
        return [
          document.getElementById("inputID").value,
          document.getElementById("inputUser").value,
          document.getElementById("inputName").value,
        ];
      },
    }).then(value => {
      alert(JSON.stringify(value));
    });
  }

  function deleteUser(userId) {
    axios.delete(`http://localhost:8000/delete/${userId}`)
  }

  return (
    <table className="table">
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nome</th>
          <th scope="col">Usuário</th>
          <th scope="col">Senha</th>
          <th scope="col">Nível</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr>
            <th scope="row">{user.id}</th>
            <td>{user.nome}</td>
            <td>{user.usuario}</td>
            <td>{user.senha_original}</td>
            <td>{user.nivel}</td>
            <td>
              <a onClick={() => showModalInputs(user.id, user.nome, user.usuario)} className="btn btn-warning">Editar</a>
              <a onClick={() => deleteUser(user.id)} className="btn btn-danger ml-2" >Excluir</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default App;