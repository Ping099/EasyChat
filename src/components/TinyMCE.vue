<script setup>
import tinymce from 'tinymce'
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

const options = ref({
  selector: '#mytiny',
  license_key: 'gpl',
  // branding: false,
  //状态栏
  statusbar: false,
  // menubar: false,
  toolbar: true,
  //皮肤
  skin: 'myskin',
  // skin_url: '/chat/myskin', //mysin/skin.min.css  myskin/content.min.css
  // content_css: '/mycontent.css',
  language: 'zh_CN',
  height: '200px',
  plugins: 'image table',
  toolbar: 'undo redo |copy |cut    |upload|table| image|code | bold',
  menubar: true,
  menubar: 'file edit insert view format table tools help',
  menu: {
    file: {
      title: 'File',
      items:
        'newdocument restoredraft | preview | importword exportpdf exportword | print | deleteallconversations',
    },
    edit: {
      title: 'Edit',
      items: 'undo redo | cut copy paste pastetext | selectall | searchreplace',
    },
    view: {
      title: 'View',
      items:
        'code revisionhistory | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments',
    },
    insert: {
      title: 'Insert',
      items:
        'image link media addcomment pageembed codesample inserttable | math | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime',
    },
    format: {
      title: 'Format',
      items:
        'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat',
    },
    tools: {
      title: 'Tools',
      items: 'spellchecker spellcheckerlanguage | a11ycheck code wordcount',
    },
    table: {
      title: 'Table',
      items: 'inserttable | cell row column | advtablesort | tableprops deletetable',
    },
  },
  plugins: ' image code table ',
})
onMounted(async () => {
  tinymce.init(options.value)
})
</script>
<template>
  <div id="mytiny" class="mytiny"></div>
</template>
<style scoped>
.mytiny {
  height: 200px;
  width: 200px;
}
</style>
