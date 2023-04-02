import React, { Component } from "react";
// parent component

import ElementListy from "./ElementListy";
import ElementListy2 from "./ElementListy2";

class ListaZakupow extends Component {
    render() {
        return (
            <ul>
                <ElementListy ilosc="2" nazwa="Chleb"/>
                <ElementListy ilosc="5" nazwa="Jaja"/>
                <ElementListy2 ilosc="3">Mleko</ElementListy2>
            </ul>
        );
    }
}

export default ListaZakupow;