<template>
    <editor
    :initialValue="editorText" 
    :options="editorOptions"
    v-if="!loading"
    ref="toastuiEditor"
    previewStyle="vertical"
    height="500px"
    initialEditType="markdown"
    v-bind="$attrs"
    :visible="true"
    @change="onEditorChange"
    />
</template>
<script>
import 'codemirror/lib/codemirror.css'; 
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import hljs from 'highlight.js';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/vue-editor'

export default {
  components: {
    'editor': Editor
  },
  props:[
    'contents',
  ],
  data() {
    return {
      loading: true,
      editorText: '',
      editorOptions: {
        plugins:[[codeSyntaxHighlight, {hljs}]],
      },
    };
  },
  mounted () {
    this.editorText = this.contents;
    this.loading = false;
  },
  methods: {
    onEditorChange() {
      let markdown = this.$refs.toastuiEditor.invoke('getMarkdown');
      let html = this.$refs.toastuiEditor.invoke('getHtml');
      this.$emit("contentChange", {
        value: markdown,
        html: html,
      });
    },
  }
};
</script>
