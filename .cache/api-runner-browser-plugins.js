module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"IsMarcWorkikng","short_name":"IMW","description":"I am always working.","start_url":"/","background_color":"#404343","theme_color":"#404343","display":"standalone","icon":"src/images/marcprofile.png","crossOrigin":"use-credentials","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","include_favicon":true,"cacheDigest":"7dd381bec3697ecb41060e248ea2a156"},
    },{
      plugin: require('../node_modules/gatsby-plugin-offline/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby/dist/internal-plugins/partytown/gatsby-browser.js'),
      options: {"plugins":[]},
    }]
