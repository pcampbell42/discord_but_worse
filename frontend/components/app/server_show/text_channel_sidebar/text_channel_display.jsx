import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import settingsIcon from "../../../../../app/assets/images/settings_icon.png"

class TextChannelDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            hovered: false,
            editHovered: false,
            name: props.textChannel.name
        }

        this.update = this.update.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleEscape = this.handleEscape.bind(this);
    }


    componentDidMount() {
        document.addEventListener("keydown", this.handleEscape, true);
    }


    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleEscape, true);
    }


    handleEscape(e) {
        if (e.keyCode === 27) {
            this.setState({ showForm: false, name: this.props.textChannel.name });
        }
    }


    update(e) {
        this.setState({ name: e.currentTarget.value });
    }


    handleReset(e) {
        e.preventDefault();
        this.setState({ name: this.props.textChannel.name });
    }


    handleClose() {
        this.setState({ showForm: false, name: this.props.textChannel.name });
    }


    handleDelete(e) {
        this.props.deleteTextChannel(this.props.textChannel.id)
            .then(() => this.props.history.push(`/app/servers/${this.props.server.id}/${this.props.textChannels[0].id}`));
    }


    handleSubmit(e) {
        e.preventDefault();
        this.props.updateTextChannel({ id: this.props.textChannel.id, name: this.state.name })
            .then(() => this.setState({ name: this.props.textChannel.name, showForm: false }))
    }


    render() {
        const { textChannel, server, selected, currentUser } = this.props;

        const settingsButton = (
            <div className="tc-name-hover-relative-position-anchor">
                <div className="tc-name-hover-container">
                    <img src={settingsIcon} onClick={() => this.setState({ editHovered: false, showForm: true })}
                        onMouseEnter={() => this.setState({ editHovered: true })}
                        onMouseLeave={() => this.setState({ editHovered: false })}></img>
                </div>
            </div>
        );

        const settingsTooltip = (
            <div className="ts-settings-relative-position-anchor">
                <div className="ts-settings-tooltip-show">Edit Channel</div>
                <div className="ts-settings-arrow-down"></div>
            </div>
        );

        const textChannelSettings = (
            <div className="tc-settings-container">

                <div className="tc-settings-cancel-button">
                    <div className="tc-settings-x-button" onClick={this.handleClose}>x</div>
                    <p>ESC</p>
                </div>

                <div className="tc-settings-left">
                    <ul>
                        <li>Overview</li>
                        <li className="tc-settings-delete-button" onClick={this.handleDelete}>Delete Channel</li>
                    </ul>
                </div>

                <div className="tc-settings-right">
                    <h1>OVERVIEW</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label>CHANNEL NAME
                            <input type="text" value={this.state.name} onChange={this.update} />
                        </label>

                        <div>
                            <section onClick={this.handleReset}>Reset</section>
                            <input id={this.state.name === "" ? "tc-settings-invalid" : null} className="tc-settings-save-changes" type="submit" value="Save Changes" />
                        </div>
                    </form>
                </div>
            </div>
        );

        return (
            this.state.showForm ? textChannelSettings : (
                <li className={selected ? "selected" : null}
                    onMouseEnter={() => this.setState({ hovered: true })}
                    onMouseLeave={() => this.setState({ hovered: false })}>

                    <Link to={`/app/servers/${server.id}/${textChannel.id}`}>
                        <h1>#</h1>
                        <h3>{textChannel.name}</h3>
                    </Link>

                    {(this.state.hovered || selected) && currentUser.id === server.ownerId ?
                        settingsButton : null
                    }

                    {this.state.editHovered ? settingsTooltip : null}
                </li>
            )
        );
    }
}

// export default TextChannelDisplay;
export default withRouter(TextChannelDisplay);
