import { HybridComponent, html } from '@libs/shared/react-hybrid-components';
import React from 'react';

export default HybridComponent({
  container: () => (
    <div className='hero relative left-1/2 -translate-x-1/2 min-h-usable-screen bg-base-200 top-0 w-full max-w-4xl rounded-xl mt-5'></div>
  ),
  html: html`
    <div class="hero-content flex-col">
      <img src="/public/images/cartoon/not-found.png" class="max-w-xl w-full rounded-lg" />
      <div class="text-center flex flex-col justify-center items-center">
        <h1 class="text-4xl font-bold">Страницата не беше намерена!</h1>
        <p class="pt-2 pb-6 max-w-xl">
          Не съществува подобна страница. Ако сте убедени във валидността на URL-пътя можете да се свържете с нас на
          E-Mail:
          <a href="mailto:andr.nikola.08@gmail.com" class="font-bold text-primary"> andr.nikola.08@gmail.com </a>
        </p>
      </div>
    </div>
  `
});
