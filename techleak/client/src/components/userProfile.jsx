import React from 'react';

class UserProfile extends React.Component {
    render() {
        return (
            <div class='column is-4-tablet is-10-mobile name'>
            <p>
              <span class='title is-bold'>Paul Miller</span>
              
              <a class='button is-primary is-outlined' href='#' id='edit-preferences' style={{margin: "5px 0"}}>
                Edit Preferences
              </a>
              
            </p>
            <p class='tagline'>
              The users profile bio would go here, of course. It could be two lines or more or whatever. We should probably limit the amount of characters to ~500 at most though.
            </p>
          </div>            
          
        );
    }
}

export default UserProfile;