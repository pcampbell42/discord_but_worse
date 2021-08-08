
export const findMembershipId = (currentUserId, serverId, memberships) => {
    for (const i in memberships) {
        if (currentUserId === memberships[i].userId && serverId === memberships[i].serverId) {
            return memberships[i].id;
        }
    }
}

export const currentUserServerIds = state => {
    const currentUserId = state.session.id;

    const memberships = state.entities.memberships;
    let joinedServerIds = [];

    for (const i in memberships) {
        if (currentUserId === memberships[i].userId) {
            joinedServerIds.push(memberships[i].serverId);
        }
    }

    return joinedServerIds;
}


export const currentUserServers = state => {
    const currentUserId = state.session.id;

    const memberships = state.entities.memberships;
    let joinedServerIds = [];

    for (const i in memberships) {
        if (currentUserId === memberships[i].userId) {
            joinedServerIds.push(memberships[i].serverId);
        }
    }

    const servers = state.entities.servers;
    let joinedServers = [];

    for (const i in servers) {
        if (joinedServerIds.includes(servers[i].id)) {
            joinedServers.push(servers[i]);
        }
    }

    return joinedServers;
}

export const currentServerUsers = (state, currentServerId) => {
    const memberships = state.entities.memberships;
    let serverMemberships = [];

    for (const i in memberships) {
        if (memberships[i].serverId.toString() === currentServerId) {
            serverMemberships.push(memberships[i]);
        }
    }


    let serverUsers = [];
    for (let i = 0; i < serverMemberships.length; i++) {
        serverUsers.push(state.entities.users[serverMemberships[i].userId]);
    }

    return serverUsers;
}
