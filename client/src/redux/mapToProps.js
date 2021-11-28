const mapCredentials = state => {

    return {

        userInfo: state.root.userInfo,
        teamInfo: state.root.teamInfo,
        currentProject: state.root.currentProject,
        currentTicket: state.root.currentTicket,
        googleInfo: state.root.googleInfo

    }

}

const mapDispatch = dispatch => {

    return {

        userLogIn: userObj => {

            dispatch({ type: 'USER LOGIN', userObj });

        },

        userLogOut: () => {

            dispatch({type: 'USER LOGOUT'});

        },

        teamLogIn: username => {

            dispatch({ type: 'TEAM LOGIN', username });

        },

        teamLogOut: () => {

            dispatch({ type: 'TEAM LOGOUT' });

        },

        teamInfoUpdate: teamObj => {

            dispatch({type: 'TEAM INFO UPDATE', teamObj});

        },

        currentProjectUpdate: projectName => {

            dispatch({type: 'CURRENT PROJECT UPDATE', projectName});

        },

        currentTicketUpdate: ticketName => {

            dispatch({type: 'CURRENT TICKET UPDATE', ticketName});

        },

        googleInfoUpdate: obj => {

            dispatch({type: 'GOOGLE INFO UPDATE', obj});
        
        }
    };

};

export { mapCredentials, mapDispatch };