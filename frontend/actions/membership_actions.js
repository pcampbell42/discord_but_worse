import * as MembershipAPIUtil from "../util/membership_api_util";

export const RECEIVE_MEMBERSHIP = "RECEIVE_MEMBERSHIP";
export const REMOVE_MEMBERSHIP = "REMOVE_MEMBERSHIP";
export const RECEIVE_MEMBERSHIP_ERROR = "RECEIVE_MEMBERSHIP_ERROR";
export const CLEAR_MEMBERSHIP_ERRORS = "CLEAR_MEMBERSHIP_ERRORS";

const receiveMembership = membership => ({
    type: RECEIVE_MEMBERSHIP,
    membership
});

const removeMembership = membershipId => ({
    type: REMOVE_MEMBERSHIP,
    membershipId
});

export const receiveMembershipError = error => ({
    type: RECEIVE_MEMBERSHIP_ERROR,
    error
});

export const clearMembershipErrors = () => ({
    type: CLEAR_MEMBERSHIP_ERRORS
});

export const createMembership = membership => dispatch => MembershipAPIUtil.createMembership(membership)
    .then(membership => dispatch(receiveMembership(membership)),
        err => dispatch(receiveMembershipError(err.responseJSON)));

export const deleteMembership = membershipId => dispatch => MembershipAPIUtil.deleteMembership(membershipId)
    .then(() => dispatch(removeMembership(membershipId)));
    