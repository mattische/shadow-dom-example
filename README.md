# SHADOW DOM


> [!TIP]
> Läs mer om shadow DOM på mdn:
>  
> [Using shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)
>
> 

---

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

## shadowRoot "mode"

När man ska lägga till Web components till en sida så har man 2 "modes" som man kan välja.  
Med dessa modes väljer man vilken typ av inkapsling (encapsulation) man vill ha. Dessa modes är ```open``` eller ```closed```.  
Om man inte väljer ett mode man blir det ingen inkapsling och exempelvis global CSS påverkar även innehållet i komponenten.
Man väljer, deklarativt, vilket ```mode``` man vill ha.  

På sätt och vis finns det tre alternativ; open, closed och inget mode alls.

### 1. mode: 'open'

- när man vill ha en "open" shadow som inte påverkas av t ex global css eller javascript.
- ```this.attachShadow({ mode: 'open' })```
- via ```shadowRoot```-objektet kan vi komma åt innehållet.  


```javascript
export default class PetComponent extends HTMLElement {
  constructor(nameOfPet) {
          super()
          this.name = nameOfPet
          //mode open
          this.attachShadow({ mode: 'open' })
      }

  ...
  // vi måste 'gå via' shadowRoot-objektet för att manipulera innehållet.
  // vi gör också en egen style-sheet för innehållet.
  connectedCallback() {
    this.shadowRoot.innerHTML = `
                              <style>
                              .pet-name { background: #e31c79; }
                              </style>
                              <h4 class="pet-name">${this.name}</h4> 
  }
}
```

### 2. mode: 'closed'

- när man vill ha en "closed" shadow med total encapsulation
- ```this.attachShadow({ mode: 'closed' })```
- vi måste gå via en referens för att manipulera innehållet


```javascript
export default class CarComponent extends HTMLElement {
  constructor() {
          super(brand, model)
          //mode closed - vi gör en referens
          this._myShadow = this.attachShadow({ mode: 'closed' })

          this.b = brand
          this.m = model
      }

  ...

  // vi måste vår egna referens för att manipulera innehållet.
  connectedCallback() {
    this._myShadow.innerHTML = `
                              <style>
                              .car-card { background: #e31c79; }
                              </style>
                              <div class="car-card"><h1>${this.b}</h1><p>${this.m}</p></div> 
  }
}
```


### 3. inget mode
Om man inte anger mode alls så blir det ingen inkapsling.  

```javascript
export default class SingleProduct extends HTMLElement {
  constructor() {
          super()
          //vi gör inget särskilt i konstruktorn...
      }

  ...

  // vi maniupulera direkt via innerHTML. 
  // om vi vill kan vi ha css, men global css kommer att påverka
  connectedCallback() {
    this.innerHTML = `
                              <style>
                              .product-name { background: #e31c79; }
                              </style>
                              <h4 class="product-name">${this.product.name}</h4> 
  }
}
```

Som vi har använt Web components hittills i kursen så har vi inte


### undantag för css

Det finns dock undantag som alltid ärvs (spiller) till komponenteter när det gäller css.  

Dessa är:
- ```font-family``` och ```font-size```
- ```color```
- ```line-height```
- ```text-align```
- variabler ärvs alltid, t ex ```--main-color: red```
  vilket gör att ```var(--main-color)```kan användas i en komponent oavsett mode.


Slots vs API-data

Slots är bra när användaren i HTML ska bestämma innehållet:
  <my-card>
    <span slot="title">Hårdkodad titel</span>
  </my-card>

  API-data fylls i programmatiskt - template utan slots är mer effektivt.
  