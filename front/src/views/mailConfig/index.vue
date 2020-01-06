<template>
  <div class="container">
    <el-upload
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>

    <el-upload
      class="upload-demo"
      drag
      action="/"
      :on-success="handleSuccess"
      :on-error="handleError"
      :show-file-list="false"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将docx文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">{{ tips }}</div>
    </el-upload>
  </div>
</template>
