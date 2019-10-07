För att kunna testköra uppgifterna krävs det att man har:

* Node.js installerat
* Har kört npm install i den mapp filerna finns i

För att köra filerna skriver man sedan node filnamn.js.
I webbläsaren kommer man åt programmet på localhost:8001

Vanliga fel:
vid npm install så klagar den ofta på att man inte har angivit licens, repository etc. Detta är inget man behöver bry sig om.

Gesällprovet:
Det är ett "error" som skrivs ut ibland som klagar på att man inte kan sätta "headers" efter en fil har sänts. Detta är ett vanligt problem
men inte något som riktigt påverkar progammet negativt.

Ett flertal "modules" har använts för att lösa uppgifterna. En kort beskrivning för dessa:

mongodb: en databas som används i uppgift 6.2.1 och gesäll.
express & app: ett ramverk som används för att generera en webapplikation.
hbs: likt HTML men möjligt att lägga till handlebars uttryck {{test}} som kan förändras av node.js.
moment: en modul för att få formaterat datum
port: sätter porten för localhost (localhost:8001 är standard på alla uppgifter) 
bodyparser: en modul för att parsa POST-kroppen så man t.ex. kan få ut information från fält i formulär. 
