import React from 'react'

const users = [
  {
    id: 1,
    name: '1',
    description: '',
  },
  {
    id: 2,
    name: '2',
    description: '',
  },
  {
    id: 3,
    name: '3',
    description: '',
  },
  {
    id: 4,
    name: '4',
    description: '',
  },
  {
    id: 5,
    name: '5',
    description: '',
  },
  {
    id: 6,
    name: '6',
    description: '',
  },
]

export default function Network() {

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: '250px' }}>
      {users.map((user) => (
        <div
          key={user.id}
          style={{
            width: '27%',
            height: '400px',
            margin: '20px',
            marginTop: '65px',
            padding: '1%',
            border: '1px solid black',
            borderRadius: '10px',
          }}
        >
          <h2>{user.name}</h2>
          <img src={`https://picsum.photos/seed/${getRandomInt(100)}/600/300`} alt="pic" />
        </div>
      ))}
    </div>
  )
};

