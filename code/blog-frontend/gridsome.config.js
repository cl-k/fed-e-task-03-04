// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Blog',
  plugins: [
    {
      use: '@gridsome/source-strapi',
      options: {
        apiURL: 'http://182.254.133.178:8099',
        queryLimit: 1000, // Defaults to 100
        contentTypes: ['sidebars', 'websites', 'blogs'],
        singleTypes: ['configure'],
        // Possibility to login with a Strapi user,
        // when content types are not publicly available (optional).
        // loginData: {
        //   identifier: '',
        //   password: ''
        // }
      }
    }
  ],
  templates: {
    StrapiBlogs: [
      {
        path: '/blog-detail/:id',
        component: './src/templates/BlogDetail.vue'
      }
    ],
    project: [
      {
        path: '/project-detail/:id',
        component: './src/templates/ProjectDetail.vue'
      }
    ]
  }
}
