// import React, {useEffect} from 'react';
// import {Button, Text, View} from 'react-native';
// import Shows from './Shows';

// const App = () => {
//   useEffect(() => {
//     // Update the document title using the browser API
//     // document.title = `You clicked ${count} times`;
//     // await TrackPlayer.setupPlayer({});
//   });

//   return (
//     <View
//       style={{
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'red',
//         marginTop: 100,
//       }}>
//       <Shows />
//     </View>
//   );
// };

// export default App;

import React, {useEffect, useState} from 'react';
import {Text, Button, View} from 'react-native';
import TrackPlayer, {Capability} from 'react-native-track-player';
import {useProgress} from 'react-native-track-player/lib/hooks';
import Slider from '@react-native-community/slider';

const trackPlayerInit = async () => {
  await TrackPlayer.setupPlayer();

  TrackPlayer.updateOptions({
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.JumpBackward,
      Capability.JumpForward,
    ],
  });

  await TrackPlayer.add({
    id: '1',
    url: 'https://audio-previews.elements.envatousercontent.com/files/103682271/preview.mp3',
    type: 'default',
    title: 'My Title',
    album: 'My Album',
    artist: 'Rakesh Sahu',
    artwork: 'https://picsum.photos/100',
  });

  return true;
};

const App = () => {
  useEffect(() => {
    if (!isSeeking && position && duration) {
      setSliderValue(position / duration);
    }
  }, [position, duration]);

  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  //the value of the slider should be between 0 and 1
  const [sliderValue, setSliderValue] = useState(0);

  //flag to check whether the use is sliding the seekbar or not
  const [isSeeking, setIsSeeking] = useState(false);

  //useTrackPlayerProgress is a hook which provides the current position and duration of the track player.
  //These values will update every 250ms
  const {position, bufferedPosition, duration} = useProgress(250, null);
  useEffect(() => {
    const startPlayer = async () => {
      let isInit = await trackPlayerInit();
      setIsTrackPlayerInit(isInit);
    };
    startPlayer();
  }, []);

  //this hook updates the value of the slider whenever the current position of the song changes
  useEffect(() => {
    if (!isSeeking && position && duration) {
      setSliderValue(position / duration);
    }
  }, [position, duration]);

  const onButtonPressed = () => {
    if (!isPlaying) {
      TrackPlayer.play();
      setIsPlaying(true);
    } else {
      TrackPlayer.pause();
      setIsPlaying(false);
    }
  };
  //this function is called when the user starts to slide the seekbar
  const slidingStarted = () => {
    setIsSeeking(true);
  };
  //this function is called when the user stops sliding the seekbar
  const slidingCompleted = async value => {
    await TrackPlayer.seekTo(value * duration);
    setSliderValue(value);
    setIsSeeking(false);
  };

  return (
    <View style={{marginTop: 200}}>
      <Text>Music Player</Text>
      <Button
        title={isPlaying ? 'Pause' : 'Play'}
        onPress={onButtonPressed}
        disabled={!isTrackPlayerInit}
      />
      {/* defining our slider here */}
      <Slider
        style={{width: 400, height: 40}}
        minimumValue={0}
        maximumValue={1}
        value={sliderValue}
        minimumTrackTintColor="#111000"
        maximumTrackTintColor="#000000"
        onSlidingStart={slidingStarted}
        onSlidingComplete={slidingCompleted}
      />
    </View>
  );
};

export default App;
