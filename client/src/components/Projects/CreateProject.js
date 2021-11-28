import { connect } from 'react-redux';
import { mapCredentials, mapDispatch } from '../../redux/mapToProps';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { sendNotification } from '../../helpers';

const CreateProjectComponent = props => {

    const [projectName, setProjectName] = useState('');

    const [description, setDescription] = useState('');

    const [priority, setPriority] = useState('Priority');

    const [selectedMembers, setSelectedMembers] = useState([]);

    // const [render, setRender] = useState(null);

    let history = useHistory();

    if (!props.userInfo.username) {

        history.push('/login');
        return null;

    }

    if (!props.userInfo.teamUsername) {

        history.push('/team-login');
        return null;

    }

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

            props.currentProjectUpdate(projectName);

            sendNotification({ 
                
                type: 'NEW PROJECT',
                memberList: selectedMembers, 
                name: projectName,
                projectName
            
            });

            history.push('/view-project');

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
        
        <div>

        <h3>New Project</h3>

        <br />

            <div className="main-page-parent">

                <form 

                    onSubmit={e => handleSubmit(e)}
                    className="main-page-parent"

                >

                    <div>

                        <input

                            type="text" 
                            placeholder="Project Name" 
                            onChange={e => setProjectName(e.target.value)}
                            style={{width: '100%'}}
                            required

                        />

                        <br />

                        <br />

                        <div>Members You Want On The Project:</div>

                        <div id="create-project-alert"></div>

                        <div className="scrolling-list-small">

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

                    </div>

                    <div>

                        <textarea 

                            className="description"
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Description (Optional)"
                            wrap="soft"

                        />

                        <br />

                        <br />

                        <select 
                        
                            onChange={e => setPriority(e.target.value)}
                            style={{width: '100%'}}
                            
                        >

                            <option>Priority</option>

                            <option>High</option>

                            <option>Medium</option>

                            <option>Low</option>

                        </select>

                        <br />

                        <br />

                        <br />

                        <Button type="submit" style={{width: '100%'}}>Create</Button>

                    </div>

                </form>

            </div>

        </div>

    );

};

const CreateProject = connect(mapCredentials, mapDispatch)(CreateProjectComponent);

export { CreateProject };