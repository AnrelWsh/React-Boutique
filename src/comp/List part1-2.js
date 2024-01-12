
import styled from 'styled-components';
import {Trash2} from 'lucide-react';

const Ul = styled.li`
display: flex;
flex-direction: column;
gap: 12px;
padding: 12px;
`

const Li = styled.li`
list-style-type: none;
display: flex;
align-items: center;
gap: 20px;
background-color: white;
border-radius: 12px;
border: solid 1px black;

padding: 12px;
`
const Icon = styled.img`
width: 50px;
border-radius: 50px
`

const Span = styled.li`
color: black;
`

const BtnDlt = styled.li`
color: red;
background-color: whitesmoke;
transition: ease-in-out 0.3s;
padding: 6px;
border-radius: 12px;
border: solid 1px black;
&:hover{
  color: white;
  background-color:rgb(203, 95, 95);
}
`

function List({ data, setData, removeDataWithIndex }) {
  return (
    <Ul>
      {data.map((user, index) => (
        <Li key={index}>
          <Icon src={user.image} alt="User" />
          <Span>{user.name}</Span>
          <BtnDlt onClick={() => removeDataWithIndex(index)}>
            <Trash2 />
          </BtnDlt>
        </Li>
      ))}
    </Ul>
  );
}


export default List;

//<button onClick={() => removeItem(index)}>Remove</button>
//<button onClick={() => setList(list.filter((e, index) => index !== listIndex))}>Remove</button>