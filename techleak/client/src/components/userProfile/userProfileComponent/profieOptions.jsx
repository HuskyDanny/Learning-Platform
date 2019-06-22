import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "./profilePanel.css";
import MessagePost from './messagePost';
import SimplifiedPosts from './simplifedPosts';
import SimplifiedPost from './simplifiedPost';
import FloatingFilter from './floatingFilter';

const boxStyle = {
  height: "100%",
  width: "85%",
  alignItems: "center",
  justifyContent: "center"
}

const containerStyle = {
  height: "60%",
  position: "fixed",
  width: "29%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}

class ProfileOptions extends React.Component {
  render() {
    return (
      <div className="columns is-mobile" style={{ align: "center", margin: "0px auto", display: "flex" }}>
        <div className="column" style={{ flex: "70%", margin: "0px" }}>
          <Tabs>
            <TabList>
              <Tab>My posts</Tab>
              <Tab id="FavTab">My Favorite</Tab>
              <Tab>Browsing History</Tab>
              <Tab>Replies</Tab>
            </TabList>
            <TabPanel>
              <SimplifiedPosts
                PostType={"MyPosts"}
              />
            </TabPanel>
            <TabPanel>
              <SimplifiedPosts
                PostType={"MyLikes"}
              />
            </TabPanel>
            <TabPanel>
            </TabPanel>
            <TabPanel>
              <MessagePost />
            </TabPanel>
          </Tabs>
        </div>
        <FloatingFilter />
      </div>
    )
  }
}

export default ProfileOptions;