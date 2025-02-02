<script lang="ts">
  import { languageTag, sourceLanguageTag } from '../../../paraglide/runtime.js';

  const currentLanguage = languageTag();
  const languages = {
    en: 'English',
    sv: 'Svenska',
    es: 'Español',
    da: 'Dansk',
    fr: 'Français',
    nb: 'Norsk Bokmål',
    fi: 'Suomi'
  };

  function switchToLanguage(e: Event) {
    const target = e.target as HTMLSelectElement;
    const newLanguage = target.value;
    let canonicalPath = document.location.pathname;

    if (!canonicalPath.startsWith(`/${currentLanguage}`)) {
      canonicalPath = `/${currentLanguage}${canonicalPath}`;
    }

    canonicalPath = canonicalPath.replace(`/${currentLanguage}`, `/${newLanguage}`);

    if (newLanguage === sourceLanguageTag) {
      canonicalPath = canonicalPath.replace(`/${newLanguage}`, '');
    }

    document.location.href = canonicalPath;
  }
</script>

<select class="zm-language-switcher" id="languageSwitcher" onchange={switchToLanguage}>
  {#each Object.entries(languages) as [code, label]}
    <option lang={code} value={code} selected={currentLanguage === code}>{label}</option>
  {/each}
</select>

<style>
  .zm-language-switcher {
    display: block;
    padding: var(--spacing-xs) var(--spacing-s);
    font-size: var(--font-body-size);
    font-weight: var(--font-body-weight);
    font-family: var(--font-body-family);
    line-height: var(--font-body-line-height);
    color: var(--color-text);
    background-color: var(--color-palette-white);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 16px 12px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    transition:
      border-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out;
    appearance: none;
  }
</style>
