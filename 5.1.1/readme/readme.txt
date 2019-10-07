Notera att det är väldigt, väldigt bökigt att få detta att fungera på andra datorer. Om man vill pröva köra denna app krävs det;
* Ett g-mail konto
* Tillåta minder säkra appar i g-mail inställningar
* En default.json fil som ska placeras i /config -
{
  "Email": {
    "host": "smtp.gmail.com",
    "secureConnection": true,
    "port": 465,

    "transportMethod": "SMTP",
    "auth": {
      "user": "e-mail konto",

      "pass": "lösenord"
    }
  }
}

* npm install nodemailer, npm install mailcomposer.

Jag tänker istället bara lägga upp loggar/bilder på resultatet som jag fick vid körning. 
resultat.txt visar "kopian" på mejlet som skickades.
resultat.png visar mejlet som dyker upp i brevlådan.