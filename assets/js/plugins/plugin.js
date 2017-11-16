import $ from 'jquery';

export default function plugin(pluginName, className) {
  const dataName = `__${pluginName}`;
  const ClassName = className;

  $.fn[pluginName] = function pluginBuild(option) {
    return this.each(() => {
      const $this = this;
      let data = $this.data(dataName);
      const options = $.extend({}, ClassName.DEFAULTS, $this.data(), typeof option === 'object' && option);

      if (!data) {
        $this.data(dataName, (data = new ClassName(this, options)));
      }

      if (typeof option === 'string') {
        data[option]();
      }
    });
  };

  // - No conflict
  $.fn[pluginName].noConflict = () => $.fn[pluginName];
}
