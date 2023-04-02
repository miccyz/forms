import React, { Component } from "react";
// child component

class ElementListy extends Component {
    render() {
        return (
            <li>
                {this.props.ilosc} x {this.props.nazwa}
            </li>
        );
    }
}

export default ElementListy;