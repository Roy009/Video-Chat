let APP_ID = "1a4c4f0a599c4003a23adcb861e6b2f0"

let token = null;
let uid = String(Math.floor(Math.random() * 10000))

let client;
let channel;

let localStream; // for local stream
let remoteStream; // for remote stream
let peerConnection; // to connect the peer and remote user
// setting up stun server
const servers = {
    iceServers: [
        {
            urls:['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
        }
    ]
}



let init =  async () => {
    
    client = await AgoraRTM.createOffer(APP_ID)
    await client.login({uid, token})

    channel = client.createChannel('main')
    await channel.join()

    channel.on('MemberJoined', handleUserJoined)


    localStream = await navigator.mediaDevices.getUserMedia({video:true, audio:false})
    document.getElementById('user-1').srcObject = localStream
    createOffer()
}

let createOffer = async () => {
    // The RTCPeerConnection is a interface to establish a connection between the local and a remote peer.
    peerConnection = new RTCPeerConnection(servers);

    remoteStream = new MediaStream()
    document.getElementById('user-2').srcObject = remoteStream

    // To add video audio track to the connection
    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream)
    })
    
    // Now to listen to the track we have to loop through each track and listen to each event individually
    peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track)
        })
    }
    

    peerConnection.onicecandidate = async (event) => {
        if(event.candidate){
            console.log('New ICE candidate : ', event.candidate);
        }
    }
    
    // WEB-RTC works in offer and ans policy to be able to establish a connection we need to create offer for remote user.
    let offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer) 
}


init()