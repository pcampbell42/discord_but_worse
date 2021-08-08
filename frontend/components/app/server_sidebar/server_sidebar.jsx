import React from "react";
import { Link } from "react-router-dom";
import ServerIconDisplayContainer from "./server_icon_display_container";
import discordLogo from "../../../../app/assets/images/discord_logo.png";
import imageUploadIcon from "../../../../app/assets/images/image_upload_icon.png";


class ServersSideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            homeHovered: false,
            createHovered: false,
            name: `${props.currentUser.username}'s server`
        };
        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        this.props.fetchCurrentUserDetails(this.props.currentUser.id);
    }

    componentWillUnmount() {
        this.props.clearMembershipErrors();
    }

    update(e) {
        this.setState({ name: e.currentTarget.value })
    }

    handleClose(e) {
        e.preventDefault();
        this.setState({ name: `${this.props.currentUser.username}'s server`, showForm: false });
        this.props.clearMembershipErrors();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createServer({ name: this.state.name })
            .then(() => this.setState({ name: `${this.props.currentUser.username}'s server`, showForm: false }))
                .then(() => this.props.clearMembershipErrors());
    }

    render() {
        const homeTooltipShow = (
            <div className="ss-home-relative-position-anchor">
                <div className="ss-home-tooltip-show">Server Discovery</div>
            </div>
        );

        const createTooltipShow = (
            <div className="ss-create-relative-position-anchor">
                <div className="ss-create-tooltip-show">Create a Server</div>
            </div>
        );

        const createServerForm = (
            <div className="ss-create-form-relative-position-anchor">
                <div>
                    <button onClick={this.handleClose}>x</button>
                    <div>
                        <h1>Customize your server</h1>
                        <h2>Give your server a personality with a name and an icon. You can always change it later.</h2>
                        <button>
                            <img src={imageUploadIcon} />
                        </button>
                    </div>
                    <form onSubmit={this.state.name === "" ? null : this.handleSubmit}>
                        <label id={this.props.error.length < 1 ? null : "ss-error"}>
                            SERVER NAME <span>{this.props.error.length < 1 ? null : `- ${this.props.error}`}</span>
                            <input type="text" value={this.state.name} onChange={this.update} />
                        </label>
                        <footer>
                            <span>
                            </span>
                            <input id={this.state.name === "" ? "ss-invalid" : null}className="ss-submit-button" type="submit" value="Create" />
                        </footer>
                    </form>
                </div>
            </div> 
        );

        return (
            <div className="ss-container">
                {this.state.showForm ? createServerForm : null}

                <div className="ss-buffer"></div>

                <Link to="/app/home" onMouseEnter={() => this.setState({ homeHovered: true })}
                        onMouseLeave={() => this.setState({ homeHovered: false })}>
                    <div className="ss-home-hover-bar-relative-position-anchor">
                        <aside className={this.state.homeHovered ? "hovered" : null} id={this.props.homeSelected ? "selected" : null}></aside>
                    </div>
                    <div className="ss-logo-container" id={this.props.homeSelected ? "selected" : null}>
                        <img src={discordLogo} />
                    </div>
                </Link>
                {this.state.homeHovered ? homeTooltipShow : null}

                <ul className="ss-servers">
                    {this.props.userServers.map(server => 
                        <ServerIconDisplayContainer key={server.id} server={server}
                            selected={window.location.href.includes(`/app/servers/${server.id}`)} />
                    )}
                </ul>

                <button onClick={() => this.setState({ showForm: true })}
                        onMouseEnter={() => this.setState({ createHovered: true })}
                        onMouseLeave={() => this.setState({ createHovered: false })}>
                    +
                </button>
                {this.state.createHovered ? createTooltipShow : null}
            </div>
        );
    }
}

export default ServersSideBar;