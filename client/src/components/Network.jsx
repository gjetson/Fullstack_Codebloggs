import React, { useState } from 'react'

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
    const [activeUserId, setActiveUserId] = useState(null);

    const handleCardClick = (userId) => {
        setActiveUserId(userId);
    };

    const handleCardHover = (userId) => {
        const card = document.getElementById(`user-${userId}`);
        if (card) {
            card.style.boxShadow = '0 0 5px 2px gray';
            card.onmouseleave = () => {
                card.style.boxShadow = 'none';
            }
        }
    };


    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '250px', background: '#ccc' }}>Sidebar</div>
            <div style={{ marginLeft: '250px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {users.map((user) => (
                        <div
                            key={user.id}
                            id={`user-${user.id}`}
                            style={{
                                flexBasis: '25%',
                                width: '300px',
                                height: '200px',
                                padding: '1%',
                                border: '1px solid black',
                                borderRadius: '10px',
                                margin: '1%',
                                cursor: 'pointer',
                                boxShadow: user.id === activeUserId ? '0 0 5px 2px blue' : 'none',
                                background: user.id === activeUserId ? '#f5f5f5' : 'white',
                            }}
                            onClick={() => handleCardClick(user.id)}
                            onMouseEnter={() => handleCardHover(user.id)}
                            onMouseLeave={() => handleCardHover(null)}
                        >
                            <h2>{user.name}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}