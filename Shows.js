import React, {useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import TrackPlayer from 'react-native-track-player';

const Shows = () => {
  useEffect(() => {
    // Update the document title using the browser API
    // document.title = `You clicked ${count} times`;
    // await TrackPlayer.setupPlayer({});
  });

  const start = async () => {
    // Set up the player
    await TrackPlayer.setupPlayer();

    // Add a track to the queue
    await TrackPlayer.add({
      id: 'trackId',
      url: 'https://chrt.fm/track/52E86G/dts.podtrac.com/redirect.mp3/traffic.omny.fm/d/clips/4bb33704-615b-4054-aae9-ace500fd4197/c550987c-8884-4d08-ac50-ad4a002128de/c37a24df-1091-46e5-953a-ad4a00234a96/audio.mp3',
      title: 'Track Title',
      artist: 'Track Artist',
    });

    // Start playing it
    await TrackPlayer.play();
  };
  let trackIndex;

  const trackInfo = async () => {};

  const seekForward = async () => {
    trackIndex = await TrackPlayer.getPosition();
    TrackPlayer.seekTo(trackIndex + 0.5);
    console.log('----->', trackIndex);

    console.log(trackIndex + 0.5);
  };

  const seekBackward = async () => {
    trackIndex = await TrackPlayer.getPosition();
    if (trackIndex >= 0.5) {
      TrackPlayer.seekTo(trackIndex - 0.5);
    } else {
      console.log('not valid');
    }
  };

  const stop = async () => {
    await TrackPlayer.stop();
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        marginTop: 100,
      }}>
      <Text>Hello, world!</Text>
      <Button
        title="Start"
        onPress={() => {
          start();
        }}
      />
      <Button
        title="Info"
        onPress={() => {
          trackInfo();
        }}
      />
      <Button
        title="forward"
        onPress={() => {
          seekForward();
        }}
      />
      <Button
        title="backward"
        onPress={() => {
          seekBackward();
        }}
      />
      <Button
        title="stop"
        onPress={() => {
          stop();
        }}
      />
    </View>
  );
};

export default Shows;
