# SHADOW DOM

https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM

I samband med Web Components så finns det ett några koncept att vara medveten om.  

För det första; Web Components är s.k "custom elements" som skapas av oss som utvecklare.  
En komponent har en specifik uppgift och syfte, t ex att rendera en produkt på en webbplats.
Tanken med komponenterna är att dessa ska kunna återanvändas, både per applikation eller i olika applikationer.  

Därför är det ibland önskvärt att skapa en komponent som inte kan manipuleras av annan kod (utanför komponenten).  


```
┌─────────────────────────┐
│     Shadow Host         │  ← Shadow Host - DOM-element (nod) till vilken shadow root läggs till
│  ┌───────────────────┐  │
│  │   Shadow Root     │  │  ← Shadow Root - "rot"-nod som blir ingångspunkten
│  │  ┌─────────────┐  │  │
│  │  │ Shadow Tree │  │  │  ← Shadow Tree - allt innehåll, noder, under root. Har "dolt" innehåll
│  │  └─────────────┘  │  │
│  └───────────────────┘  │
│     Shadow Boundary     │  ← Skyddsgränsen
└─────────────────────────┘
```

Slots vs API-data

Slots är bra när användaren i HTML ska bestämma innehållet:
  <my-card>
    <span slot="title">Hårdkodad titel</span>
  </my-card>

  API-data fylls i programmatiskt - template utan slots är mer effektivt.
  