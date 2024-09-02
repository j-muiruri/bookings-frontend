function ConfigProps() {
  this.Sidebar_drawer = false;
  this.mini_sidebar = false;
  this.actTheme = "";
  this.fontTheme = "";
}

module.exports = ConfigProps;

const config: ConfigProps = {
  Sidebar_drawer: true,
  mini_sidebar: false,
  actTheme: 'DefaultTheme',
  fontTheme: 'Public sans'
};

export default config;
