import React from 'react'
import AllUsersList from '../step_1_selectList/all_user_list/AllUsersList';
import styles from './setupUserList.module.css'

function SetupUserList() {

    
  return (
    <div className={styles.wrapper}>
      <div className={styles.confirmation_wrapper}>
        <div className={styles.selected_reviewers}>
          {/* <RequestUserLists /> */}
        </div>
        <AllUsersList />
      </div>
    </div>
  );
}

export default SetupUserList