import React, { useState, useEffect } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';

function SymbolsDropdown(props) {
    const [symbols, setSymbols] = useState(["Dove", "Galatasaray Logo"])
    const [selectedSymbol, setSelectedSymbol] = useState(null)

    useEffect(
        ()=>{
            setSelectedSymbol(props.selectedPattern)
        }, [props.selectedPattern]
    )

    return (
        <>
        <DropdownButton
            variant="secondary"
            title={!selectedSymbol ? "Symbols" : selectedSymbol }
            id="input-group-dropdown-1"
            onSelect = {(eventKey) => props.setSelectedPattern(eventKey)}
        >
            {symbols && symbols.length > 0 && symbols.map((symbol) => 
                <Dropdown.Item key={symbol} eventKey={symbol} href="#">{symbol}</Dropdown.Item>
            )}
        </DropdownButton>
        </>
    );
}

export default SymbolsDropdown;
