import React, { useState, useEffect } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';

function AnimationsDropdown(props) {
    const [animations, setAnimations] = useState(["Music Notes"])
    const [selectedAnimation, setSelectedAnimation] = useState(null)

    useEffect(
        ()=>{
            setSelectedAnimation(props.selectedAnimation)
        }, [props.selectedAnimation]
    )
    return (
        <>
        <DropdownButton
            variant="secondary"
            title={!selectedAnimation ? "Animations" : selectedAnimation }
            id="input-group-dropdown-1"
            onSelect = {(eventKey) => props.setSelectedAnimation(eventKey)}
        >
            {animations && animations.length > 0 && animations.map((animation) => 
                <Dropdown.Item key={animation} eventKey={animation} href="#">{animation}</Dropdown.Item>
            )}
        </DropdownButton>
        </>
    );
}

export default AnimationsDropdown;
