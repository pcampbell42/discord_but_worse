import React from "react";

class ServerShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleJoin = this.handleJoin.bind(this);
    }

    componentWillUnmount() {
        this.props.clearMembershipErrors();
    }

    handleJoin(e) {
        e.preventDefault();
        this.props.createMembership({ server_id: this.props.server.id })
    }

    render() {
        const { currentUserServerIds, server, errors } = this.props;

        const serverDisplay = (
            <li className="hp-server-show-container" id={errors[1] === server.id.toString() ? "e" : null}>
                <div>{server.name[0]}</div>
                <button onClick={this.handleJoin}>Join</button>
                <h2>{server.name}</h2>
                <h3>{errors[1] === server.id.toString() ? errors[0] : null}</h3>
            </li>
        );

        return (
            currentUserServerIds.includes(server.id) ? null : serverDisplay
        );
    }
}

export default ServerShow;