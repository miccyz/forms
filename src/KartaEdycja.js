import React, {Component} from "react";
import PropTypes from "prop-types";
import KartaFormularz from "./KartaFormularz";

export default class KartaEdycja extends Component {
    constructor() {
        super()
        this.state = {
            karta: {
                tytul: "",
                opis: "",
                kolor: ""
            }
        }
    }

    pobierzKarte() {
        let id_karty = this.props.ktory.params.id_karty
        console.log(`ID karty: ${id_karty}`)
        let karta = this.props.karty.find((k) => k.id == id_karty)
        console.log(karta)
        if ((karta) && (karta.id != this.state.karta.id))
            this.setState({karta: karta})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.pobierzKarte()
    }

    componentDidMount() {
        this.pobierzKarte()
    }

    render() {
        return(
            <div>
                <KartaFormularz szkicKarty={this.state.karta}
                                przyciskLabel="Aktualizuj kartę"
                                aktualizujKarte={this.props.aktualizujKarte.bind(this)}
                                />
            </div>
        )
    }
}

KartaEdycja.propTypes = {
    aktualizujKarte: PropTypes.func.isRequired,
    karty: PropTypes.arrayOf(PropTypes.object)
}