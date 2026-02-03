# SHADOW DOM

https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM

## Web Components

I samband med Web Components så finns det ett några koncept att vara medveten om.  

För det första; Web Components är s.k "custom elements" som skapas av oss som utvecklare.  
En komponent har en specifik uppgift och syfte, t ex att rendera en produkt på en webbplats.
Tanken med komponenterna är att dessa ska kunna återanvändas.  

I ett projekt kan olika utvecklare, eller team, arbeta parallellt med egna komponenter som sedan ska integreras i samma projekt. 

Därför är det ofta önskvärt att skapa en komponent vars css och javascript hanteras internt inuti komponenten för att på så sätt "skydda" (encapsulation) dess css och javascript och dessutom att inte påverka andra komponenter (eller element) utanför komponenten. 

## Shadow DOM

När man skapar en komponent och lägger till den till DOM-trädet, så skapas den som en nod i DOM-trädet;  
- Noden, till vilken man lägger till komponenten på, kallas ```Shadow host```.  
- Vår komponent kallas ```Shadow root```, vilken då blir roten till det 'träd' som vi lägger till.  
- Allt innehåll, t ex element och andra noder, som vi lägger till i vår Shadow root bildar tillsammans ett eget träd - det kallas ```Shadow tree```.
- ```Shadow boundary``` kallas den yttre gränsen som kapslar in vårt Shadow tree.  



```
┌─────────────────────────┐
│     Shadow Host         │  ← Shadow Host - DOM-element (nod) till vilken shadow root läggs till
│  ┌───────────────────┐  │
│  │   Shadow Root     │  │  ← Shadow Root - "rot"-nod som blir ingångspunkten (tex en egen komponent)
│  │  ┌─────────────┐  │  │
│  │  │ Shadow Tree │  │  │  ← Shadow Tree - allt innehåll, noder, under root.
│  │  └─────────────┘  │  │
│  └───────────────────┘  │
│     Shadow Boundary     │  ← Yttre gräns för shadow DOM och 
└─────────────────────────┘
```

[Illustration för koncepten ovan.](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM/shadowdom.svg)


---

Slots vs API-data

Slots är bra när användaren i HTML ska bestämma innehållet:
  <my-card>
    <span slot="title">Hårdkodad titel</span>
  </my-card>

  API-data fylls i programmatiskt - template utan slots är mer effektivt.
  