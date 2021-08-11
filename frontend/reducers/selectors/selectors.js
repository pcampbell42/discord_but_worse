
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

export const getFirstTextChannelId = (state, currentServerId) => {
    const textChannels = Object.values(state.entities.textChannels);

    for (let i = 0; i < textChannels.length; i++) {
        if (textChannels[i].serverId === currentServerId) return textChannels[i].id;
    }
}

export const getServerTextChannels = (state, currentServerId) => {
    const textChannels = Object.values(state.entities.textChannels);

    let selectedChannels = [];
    for (let i = 0; i < textChannels.length; i++) {
        if (textChannels[i].serverId.toString() === currentServerId) selectedChannels.push(textChannels[i]);
    }

    return selectedChannels;
}

export const getMessagesForChannel = state => {
    let currentLocation = window.location.hash;

    let chatRoomType;
    if (currentLocation.includes("servers")) chatRoomType = "TextChannel";
    if (currentLocation.includes("conversations")) chatRoomType = "DirectMessage";

    const chatRoomId = parseInt(currentLocation.split("/").slice(-1).pop());

    const allMessages = Object.values(state.entities.messages);

    let selectedMessages = [];
    for (let i = 0; i < allMessages.length; i++) {
        if (allMessages[i].messageableType === chatRoomType && allMessages[i].messageableId === chatRoomId) {
            selectedMessages.push(allMessages[i]);
        }
    }

    return selectedMessages;
}
