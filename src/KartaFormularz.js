import React, {Component} from "react";
import PropTypes from "prop-types";

import "./KartaFormularz.css"
import {Redirect} from "react-router-dom"

export default class KartaFormularz extends Component {
    constructor() {
        super();
        this.state = { redirect: null }
    }

    obsluzZamkniecie() {
        console.log('Zamykamy okno, czyli "wracamy" na stronę główną')
        this.setState({ redirect: "/" })
    }

    obsluzZmiane(pole, e) {
        console.log(`pole: ${pole}, wartość: ${e.target.value}`)

        let karta = this.props.szkicKarty
        karta[pole] = e.target.value

        this.props.aktualizujKarte(karta)
    }

    obsluzWyslanie(e) {
        e.preventDefault()
        console.log("Wysyłamy dane i zamykamy okno")
        this.setState({ redirect: "/" })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div>
                <div className="card big">
                    <form onSubmit={this.obsluzWyslanie.bind(this)}>
                        <input type="text"
                                value={this.props.szkicKarty.tytul}
                                onChange={this.obsluzZmiane.bind(this, 'tytul')}
                                placeholder="Tytuł"
                                required={true}
                                autoFocus={true} />
                        <textarea value={this.props.szkicKarty.opis}
                                  onChange={this.obsluzZmiane.bind(this, 'opis')}
                                  placeholder="Opis"
                                  required={true} />
                        <label htmlFor="status">Status</label>
                        <select id="status"
                                value={this.props.szkicKarty.status}
                                onChange={this.obsluzZmiane.bind(this, 'status')}>
                            <option value="todo">Do zrobienia</option>
                            <option value="in-progress">W toku</option>
                            <option value="done">Zrobione</option>
                        </select>
                        <br/>
                        <label htmlFor="color">Kolor</label>
                        <input id="color"
                                value={this.props.szkicKarty.kolor}
                                onChange={this.obsluzZmiane.bind(this, 'kolor')}
                                type="color" />
                        <div className="actions">
                            <button type="submit">{this.props.przyciskLabel}</button>
                        </div>
                    </form>
                </div>
                <div className="overlay" onClick={this.obsluzZamkniecie.bind(this)}></div>
            </div>
        );
    }
}

/*KartaFormularz.propTypes = {
    przyciskLabel: PropTypes.string.isRequired,
    szkicKarty: PropTypes.shape({
        tytul: PropTypes.string,
        opis: PropTypes.string,
        status: PropTypes.string,
        kolor: PropTypes.string
    }).isRequired()
}*/