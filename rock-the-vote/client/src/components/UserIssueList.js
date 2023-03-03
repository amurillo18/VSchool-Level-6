import Issue from "./Issue";
//import { UserContext } from '../context/UserProvider'
//import { useContext } from "react";
function UserIssueList(props){

    const {issues, comments} = props

    function sortIssues(a, b){
        if( a.likedUsers.length === b.likedUsers.length ){
            return 0
        } else if (a.likedUsers.length > b.likedUsers.length){
            return -1
        } else {return 1}
    }

    issues.sort(sortIssues)


    const issueList = issues.map(issues => {
        return <Issue
            {...issues}
            key = {issues._id}
            {...comments}
        />
    })
    
    return(
        <div>
            {issueList}
        </div>
    )
}

export default UserIssueList