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
     uploadPreset: "seu_upload_preset" // <--- dentro das aspas
   }
   ```

Caso não tenha ainda seu cloudName ou uploadPreset continue no guia que irá auxilia-lo ou leia a documentação oficial da Cloudnary

## ☁️ Configurando o Cloudinary

Para usar este projeto, você precisa configurar sua conta no Cloudinary:

1. **Crie uma conta** no [Cloudinary](https://cloudinary.com) se ainda não tiver.
2. **Acesse o Dashboard** e copie o **Cloud Name** (geralmente visível na URL ou configurações).
3. **Crie um Upload Preset**:
   - Vá para Settings > Upload.
   - Clique em "Add upload preset".
   - Configure as opções desejadas (ex: permitir uploads de vídeo, ativar transcrição automática se disponível).
   - Copie o nome do preset.
4. **Substitua no `config.js`** os valores de `cloudName` e `uploadPreset`.

> 💡 **Dica**: Certifique-se de que o preset permite uploads de vídeo e tem permissões adequadas para geração de transcrições.

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
3. Aguarde o processamento: o vídeo será enviado e a transcrição será gerada automaticamente.
4. A transcrição aparecerá na página assim que estiver pronta.

## 📝 Observação

Este projeto foi pensado principalmente para uso local.  
As configurações são mantidas separadas apenas para facilitar o compartilhamento do código sem incluir dados específicos de cada usuário.
