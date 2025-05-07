const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const PIXEL_ID = '937185518267391';
const ACCESS_TOKEN = 'EAATA4gzUsFcBOzAlZBFgmZB6imzumTZCRchX5DMZCogebywWdD2F0OtWWQm32SEk5ZBsJ8iZCSCKw3fkZBDbjLKuPcLD8EZAzsw8aK5Evhr2MH5EMP6KtRgIJl7hFp8DH7GTehHkD8HSf6GS8ZATPzS2IJ6yCOGcOAlbqH6tqqnetqC4jpKNxCVQWOExeyRG15ODQ5wZDZD';

app.get('/', async (req, res) => {
  try {
    await axios.post(
      `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        data: [
          {
            event_name: 'Purchase',
            event_time: Math.floor(Date.now() / 1000),
            action_source: 'website',
            event_source_url: 'https://famosasbrasilvip.netlify.app/',
            user_data: {
              client_user_agent: req.headers['user-agent'],
              client_ip_address: req.ip
            },
            custom_data: {
              currency: 'BRL',
              value: 20.00
            }
          }
        ]
      }
    );
    res.redirect('https://famosasbrasilvip.netlify.app/');
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).send('Erro ao enviar evento para o Facebook.');
  }
});

app.listen(10000, () => console.log('Servidor rodando na porta 10000'));