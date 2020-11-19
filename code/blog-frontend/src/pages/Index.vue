<template>
  <Layout>
    <div style="min-height: 600px" v-loading="loading">
      <el-card shadow="never" style="min-height: 400px" v-if="blog.id">
        <div slot="header">
          <span>{{ blog.title }}</span>
        </div>
        <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
          发布 {{ blog.published_at }} <br />
          更新 {{ blog.updated_at }}
        </div>
        <div
          style="font-size: 1.1rem;line-height: 1.5;color: #303133;border-bottom: 1px solid #E4E7ED;padding: 5px 0px 5px 0px"
        >
          <pre style="font-family: '微软雅黑'">{{ blog.description }}</pre>
        </div>
        <div
          v-html="markdown(blog.content)"
          class="markdown-body"
          style="padding-top: 20px"
        ></div>
      </el-card>
      <el-card
        shadow="never"
        style="margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center"
        v-if="!blog.id"
      >
        <font style="font-size: 30px;color:#dddddd ">
          <b>没有更新 ╮(๑•́ ₃•̀๑)╭</b>
        </font>
      </el-card>
    </div>
  </Layout>
</template>

<page-query>
query {
	blogs: allStrapiBlogs {
    edges {
      node {
        id
        title
        description
        content
        published_at
        updated_at
      }
    }
  }
}
</page-query>

<script>
import dayjs from "dayjs"

export default {
  name: 'NewPage',
  metaInfo: {
    title: '最新动态',
  },
  computed: {
    blog() {
      const blogs = this.$page.blogs.edges
        .map((item) => item.node)
        .sort((a, b) => {
          return parseInt(a.id) - parseInt(b.id)
        })

      if (blogs.length > 0) {
        const blog = blogs[0]
        blog.updated_at = dayjs(blog.updated_at).format('YYYY-MM-DD HH:mm:ss')
        blog.published_at = dayjs(blog.published_at).format('YYYY-MM-DD HH:mm:ss')
        return blogs[0]
      } else {
        return {
          id: '',
          title: '',
          description: '',
          content: '',
          published_at: '',
          updated_at: '',
        }
      }
    },
  },
  methods: {
    markdown(content) {
      return this.$md.render(content)
    }
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
