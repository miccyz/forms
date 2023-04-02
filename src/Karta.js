import React, { Component } from "react";
import Zrobione from "./Zrobione";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import './Karta.css'

let walidatorTytulu = (wlasnosci, nazwaWlasnosci, nazwaKomponentu) => {
    if (wlasnosci[nazwaWlasnosci]) {
        let wartosc = wlasnosci[nazwaWlasnosci];
        if (typeof wartosc !== 'string' || wartosc.length > 30) {
            return new Error(
                `Wartość ${nazwaWlasnosci} w komponencie ${nazwaKomponentu} jest dłuższa niż 30 znaków.`
            );
        }
    }
}

class Karta extends Component {

    constructor() {
        super();
        this.state = {
            pokazSzczegoly: false
        }
    }

    zmienSzczegoly() {
        this.setState({pokazSzczegoly: !this.state.pokazSzczegoly})
    }

    render() {
        let kolorPaska = {
            backgroundColor: this.props.kolor,
            position: 'absolute',
            zIndex: -1,
            top: 0,
            bottom: 0,
            left: 0,
            width: 7
        }

        let szczegolyKarty;
        if (this.state.pokazSzczegoly) {
            szczegolyKarty = (
                <div className="card__details">
                    <span dangerouslySetInnerHTML={{__html: (this.props.opis)}}/>
                    <Zrobione idKarty={this.props.id}
                              zadania={this.props.zadania}
                              funkcjeZwrotne={this.props.funkcjeZwrotne} />
                </div>
            )
        }
        return (
            <div className="card">
                <div style={kolorPaska}/>
                <div className={this.state.pokazSzczegoly ? "card__title card__title--is-open" : "card__title"}
                     onClick={this.zmienSzczegoly.bind(this)}>{this.props.tytul}
                    <div className="card__edit">
                        <Link to={'edytuj/'+this.props.id}>&#9998;</Link>
                    </div>
                </div>
                {szczegolyKarty}
            </div>
        );
    }
}

Karta.propTypes = {
    id: PropTypes.number,
    tytul: walidatorTytulu,
    opis: PropTypes.string,
    zadania: PropTypes.arrayOf(PropTypes.object),
    kolor: PropTypes.string,
    funkcjeZwrotne: PropTypes.object
}

export default Karta;