define(['underscore'], function() {
  var selfcare_styles = {
    css: [
      'app',
      'bootstrap-combined.min',
      'bootstrap-timepicker',
      'bootswatch',
      'font-awesome.min',
      'jquery-ui',
      'nv.d3',
      'style'
    ]
  };

  require(_.reduce(_.keys(selfcare_styles), function(list, pluginName) {
    return list.concat(_.map(selfcare_styles[pluginName], function(stylename) { return pluginName + "!selfcare_styles/" + stylename; }));
  }, []));
});
