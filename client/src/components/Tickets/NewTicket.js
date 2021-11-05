import { connect } from "react-redux";
import { mapCredentials, mapDispatch } from "../../redux/mapToProps";
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";


const NewTicketComponent = props => {

    const [ticketMembers, setTicketMembers] = useState([]);

    const [ticketName, setTicketName] = useState('');

    const [description, setDescription] = useState('');

    const [priority, setPriority] = useState('Priority');

    let history = useHistory();

    const memberObj = props.teamInfo.members.find(elem => 
        
        elem.username === props.userInfo.username
        
    );

    if (memberObj.role === 'dev') {

        history.push('/projects-dev');

    }

    const projectInfo = props.teamInfo.projects.find(obj => 
        
        obj.projectName === props.currentProject
    
    );

    const projectMembers = projectInfo.selectedMembers.map((username, index) => {

        const memberInfo = props.teamInfo.members.find(obj =>
            
            obj.username === username
            
        );

        return (

            <div 

                onClick={e => handleClick(e, username)}
                username={username}
                key={index}
                
            >

                {memberInfo.firstName} {memberInfo.lastName} ({memberInfo.role})

            </div>

        );

    });

    const handleClick = (event, username) => {

        let color = event.target.style.backgroundColor;

        if (color === '') {

            setTicketMembers([...ticketMembers, username]);

            event.target.style.backgroundColor = '#CCCCCC';

        } else {

            setTicketMembers(() => {

                const tmp = [...ticketMembers];

                const userIndex = tmp.indexOf(username);

                tmp.splice(userIndex, 1);

                return tmp;

            });

            event.target.style.backgroundColor = '';

        }

    };

    const handleSubmit = event => {

        event.preventDefault();

        let alert = document.getElementById('new-ticket-alert');

        if (priority === 'Priority') {

            alert.innerHTML = 'A priority must be set';
            return;

        }

        axios.post('http://localhost:5000/new-ticket', {

            ticketInfo: {

                ticketName,
                ticketMembers,
                description,
                priority,
                date: Date().toString(),
                creator: props.userInfo.username,
                projectName: projectInfo.projectName

            },
            teamUsername: props.teamInfo.username

        })
        .then(res => {

            if (res.data.message) {

                alert.innerHTML = res.data.message;
                return;

            }

            console.log(res.data);

            props.teamInfoUpdate(res.data);

        });

    };

    return (

        <div className="aligned">

            <form onSubmit={e => handleSubmit(e)}>

                <input 

                    type="text" 
                    placeholder="Ticket Name"
                    onChange={e => setTicketName(e.target.value)}
                    required 
                    
                />

                <div>Members: </div>

                <div className="scrolling-list">

                    {
                    
                        projectMembers.map(elem => {

                            return elem;

                        })
                    
                    }

                </div>

                <input 

                    type="text" 
                    placeholder="Description (Optional)" 
                    className="description"
                    onChange={e => setDescription(e.target.value)}
                    
                />

                <select onChange={e => setPriority(e.target.value)}>

                    <option>Priority</option>

                    <option>High</option>

                    <option>Medium</option>

                    <option>Low</option>

                </select>

                <button type="submit" >Create</button>

                <div id="new-ticket-alert"></div>

            </form>

        </div>

    );

};

const NewTicket = connect(mapCredentials, mapDispatch)(NewTicketComponent);

export { NewTicket };