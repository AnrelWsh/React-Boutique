import { useState } from 'react';
import { useEffect } from 'react';

import './App.css';
import List from './comp/A/List.js'
import styled from 'styled-components';
import {Link} from 'react-router-dom';

function App() {
  const [list, setList] = useState([]);
  let [user, setUser] = useState(null)

  function fetchRandomUser() {
    fetch("https://randomuser.me/api/")
      .then((res) => res.json())
      .then((json) => {
        setUser(json.results[0]);
  
        const newUser = {
          name: `${json.results[0].name.first} ${json.results[0].name.last}`,
          image: json.results[0].picture.medium,
        };
  
        setList([...list, newUser]);
      })
      .catch((error) => {
        console.error("Error fetching random user:", error);
      });
  }
  

  useEffect(() => {
    fetchRandomUser()
  }, [])

  useEffect(() => {
    if (user){
      if(user.dob.age < 30){
        fetchRandomUser()
      }
    }
  }, [user])


  const Button = styled.button`
    color: blue;
    background-color: red;
    border-radius: 8px;
    &:hover{
      background-color: green;
    }
  `

  const Li = styled.li`
  color: blue;
  background-color: red;
  border-radius: 8px;
  &:hover{
    background-color: green;
  }
`

  return (
    <div className="App">
      <header className="App-header"> 
        <List data={list} setData={setList} removeDataWithIndex={(listIndex) =>{
          setList(list.filter((e, index) => index !== listIndex))
        }}/>


        <Button onClick={() => 
        //add un random user à une liste
          fetchRandomUser()
          }>New user</Button>
        {
          user ? <div>
            <img src={user.picture.medium
            }/>
            <span>{user.name.last} {user.name.first} - {user.dob.age}</span>
          </div> : null
        }
        
        <Link to="/about">Go to about</Link>

      </header>
    </div>
  );
}

export default App;

/*lucide-react pour les icons 
shadcn ui pour le boostrap */