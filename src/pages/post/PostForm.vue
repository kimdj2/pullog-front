<template>
  <v-form ref="postForm">
    <v-text-field
      prepend-icon="mdi-account-circle"
      v-model="formData.title"
      label="Title"
      type="text"
      outlined
      required
      @input="changeFormData"
    ></v-text-field>

    <v-text-field
      prepend-icon="mdi-lock"
      v-model="formData.description"
      type="text"
      label="Description"
      outlined
      required
      @input="changeFormData"
    ></v-text-field>

    <v-file-input
      v-model="formData.image"
      counter
      label="Thumbnail"
      dense
      prepend-icon="mdi-paperclip"
      @input="changeFormData"
      outlined
      :show-size="1000"
    >
      <template v-slot:selection="{ index, text }">
        <v-chip
          v-if="index < 2"
          label
          small
        >
        {{ text }}
        </v-chip>
      </template>
    </v-file-input>
    
    <v-combobox multiple
      v-model="formData.tagList" 
      label="Tags" 
      prepend-icon="mdi-tag"
      chips
      deletable-chips
      outlined
      @input="changeFormData"
      @keyup.tab="updateTags"
      @paste="updateTags">
      <template v-slot:selection="data">
        <v-chip
          :key="JSON.stringify(data.item)"
          v-bind="data.attrs"
          close
          color="teal lighten-4"
          :input-value="data.selected"
          :disabled="data.disabled"
          @click:close="data.parent.selectItem(data.item)"
        >
          <v-icon>mdi-tag</v-icon>{{ data.item }}
        </v-chip>
      </template>
    </v-combobox>
    <ContentInput v-if="!loading" :contents='formData.contents' @contentChange='contentChange'/>
  </v-form>
</template>
<script>
import ContentInput from '@/components/form/ContentInput'

export default {
  components: {
    ContentInput,
  },
  props: [
    'initFormData',
  ],
  data(){
    return {
      loading: true,
      formData: {
        title: "",
        description: "",
        image: null,
        image_path:"",
        contents:"",
        contentsHtml:"",
        tagList:"",
      },
    }
  },
  mounted () {
    if (this.initFormData) {
      this.formData = Object.assign({}, this.formData, this.initFormData);
    }
    this.loading = false;
  },
  methods: {
    updateTags() {
      this.$nextTick(() => {
        this.formData.tagList.push(...this.formData.tagList.split(","));
        this.$nextTick(() => {
          this.formData.tagList = "";
        });
      });
    },
    contentChange(data) {
      this.formData.contents = data.value;
      this.formData.contentsHtml = data.html;
      this.changeFormData();
    },
    changeFormData() {
      this.$emit('changeFormData', this.formData);
    }
  }
};
</script>
