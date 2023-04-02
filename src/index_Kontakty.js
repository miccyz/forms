import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PropTypes from "prop-types";

class KontaktyKontener extends Component {
    constructor() {
        super();
        this.state = {
            kontakty: []
        }
    }

    componentDidMount() {
        fetch('./kontakty.json')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({kontakty: responseData})
            })
            .catch((error) => {
                console.log('Błąd pobierania i przetwarzania danych', error)
            })
    }

    render() {
        return (
            <Kontakty kontakty={this.state.kontakty}/>
        )
    }
}

// main component - renders Search and ContactList components
class Kontakty extends Component {

    constructor() {
        super();
        this.state = {
            poszukiwanyTekst: ''
        }
    }

    pobierzWpisanyTekst(poszukiwane) {
        this.setState({poszukiwanyTekst: poszukiwane})
    }

    render() {
        return (
            <div className="app">
                <Wyszukiwarka poszukiwanyTekst={this.state.poszukiwanyTekst}
                              pobierzWpisanyTekst={this.pobierzWpisanyTekst.bind(this)}/>
                <ListaKontaktow kontakty={this.props.kontakty}
                                poszukiwanyTekst={this.state.poszukiwanyTekst}/>
            </div>
        );
    }
}

Kontakty.propTypes = {
    kontakty: PropTypes.arrayOf(PropTypes.object)
}

class Wyszukiwarka extends Component {

    przechwycZmiane(event) {
        this.props.pobierzWpisanyTekst(event.target.value)
    }

    render() {
        return <input type="search" placeholder="szukaj"
                        value={this.props.poszukiwanyTekst}
                        onChange={this.przechwycZmiane.bind(this)}/>
    }
}

Wyszukiwarka.propTypes = {
    poszukiwanyTekst: PropTypes.string.isRequired,
    pobierzWpisanyTekst: PropTypes.func.isRequired
}

class ListaKontaktow extends Component {
    render() {

        let przefiltrowaneKontakty = this.props.kontakty.filter(
            (kontakt) => kontakt.nazwisko.indexOf(this.props.poszukiwanyTekst) !== -1
        )
        return(
            <ul>
                {przefiltrowaneKontakty.map(
                    (kontakt) => <Element key={kontakt.email}
                                          nazwisko={kontakt.nazwisko}
                                          email={kontakt.email} />
                )}
            </ul>
        )
    }
}

ListaKontaktow.propTypes = {
    kontakty: PropTypes.arrayOf(PropTypes.object)
}

class Element extends Component {
    render() {
        return <li>{this.props.nazwisko} - {this.props.email}</li>
    }
}

/*let kontakty = [
    {"nazwisko": "Jan Kowalski", "email": "jankowalski@pk.edu.pl"},
    {"nazwisko": "John Doe", "email": "johndoe@pk.edu.pl"},
    {"nazwisko": "Andrzej Nowak", "email": "andrzejnowak@pk.edu.pl"},
    {"nazwisko": "Janusz Sąsiedzki", "email": "januszsasiedzki@pk.edu.pl"},
    {"nazwisko": "Grażyna Sąsiedzka", "email": "grazynasasiedzka@pk.edu.pl"},
    {"nazwisko": "Karyna Nowak", "email": "karynka98@pk.edu.pl"}
]*/

ReactDOM.render(<KontaktyKontener/>, document.getElementById('root')
);