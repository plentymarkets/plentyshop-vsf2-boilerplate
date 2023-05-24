<template>
  <span>
    <template
      v-for="part in parts"
    >
      <template v-if="part.type === 'text'">{{ part.value }}</template>
      <template v-else-if="part.type === 'link'">
        <a
          :key="part.id"
          :href="part.url"
          style="text-decoration: underline"
        >{{ part.value }}</a>
      </template>
    </template>
  </span>
</template>

<script>
export default {
  name: 'TranslationWithLink',
  // eslint-disable-next-line vue/require-prop-types
  props: ['text', 'replacements'],
  setup(props) {
    function generateFragments(text, replacements) {
      const regex = /{([^}]+)}/g;
      let lastIndex = 0;
      let match;
      const fragments = [];

      while ((match = regex.exec(text)) !== null) {
        const textFragment = text.substring(lastIndex, match.index);
        const replacementFragment = getReplacementFragment(replacements, match[1], fragments);

        if (textFragment !== '') {
          fragments.push({ id: fragments.length, type: 'text', value: textFragment });
        }

        if (replacementFragment) {
          fragments.push(replacementFragment);
        }

        lastIndex = regex.lastIndex;
      }

      const remainingTextFragment = text.substring(lastIndex);

      if (remainingTextFragment !== '') {
        fragments.push({ id: fragments.length, type: 'text', value: remainingTextFragment });
      }

      return fragments;
    }

    function getReplacementFragment(replacements, search, fragments) {
      const replacement = replacements.find(r => r.search === `${search}`);

      if (replacement) {
        return { id: fragments.length, type: 'link', value: replacement.replace, url: replacement.url };
      }
      return null;
    }

    const parts = generateFragments(props.text, props.replacements);

    return {
      parts
    };
  }
};
</script>

<style scoped>

</style>
