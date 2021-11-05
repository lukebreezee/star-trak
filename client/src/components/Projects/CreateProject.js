import { connect } from 'react-redux';
import { mapCredentials, mapDispatch } from '../../redux/mapToProps';
import { useState } from 'react';
import axios from 'axios';

const CreateProjectComponent = props => {

    const [projectName, setProjectName] = useState('');

    const [description, setDescription] = useState('');

    const [priority, setPriority] = useState('Priority');

    const [selectedMembers, setSelectedMembers] = useState([]);

    const handleSubmit = event => {

        event.preventDefault();

        let alert = document.getElementById('create-project-alert');

        if (priority === 'Priority') {

            alert.innerHTML = 'A priority must be set';
            return;

        }

        if (selectedMembers.length === 0) {

            alert.innerHTML = 'At least one member must be selected';
            return;

        }

        axios.post('http://localhost:5000/create-project', {

            teamUsername: props.userInfo.teamUsername,
            projectInfo: {

                projectName,
                selectedMembers,
                description,
                priority,
                creator: props.userInfo.username,
                date: Date().toString()

            }

        })
        .then(res => {

            if (res.data.message) {

                alert.innerHTML = res.data.message;
                return;

            }

            props.teamInfoUpdate(res.data);

        });

    };

    const handleClick = (event, username) => {

        let color = event.target.style.backgroundColor;

        if (color === '') {

            setSelectedMembers([...selectedMembers, username]);

            event.target.style.backgroundColor = '#CCCCCC';

        } else {

            setSelectedMembers(() => {

                const tmp = [...selectedMembers];

                const userIndex = tmp.indexOf(username);

                tmp.splice(userIndex, 1);

                return tmp;

            });

            event.target.style.backgroundColor = '';

        }

    };

    return (

        <div className="aligned">

            <form onSubmit={e => handleSubmit(e)}>

                <input

                    type="text" 
                    placeholder="Project Name" 
                    onChange={e => setProjectName(e.target.value)}
                    required

                />

                <div>Members:</div>

                <div id="create-project-alert"></div>

                <div className="scrolling-list">

                    {

                        props.teamInfo.members.map((obj, index) => {

                            if (obj.username === props.userInfo.username) {

                                return null;
                                
                            }

                            return (

                                <div 

                                    onClick={e => handleClick(e, obj.username)}
                                    username={obj.username}
                                    key={index}

                                >

                                    {obj.firstName} {obj.lastName} ({obj.role})

                                </div>

                            );

                        })

                    }

                </div>

                <input 

                    type="text" 
                    className="description"
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Description (Optional)"

                />

                <select onChange={e => setPriority(e.target.value)}>

                    <option>Priority</option>

                    <option>High</option>

                    <option>Medium</option>

                    <option>Low</option>

                </select>

                <button type="submit">Create</button>

            </form>

        </div>

    );

};

const CreateProject = connect(mapCredentials, mapDispatch)(CreateProjectComponent);

export { CreateProject };