import { authService, dbService } from 'myBase';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

export default ({ refreshUser, userObj }) => {
  const history = useHistory();

  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
    refreshUser();
  };

  const getMyNweets = async () => {
    const nweets = await dbService
      .collection('nweets')
      .where('creatorId', '==', userObj.uid)
      .orderBy('createdAt')
      .get();
  };

  const onChange = event => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async event => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      const response = await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  useEffect(() => {
    getMyNweets();
  }, []);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          placeholder="Display Name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
