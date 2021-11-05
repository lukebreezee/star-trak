import { connect } from 'react-redux';
import { mapCredentials } from '../../redux/mapToProps';

const MemberListComponent = props => {

    return (

        <div>

            <div>Member List</div>

            <div className="scrolling-list">

                {

                    props.teamInfo.members.map((obj, index) => {

                        return (

                            <div key={index}>{obj.firstName} {obj.lastName}</div>

                        );

                    })

                }
                
            </div>

        </div>

    );

};

const MemberList = connect(mapCredentials)(MemberListComponent);

export { MemberList };