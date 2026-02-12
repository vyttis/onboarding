# KU Darbuotojo Atmintine

Statinis onboarding puslapis Klaipedos universiteto darbuotojams.

## Paleidimas lokaliai

Atidaryti `index.html` narsykleje. Jokiu priklausomybiu diegti nereikia.

## Deploy

Publikuojama i ku.lt arba atskira subdomena (pvz., `onboarding.ku.lt`). Statinis puslapis -- reikia tik web serverio.

## Failu struktura

| Failas | Paskirtis |
|---|---|
| `index.html` | Visas turinys |
| `css/style.css` | Stiliai, CSS kintamieji, responsive |
| `js/main.js` | Navigacija, scroll, checklist, accordion, kalbu perjungimas, back-to-top |
| `images/` | Logotipai ir paveiksleliai |
| `plan.md` | Projekto specifikacija |
| `README.md` | Sitas failas |

## Vizualinis identitetas

**Spalvos:** `#3039C8` (melyna), `#D8A900` (smelinе), `#FF4933` (raudona), `#9198CA` (sviesi melyna), `#FFFFFF` (balta)

**Sriftai:** Space Grotesk (fallback: Arial, sans-serif)

## Repo taisykles

- `main` saka apsaugota -- pakeitimai tik per Pull Request
- Kiekvienas PR turi tureti bent 1 review
- Deploy tik is `main` sakos

## Saugumo antraste (serverio konfiguracija)

Serverio administratorius turi nustatyti sias HTTP antraste:

- `Content-Security-Policy`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`

## Testavimas pries deploy

- [ ] Veikia desktop ir mobile (Chrome, Safari)
- [ ] Veikia LT ir EN kalbos
- [ ] Nera nuluzusiu nuorodu
- [ ] Nera horizontalaus scroll
- [ ] Lighthouse: nera kritiniu accessibility/performance klaidu
- [ ] Konsoleje nera raudonu klaidu
- [ ] Klaviaturos navigacija veikia (Tab, Enter, Space)

## Komponentai

| Komponentas | Elementas | Pastabos |
|---|---|---|
| Accordion | `<details class="accordion-block">` | Mobile: toggle; Desktop: visada atidarytas |
| Action highlight | `<div class="action-highlight">` | Melynas left-border, svarbiems veiksmams |
| Back-to-top | `<button class="back-to-top">` | Pasirodo po 300px scroll |
| Checklist | `role="checkbox"` + `aria-checked` | Space/Enter klaviatura |
| Kalbu perjungimas | `data-lang-content="lt/en"` | CSS visibility + JS localStorage |
| Skip-to-content | `<a class="skip-to-content">` | Matomas tik su focus |

## Prieinamumas (Accessibility)

- Skip-to-content nuoroda pirmas elementas `<body>`
- `:focus-visible` stiliai visiems interaktyviems elementams
- `aria-label` navigacijoje, `aria-checked` checklist elementuose
- Klaviaturos palaikymas: Tab, Enter, Space
- Spalvu kontrastas atitinka WCAG AA

## Turinio valdymas

- LT ir EN turinys keiciamas kartu toje pacioje uzduotyje
- EN turinys pateikiamas su `data-lang-content="en"` atributu
- Turinys nedubliuojamas skirtingose vietose
- Kiekviena sekcija turi atsakinga savininke (priskiriama komandoje)
- Siam sprintui EN turinys tik hero sekcijoje (demonstracinis)
