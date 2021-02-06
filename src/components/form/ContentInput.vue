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
import API from "@/utils/API";

import { Editor } from '@toast-ui/vue-editor'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import colorSyntax  from '@toast-ui/editor-plugin-color-syntax';

import '@toast-ui/editor/dist/toastui-editor.css';
import hljs from 'highlight.js/lib/highlight';
import 'codemirror/lib/codemirror.css'; 

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
        plugins:[[codeSyntaxHighlight, {hljs}], colorSyntax],
        hooks: {
          addImageBlobHook: this.addImageBlobHook.bind(this),
        },
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
    addImageBlobHook(blob, callback) {
      const data = new FormData();
      data.append('image', blob);
      const config = {
        header: {
          'Content-Type': 'multipart/form-data'
        }
      };
      API.post('/app/upload_image', data, config)
        .then(res => {
          callback(res.data.image_url, '');
        })
        .catch(error => {
          console.log(error);
        });
    },
  }
};
</script>
