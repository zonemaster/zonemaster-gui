use inc::Module::Install;
use Module::Install::Share;

name 'Zonemaster-GUI';
all_from 'lib/Zonemaster/GUI.pm';
repository 'https://github.com/zonemaster/zonemaster-gui';
bugtracker 'https://github.com/zonemaster/zonemaster-gui/issues';

requires
  'Dancer2' => 0,
  'I18N::AcceptLanguage' => 0,
  'TOML::Tiny' => 0,
  'File::ShareDir' => 0,
  'File::Slurp' => 0,
  ;

install_script 'scripts/zonemaster-gui';

install_share;

WriteAll
