import React, { useState, useRef } from "react";
import styles from "./AllUsersList.module.css";
import { personalDetailType } from "../../../model/types/user";
import SingleUser1 from "./User1/SingleUser1";
import { useScrollbar } from "../../../app/use-scrollbar";
import { personalRequestListType } from "../../../model/types/requestList";
import { ReminderText } from "../../../common/types/Reminder";
import axios from "axios";

interface AllUserProps {
  usersList: personalDetailType[];
  onClickUser: Function;
  isActive: personalDetailType | undefined;
  requests: personalRequestListType[];
}

const AllUsersList: React.FC<AllUserProps> = ({
  usersList,
  onClickUser,
  isActive,
  requests,
}) => {
  const [search, setSearch] = useState("");
  const [reminderText, setReminderText] = useState<string>(ReminderText.REMIND);

  const listWrapper = useRef(null);

  const hasScroll = usersList.length > 5;
  useScrollbar(listWrapper, hasScroll);

  const searchHandler = (e: any) => {
    setSearch(e.target.value);
    // console.log(e.target.value);
  };

  let usersListSearch = usersList;
  let s = search.toLowerCase();
  if (search) {
    usersListSearch = usersListSearch.filter((item) => {
      // console.log("item", item);
      let serchDepartment = item.work.departments.filter((dep) => {
        return dep.toLowerCase().indexOf(s) > -1;
      }).length;

      let searchName =
        item.personalDetail.firstName.toLowerCase().indexOf(s) > -1;

      return serchDepartment || searchName;
    });
  } else {
    usersListSearch = usersList;
  }

  // Adding userRequest property to the usersListSearch = usersList
  usersListSearch = usersListSearch.map((item) => {
    let requestedUserList = requests.filter((singleRequest: any) => {
      return singleRequest.requestUserId === item.id;
    });
    // console.log("RUL", requestedUserList);
    return {
      ...item,
      userRequest: requestedUserList,
    };
  });

  console.log("search", usersListSearch);
  // Sorting function to display users with list for conformation inside first.
  usersListSearch.sort((a, b) => {
    return b.userRequest.length - a.userRequest.length;
  });

  const sendReminder = async (receiverUserIds: string[]) => {
    setReminderText(ReminderText.REMINDER_BEING_SEND);
    try {
      receiverUserIds.forEach(async (userId) => {
        const response = await axios.post("/user/notifications/reminder", {
          receiverUserId: userId,
          msg: "Please send userlist to initiate feedback process",
        });
        if (response.status !== 201) {
          throw new Error("Failed");
        }
      });
      setReminderText(ReminderText.REMINDER_SENT_SUCCESSFULLY);
    } catch {
      setReminderText(ReminderText.REMINDER_SENT_ERROR);
    }
  };

  return (
    <div className={styles.all_users_list}>
      <div>
        <input
          type="search"
          id="search"
          placeholder="Search"
          onChange={searchHandler}
        ></input>
      </div>

      <button
        className={styles.btn}
        onClick={() => {
          const userList = [...usersListSearch];
          const usersToBeReminded = userList.filter((user) => {
            const matchedUser = requests.find(
              (item) => item.requestUserId === user.id
            );
            if (!matchedUser) {
              return true;
            } else {
              return false;
            }
          });
          sendReminder(
            usersToBeReminded.map((user) => {
              return user.id;
            })
          );
        }}
      >
        {reminderText === ReminderText.REMIND ? "Remind all" : reminderText}
      </button>
      <div
        style={{
          marginRight: "1px",
          height: hasScroll ? "650px" : "auto",
          minHeight: "50px",
        }}
        ref={listWrapper}
      >
        <div className={styles.scrolled_users}>
          {usersListSearch.map((user) => (
            <SingleUser1
              key={user.id}
              userInfo={user}
              onClickUser={onClickUser}
              requests={requests}
              isActive={isActive !== undefined && user.id === isActive.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllUsersList;
