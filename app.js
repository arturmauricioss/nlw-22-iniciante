// Exemplo:
// Url gerada ao subir um arquivo https://res.cloudinary.com/dl9rcui2b/video/upload/v1773588950/fmalm8bbe36jphvhcilg.webm
//   nome do arquivo gerado de transcrição: fmalm8bbe36jphvhcilg.transcript

let public_id = '';
let version = '';
let pollingInterval;

function waitforTranscription(){
  const url = `https://res.cloudinary.com/${config.cloudName}/raw/upload/v${version}/${public_id}.transcript`;
  console.log('Starting polling for transcript at:', url);
  
  const checkTranscript = async () => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const transcript = await response.text();
        console.log('Transcript received:', transcript);
        document.getElementById('transcript').textContent = transcript;
        clearInterval(pollingInterval);
      } else {
        console.log('Transcript not ready yet, status:', response.status, 'retrying in 3 seconds...');
      }
    } catch (error) {
      console.error('Error fetching transcript:', error);
    }
  };
  
  // Check immediately
  checkTranscript();
  
  // Then poll every 3 seconds
  pollingInterval = setInterval(checkTranscript, 3000);
}

var myWidget = cloudinary.createUploadWidget({
  cloudName: config.cloudName,
  uploadPreset: config.uploadPreset
}, (error, result) => { 
  if (!error && result && result.event === "success") { 
    console.log('Done! Here is the image info:', result.info);
    public_id = result.info.public_id;
    version = result.info.version;
    waitforTranscription();
  }
})

document.getElementById("upload_widget").addEventListener("click", function () {
  myWidget.open();

}, false)