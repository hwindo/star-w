import React from 'react';

function LoadingBar() {
    let words = [
        'from a galaxy far far away',
        'Good at something? Feel free to call yourself a Jedi',
        'He\'s using an old Jedi mind trick',
        'It\'s an energy field created by all living things',
        'Along with a light side, the Force also has a dark side',
        'You stuck up, half-witted, scruffy-looking nerfherder',
        'Only Imperial Stormtroopers are so precise',
        'Robots of the World! Arise',
        'The Phantom Menace gave us one good thing: the word padawan'
    ];
    function getRandomWord(words) {
        return words[Math.floor((Math.random() * words.length))];
    }

    return (
        <div className='loading-bar'>
            <div className='title'><i className='fa fa-fw fa-spin fa-circle-o-notch'/>Loading...</div>
            <div className="subtitle">{getRandomWord(words)}</div>
        </div>
    )
}

export default LoadingBar;