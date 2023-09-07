package Zonemaster::GUI;

use strict;
use warnings;

use Dancer2;
use Carp;
use Data::Dumper;
use I18N::AcceptLanguage;
use TOML::Tiny qw(from_toml);
use File::Slurp qw( read_file );
use File::ShareDir qw( dist_dir );


our $VERSION = '0.0.0';

# Generate configuration
get '/:lang/app.config.json' => sub {
    send_as JSON => config->{client_config}
};

# Serve additional assets
get '/:lang/additional/**' => sub {
    my ( $path ) = splat;

    if ( grep /^\.{2,}$/, @{$path} ) {
        pass;
    } else {
        if ( defined config->{additional_assets_directory} ) {
            send_file( path( config->{additional_assets_directory}, @{$path} ), system_path => 1 );
        }
    }
};

# Serve localized GUI assets, serve index.html for all other requests under /:lang
get '/:lang/?**?' => sub {
    my $lang = route_parameters->get('lang');
    my ( $path ) = splat;
    my $filename = path( 'dist', $lang, @{$path} );

    if ( ! grep { $_ eq $lang } @{config->{enabled_languages}} ) {
        pass;
    } else {
        if (-f path( config->{public_dir}, $filename )) {
            send_file $filename;
        } else {
            template 'index.html', {
                styles => config->{static_resources}->{styles},
                scripts => config->{static_resources}->{scripts},
                baseurl => join('/', config->{base_url}, $lang, ""),
                lang => $lang,
            };
        }
    }
};

# For all other request, redirect based on the browser prefered language
get '/**?' => sub {
    my ( $path ) = splat;
    my $accept_language = request_header 'Accept-Language';
    my $acceptor = I18N::AcceptLanguage->new( defaultLanguage => config->{default_language});
    my $lang = $acceptor->accepts($accept_language, config->{enabled_languages});

    redirect uri_for( join('/', config->{base_url}, $lang, @{$path}) );
};

sub build_app {
    my $config_file_name = $ENV{ZONEMASTER_GUI_CONFIG_FILE} // "zonemaster-gui.toml";
    my $config_file = read_file $config_file_name;
    my $config = from_toml($config_file);
    my $install_directory = dist_dir('Zonemaster-GUI');

    if (! exists $config->{general}->{default_language}) {
        croak "Please set `default_language` in configuration file.";
    }

    if (! exists $config->{general}->{enabled_languages}) {
        croak "Please set `enabled_languages` in configuration file.";
    }

    my $base_url = $config->{general}->{base_url} // '';

    set (
        public_dir => $install_directory,
        static_handler => false,
        template => 'template_toolkit',
        views => path($install_directory, 'templates'),
        base_url => $base_url,
        default_language => $config->{general}->{default_language},
        enabled_languages => [ @{$config->{general}->{enabled_languages}} ],
    );

    my %client_config;
    while( my ($key, $value) = each %{$config->{client}} ) {
        $key =~ s/_([[:alpha:]])/\U$1/g;
        $client_config{$key} = $value;
    }

    $client_config{defaultLanguage} = $config->{general}->{default_language};
    $client_config{enabledLanguages} = $config->{general}->{enabled_languages};

    set client_config => \%client_config;

    my $manifest_file = read_file path($install_directory, "manifest.json");
    my $static_resources = decode_json($manifest_file);
    my %final_static_resources;

    my @additional_styles = map { join('/', 'additional', $_) } @{$config->{customization}->{additional_styles}};
    my @additional_scripts = map { join('/', 'additional', $_) } @{$config->{customization}->{additional_scripts}};

    my $override_default_style = $config->{general}->{override_default_style} // 0;

    $final_static_resources{styles} =
        $override_default_style ?
        \@additional_styles :
        [ @{$static_resources->{styles}}, @additional_styles ];

    $final_static_resources{scripts} = [ @{$static_resources->{scripts}}, @additional_scripts ];

    set (
        static_resources => \%final_static_resources,
        additional_assets_directory => $config->{customization}->{additional_assets_directory},
    );

    if ( exists $config->{customization}->{template_override_directory} ) {
        set engines => {
            template => {
                template_toolkit => {
                    include_path => $config->{customization}->{template_override_directory}
                }
            }
        }
    }

    return to_app;
}
