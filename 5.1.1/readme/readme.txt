Notera att det �r v�ldigt, v�ldigt b�kigt att f� detta att fungera p� andra datorer. Om man vill pr�va k�ra denna app kr�vs det;
* Ett g-mail konto
* Till�ta minder s�kra appar i g-mail inst�llningar
* En default.json fil som ska placeras i /config -
{
  "Email": {
    "host": "smtp.gmail.com",
    "secureConnection": true,
    "port": 465,

    "transportMethod": "SMTP",
    "auth": {
      "user": "e-mail konto",

      "pass": "l�senord"
    }
  }
}

* npm install nodemailer, npm install mailcomposer.

Jag t�nker ist�llet bara l�gga upp loggar/bilder p� resultatet som jag fick vid k�rning. 
resultat.txt visar "kopian" p� mejlet som skickades.
resultat.png visar mejlet som dyker upp i brevl�dan.