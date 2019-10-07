F�r att kunna testk�ra uppgifterna kr�vs det att man har:

* Node.js installerat
* Har k�rt npm install i den mapp filerna finns i

F�r att k�ra filerna skriver man sedan node filnamn.js.
I webbl�saren kommer man �t programmet p� localhost:8001

Vanliga fel:
vid npm install s� klagar den ofta p� att man inte har angivit licens, repository etc. Detta �r inget man beh�ver bry sig om.

Ges�llprovet:
Det �r ett "error" som skrivs ut ibland som klagar p� att man inte kan s�tta "headers" efter en fil har s�nts. Detta �r ett vanligt problem
men inte n�got som riktigt p�verkar progammet negativt.

Ett flertal "modules" har anv�nts f�r att l�sa uppgifterna. En kort beskrivning f�r dessa:

mongodb: en databas som anv�nds i uppgift 6.2.1 och ges�ll.
express & app: ett ramverk som anv�nds f�r att generera en webapplikation.
hbs: likt HTML men m�jligt att l�gga till handlebars uttryck {{test}} som kan f�r�ndras av node.js.
moment: en modul f�r att f� formaterat datum
port: s�tter porten f�r localhost (localhost:8001 �r standard p� alla uppgifter) 
bodyparser: en modul f�r att parsa POST-kroppen s� man t.ex. kan f� ut information fr�n f�lt i formul�r. 
