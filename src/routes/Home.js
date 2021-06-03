import { dbService } from 'myBase';
import React, { useEffect, useState } from 'react';

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);

  const getNweets = async () => {
    const dbNweets = await dbService.collection('nweets').get();
    setNweets([]);
    dbNweets.forEach(document => {
      const nweetObject = {
        ...document.data(),
        id: document.id,
      };
      setNweets(prev => [document.data(), ...prev]);
    });
  };

  useEffect(() => {
    getNweets();
    dbService.collection('nweets').onSnapshot(onSnapshot => {
      console.log('Something Happened');
    });
  }, []);

  const onSubmit = async event => {
    event.preventDefault();
    await dbService.collection('nweets').add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setNweet('');
  };

  const onChange = event => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={nweet}
          placeholder="What's your mind?"
          maxLength={120}
          name="nweet"
          onChange={onChange}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map(nweet => (
          <div key={nweet.id}>
            <h4>{nweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
