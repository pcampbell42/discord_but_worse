import { connect } from "react-redux";
import NewServerForm from "./new_server_form";

const mstp = state => ({
    currentUser: state.entities.users[state.session.id],
});

const mdtp = dispatch => ({
    // create server action
});

export default connect(mstp, mdtp)(NewServerForm);