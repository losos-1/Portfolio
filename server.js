const express = require("express");
const cors = require("cors");
const { execFile } = require("child_process");

const app = express();

const BOT_TOKEN = "8585984242:AAECZh7YNe0Pfq4lx4PgJZDlEST2YHlIV58";
const CHAT_ID = "975553094";

app.use(cors());
app.use(express.json());

app.post("/send-message", (req, res) => {
  const { name, phone, message } = req.body;

  const text = `
Новая заявка с сайта:

Имя: ${name}
Телефон: ${phone}
Сообщение: ${message}
`;

  const command = `
$token = "${BOT_TOKEN}"
$chatId = "${CHAT_ID}"
$text = @"
${text}
"@

Invoke-RestMethod -Uri "https://api.telegram.org/bot$token/sendMessage" -Method Post -Body @{
  chat_id = $chatId
  text = $text
}
`;

  execFile("powershell.exe", ["-Command", command], (error, stdout, stderr) => {
    if (error) {
      console.log("===== POWERSHELL ERROR =====");
      console.log(error.message);
      console.log(stderr);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    console.log(stdout);

    res.status(200).json({
      success: true,
    });
  });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});