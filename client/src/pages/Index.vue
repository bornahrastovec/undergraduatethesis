<template>
  <q-page class="main">
    <div class="hero">
      <div class="hero-content">
        <h1>Freud</h1>
        <q-btn unelevated rounded color="primary" @click="scrollToElement"
          >Saznaj više</q-btn
        >
      </div>
    </div>
    <div class="column q-pa-md bg-teal" style="color:white;" id="desc">
      <div class="title">
        <div class="text-h2 text-center q-pa-md">Što je "Freud"?</div>
      </div>
      <div class="text-area" style="text-align: center;">
        <p>
          Ova aplikacija je namijenjena za praćenje raspoloženja i stanja mentalnog zdravlja
        </p>
        <p>
          Na ovoj stranici možete naći korisne resurse, a na dijelu stranice za
          članove možete pisati dnevnik i iz dana u dan pratiti svoje opće
          mentalno stanje
        </p>
        <p>
          Dnevnim praćenjem Vašeg stanja omogućujete si razumijevanje situacije
          u kojoj se nalazite, bila ona dobra ili loša. Ponekad je neke stvari
          najbolje staviti na papir (u ovom slučaju digitalni dnevnik) i malo o
          njima razumno promisliti
        </p>
      </div>
    </div>
  </q-page>
</template>

<script>
import { scroll } from "quasar";
const { getScrollTarget, setVerticalScrollPosition } = scroll;

export default {
  methods: {
    scrollToElement() {
      const el = document.getElementById("desc");
      const target = getScrollTarget(el);
      const offset = el.offsetTop - el.scrollHeight;

      const duration = 250;
      setVerticalScrollPosition(target, offset, duration);
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  font-family: 'Spartan', sans-serif;
}
.hero {
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
.hero-content {
  text-align: center;
}
.hero-content h1 {
  padding: 0;
  margin: 0;
}
.description {
  font-weight: bold;
  height: 80vh;
}
p {
  font-size: 1.25rem;
}
</style>