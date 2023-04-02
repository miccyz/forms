import React, { Component } from "react";
// child component

class ElementListy2 extends Component {
    render() {
        return (
            <li>
                {this.props.ilosc} x {this.props.children}
            </li>
        );
    }
}

export default ElementListy2;