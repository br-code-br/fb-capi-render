const express = require('express');
const axios = require('axios');
const app = express();

app.get("/", async (req, res) => {
  try {
    await axios.post(
      'https://graph.facebook.com/v18.0/937185518267391/events?access_token=EAATA4gzUsFcBOzAlZBFgmZB6imzumTZCRchX5DMZCogebywWdD2F0OtWWQm32SEk5ZBsJ8iZCSCKw3fkZBDbjLKuPcLD8EZAzsw8aK5Evhr2MH5EMP6KtRgIJl7hFp8DH7GTehHkD8HSf6GS8ZATPzS2IJ6yCOGcOAlbqH6tqqnetqC4jpKNxCVQWOExeyRG15ODQ5wZDZD',
      {
        data: [
          {
            event_name: 'Purchase',
            event_time: Math.floor(Date.now() / 1000),
            action_source: 'website',
            event_source_url: 'https://famosasbrasilvip.netlify.app/',
            custom_data: {
              value: 20.00,
              currency: 'BRL',
            },
          }
        ]
      }
    );
    res.redirect("https://famosasbrasilvip.netlify.app/");
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).send("Erro ao enviar evento para o Facebook.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});