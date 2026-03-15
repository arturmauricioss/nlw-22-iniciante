let public_id = '';
let version = '';
let pollingInterval;

function waitforTranscription(){

  const getUrl = () => {
    const timestampVersion = Math.floor(Date.now() / 1000);
    const versionToUse = Math.max(version, timestampVersion);

    return `https://res.cloudinary.com/${config.cloudName}/raw/upload/v${versionToUse}/${public_id}.transcript`;
  };

  const checkTranscript = async () => {

    const url = getUrl();
    console.log('Checking transcript at:', url);

    try {

      const response = await fetch(url);

      if (response.ok) {

        clearInterval(pollingInterval);

        const transcript = await response.text();

        console.log('Transcript received:', transcript);

        // document.getElementById('transcript').textContent = transcript;

        clearInterval(pollingInterval);

        await getViralMoment(transcript);

        return;
      }

      console.log('Transcript not ready yet:', response.status);

    } catch (error) {

      console.error('Error fetching transcript:', error);

    }
  };

  checkTranscript();

  pollingInterval = setInterval(checkTranscript, 1000);
}

async function getViralMoment(transcript) {

  const model = 'gemini-3-flash-preview';

  const endpointGemini =
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const prompt = `
Analise a transcrição de vídeo abaixo.

Role: Você é um edito profissional de video especializado em conteudo viral.

Tarefa: Analise a transcrição abaixo e identifique o momento mais divertido, surpreendente ou com mais engajamento, para um corte curto.

REGRAS:
- O trecho deve conter uma linha de raciocinio completa sem cortes bruscos. o ideal é que nem o inicio nem o fim sejam em momentos falados.
- Duração ideal entre 15 e 45 segundos
- Não utilize markdown, notas ou explicação.

Retorne APENAS JSON neste formato:

{
"start": numero_em_segundos,
"end": numero_em_segundos
}

Transcrição:
${transcript}
`;

  try {

    const response = await fetch(endpointGemini, {

      method: 'POST',

      headers: {
        'x-goog-api-key': config.geminiApiKey,
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({

        contents: [{
          parts: [{
            text: prompt
          }]
        }]

      })

    });

    const data = await response.json();

    const aiResponse =
      data.candidates[0].content.parts[0].text.trim();

    console.log("AI raw response:", aiResponse);

    let json;

    try {

      json = JSON.parse(aiResponse);

    } catch {

      const match = aiResponse.match(/\{[\s\S]*\}/);

      json = JSON.parse(match[0]);

    }

    const start = parseInt(json.start);
    const end = parseInt(json.end);

    if (isNaN(start) || isNaN(end)) {

      throw new Error("Invalid timestamps from AI");

    }

    console.log("Viral segment:", start, end);

    const clipUrl =
    `https://res.cloudinary.com/${config.cloudName}/video/upload/so_${start},eo_${end}/${public_id}.webm`;

    const clip = document.getElementById('clip');

    clip.src = clipUrl;
    clip.classList.remove('hidden');

    gsap.from("#clip", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out"
    });
    gsap.from("#upload_widget", {
      opacity: 0,
      y: -20,
      duration: 0.8
    });

    console.log('Clip URL:', clipUrl);

  } catch (error) {

    console.error('Error getting viral moment:', error);

  }

}

var myWidget = cloudinary.createUploadWidget({

  cloudName: config.cloudName,
  uploadPreset: config.uploadPreset

}, (error, result) => {

  if (!error && result && result.event === "success") {

    console.log('Upload complete:', result.info);

    public_id = result.info.public_id;
    version = result.info.version;

    waitforTranscription();

  }

});

document.getElementById("upload_widget")
.addEventListener("click", function(){

  myWidget.open();

}, false);