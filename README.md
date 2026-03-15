# 🚀 Projeto ClipMaker

Este projeto utiliza algumas variáveis de configuração locais que **não são incluídas no repositório** por motivos de organização.
Por isso, após clonar ou fazer fork do projeto, é necessário criar um arquivo de configuração local,

config.js que tem o mesmo conteúdo de config.example.js abaixo descreverei como usar e configurar esse arquivo



## 📋 Pré-requisitos

- Conta no [Cloudinary](https://cloudinary.com) para upload de arquivos e geração de transcrições.

## 🔧 Como configurar

1. **Clone o repositório** 📥:

   ```bash
   git clone https://github.com/arturmauricioss/nlw-22-iniciante
   ```

2. **Entre na pasta do projeto** 📂.

3. **Copie o arquivo de exemplo** 📄:

  copie o arquivo config.example.js e renomeie a copia como config.js
  você também pode fazer isso por linha de comando
   ```bash
   cp config.example.js config.js
   ```
  

4. **Abra `config.js` e substitua os valores pelos seus dados** ✏️:

   ```javascript
   const config = {
     cloudName: "seu_cloud_name", // <--- dentro das aspas
     uploadPreset: "seu_upload_preset", // <--- dentro das aspas
     geminiApiKey: "sua_chave_api_gemini" // <--- dentro das aspas
   }
   ```

Caso não tenha ainda seu cloudName ou uploadPreset continue no guia que irá auxilia-lo ou leia a documentação oficial da Cloudnary

## 🤖 Configurando o Google Gemini

Para analisar a transcrição e encontrar o momento viral, o projeto usa a API do Google Gemini:

1. **Acesse o [Google AI Studio](https://makersuite.google.com/app/apikey)**.
2. **Crie uma nova API Key** se não tiver.
3. **Copie a chave** e adicione no `config.js` como `geminiApiKey`.

> ⚠️ **Importante**: Mantenha sua chave segura e não a compartilhe. Ela é usada apenas localmente no navegador.

## ⚠️ Importante

O arquivo `config.js` está listado no `.gitignore`, portanto **não será enviado para o GitHub**.  
Isso permite que cada pessoa use suas próprias configurações locais sem expor esses dados no repositório.

## 📁 Estrutura relevante

```
config.example.js   # Modelo de configuração (versionado no Git)
config.js           # Configuração local (não versionada)
app.js              # Código principal do projeto
index.html          # Página HTML
```

## 💻 Uso no código

O projeto lê as configurações através do objeto `config`:

```javascript
var myWidget = cloudinary.createUploadWidget({
  cloudName: config.cloudName,
  uploadPreset: config.uploadPreset
}, callback)
```

Certifique-se de que `config.js` esteja carregado antes do script principal no HTML:

```html
<script src="config.js"></script>
<script src="app.js"></script>
```

## 🎯 Como usar

1. Abra `index.html` em um navegador.
2. Clique no botão "Upload files" para selecionar e enviar um vídeo.
3. Aguarde o processamento: 
   - O vídeo será enviado para o Cloudinary.
   - A transcrição será gerada automaticamente (pode levar alguns segundos).
   - A transcrição aparecerá na página.
4. O sistema analisará a transcrição usando o Google Gemini para identificar o momento mais viral.
5. Um clipe de 10 segundos do vídeo cortado no momento identificado será exibido na página.

> 📹 **Nota**: O clipe é gerado dinamicamente via URL do Cloudinary, sem re-upload.

## 📝 Observação

Este projeto foi pensado principalmente para uso local.  
As configurações são mantidas separadas apenas para facilitar o compartilhamento do código sem incluir dados específicos de cada usuário.
