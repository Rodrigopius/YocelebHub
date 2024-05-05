import React, { useEffect, useRef, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export default function VideoChat() {
  const [roomID, setRoomID] = useState('');
  const containerRef = useRef(null);
  const zegoInstanceRef = useRef(null);

  useEffect(() => {
    if (!roomID) {
      setRoomID(randomID(5));
    }
  }, [roomID]);

  useEffect(() => {
    if (roomID) {
      const initZego = async () => {
        // generate Kit Token
        const appID = 740113890;
        const serverSecret = "bfd9d85cb3800ce0c23ac5b1ce362e1d";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));

        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zegoInstanceRef.current = zp;
        // start the call
        await zp.joinRoom({
          container: containerRef.current,
          sharedLinks: [
            {
              name: 'Personal link',
              url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.OneOnOneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
          },
        });

        zp.on('roomStreamUpdate', (roomID, streamList) => {
          streamList.forEach((stream) => {
            if (stream.type === 'main') {
              zp.startPlayingStream(stream.streamID);
            }
          });
        });
      };

      initZego();
    }

    return () => {
      if (zegoInstanceRef.current) {
        zegoInstanceRef.current.leaveRoom();
        zegoInstanceRef.current.stopAllPlayingStreams();
      }
    };
  }, [roomID]);

  const handleInputChange = (event) => {
    setRoomID(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={roomID}
        onChange={handleInputChange}
        placeholder="Enter room ID..."
      />
      <div
        className="myCallContainer"
        ref={containerRef}
        style={{ width: '100vw', height: '100vh', border: '1px solid black' }}
      ></div>
    </div>
  );
}
