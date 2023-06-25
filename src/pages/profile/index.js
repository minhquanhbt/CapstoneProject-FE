/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import ProfileForm from './Profile';

function Profile() {
  if(localStorage['user-info']==null) {window.location.href = '/'}
  else{
    return (
        <div>
          <ProfileForm />
        </div>
      )
  }
}
export default Profile