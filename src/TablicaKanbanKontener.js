import React, { Component } from "react";
import PropTypes from "prop-types";
import TablicaKanban from "./TablicaKanban";
import update from 'immutability-helper';
import KartaEdycja from "./KartaEdycja";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

export default class TablicaKanbanKontener extends Component {
    constructor() {
        super();
        this.state = {
            karty: []
        }
    }

    componentDidMount() {
        fetch('/karty.json')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({karty: responseData})
                console.log('Pobrano plik karty JSON')
            })
            .catch((error) => {
                console.log('Błąd pobierania i przetwarzania danych', error)
            })
    }

    dodajZadanie(idKarty, nazwaZadania) {
        console.log(`dodajZadanie: idKarty: ${idKarty}, nazwaZadania: ${nazwaZadania}`)

        // find card index
        let indexKarty = this.state.karty.findIndex((karta) => karta.id === idKarty)

        // create a new task with the given name and a temporary identifier
        let noweZadanie = {id: Date.now(), nazwa: nazwaZadania, zrobione: false};

        // create new object and add the task to a task board
        let nowyStan = update(this.state.karty, {
            [indexKarty]: {
                zadania: {$push: [noweZadanie]}
            }
        })

        // set component state to the changed object
        this.setState({karty: nowyStan})
    }

    usunZadanie(idKarty, idZadania, indexZadania) {
        console.log(`usunZadanie: idKarty: ${idKarty}, idZadania: ${idZadania}, indexZadania: ${indexZadania}`)

        // find card index
        let indexKarty = this.state.karty.findIndex((karta) => karta.id === idKarty)

        // create new card object without selected task
        let nowyStan = update(this.state.karty, {
            [indexKarty]: {
                zadania: {$splice: [[indexZadania, 1]]}
            }
        })

        this.setState({karty: nowyStan})
    }

    zmienZadanie(idKarty, idZadania, indexZadania) {
        console.log(`zmienZadanie: idKarty: ${idKarty}, idZadania: ${idZadania}, indexZadania: ${indexZadania}`)

        let poprzedniStan = this.state.karty

        // find card index
        let indexKarty = this.state.karty.findIndex((karta) => karta.id === idKarty)
        let nowaWartoscZrobione;

        // With $apply command change inverse 'zrobione' value
        let nowyStan = update(this.state.karty, {
            [indexKarty]: {
                zadania: {
                    [indexZadania]: {
                        zrobione: {
                            $apply: (zrobione) => {
                                nowaWartoscZrobione = !zrobione
                                return nowaWartoscZrobione;
                            }
                        }
                    }
                }
            }
        })

        console.log(`nowaWartoscZrobione: ${nowaWartoscZrobione}`)
        this.setState({karty: nowyStan})
    }

    aktualizujKarte(karta) {
        let poprzedniStan = this.state.karty

        let indexKarty = this.state.karty.findIndex((k) => k.id === karta.id)

        let nowyStan = update(this.state.karty, {
            [indexKarty]: {$set: karta}
        })

        console.log(`nowa karta: ${karta}`)
        this.setState({karty: nowyStan})
    }

    render() {
        return (
            <div>
                <Router>
                        <Route path="/" render={ (routeProps) =>
                            <TablicaKanban karty={this.state.karty}
                                           funkcjeZwrotne={{
                                               zmien: this.zmienZadanie.bind(this),
                                               usun: this.usunZadanie.bind(this),
                                               dodaj: this.dodajZadanie.bind(this)
                                           }} />
                        } />
                        <Route path="/edytuj/:id_karty" render={({match}) =>
                            <KartaEdycja aktualizujKarte={this.aktualizujKarte.bind(this)}
                                         karty={this.state.karty}
                                         ktory={match} /> } />
                </Router>
            </div>
        )
    }
}