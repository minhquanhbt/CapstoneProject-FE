import React, { useEffect, useState } from 'react';
import './style.css';

const ExpandingCards = (data) => {
    const [activeId, setActiveId] = useState(0)

    const onClick = (id) => setActiveId(id);
    return (
        <div class="container">
        {
            data.data.map(card => (
                <div
                    key={card.id}
                    class={'panel ' +(activeId===card.id ? 'active' : '')}
                    onClick={() => onClick(card.id)}>
                    <div className='expand-card'>
                        <h2><a href={activeId===card.id ? ('/detail/kanji/'+card.id) : ''}>{card.character}</a></h2>
                        <div className='info'>
                            <p className='title'><b>JLPT : N{card.level}</b></p>
                            <p className='title'>Âm hán việt:</p>
                            <p className='detail'>{card.group}</p>
                            <p className='title'>Giải nghĩa:</p>
                            <p className='detail'>{card.meaning}</p>
                        </div>
                        
                    </div>
                </div>
            ))
        }
        </div>
    )
}

export default ExpandingCards;